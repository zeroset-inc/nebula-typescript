import { describe, test, expect, spyOn } from "bun:test";
import {
  NebulaClient,
  NebulaCore,
} from "../src/index.ts";
import {
  NebulaNotFoundError,
  NebulaRateLimitError,
  NebulaTimeoutError,
  NebulaValidationError,
  isNebulaPublicAPIError,
} from "../src/runtime/errors.ts";
import { backoffMs } from "../src/runtime/retry.ts";

const RETRIEVAL_OPERATION_ID = "11111111-1111-4111-8111-111111111111";

interface CapturedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: unknown;
}

function makeMockFetch(
  responder: (req: CapturedRequest) => Response | Promise<Response>
): { fetchImpl: typeof fetch; calls: CapturedRequest[] } {
  const calls: CapturedRequest[] = [];
  const fetchImpl: typeof fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const headers: Record<string, string> = {};
    new Headers(init?.headers).forEach((value, key) => {
      headers[key] = value;
    });
    const captured: CapturedRequest = {
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers,
      body: init?.body ? JSON.parse(init.body as string) : undefined,
    };
    calls.push(captured);
    return responder(captured);
  };
  return { fetchImpl, calls };
}

function jsonResponse(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

describe("NebulaClient", () => {
  test("nullish defaultHeaders are stripped before reaching fetch", async () => {
    // Callers pass `defaultHeaders: { 'Authorization': null }` (cast `as any`)
    // to suppress that header for cookie-auth requests. The runtime must drop
    // the nulls — otherwise `new Headers({ k: null })` coerces to the literal
    // string "null", and the backend treats an "Authorization: null" header as
    // an explicit credential, never falling back to the session cookie.
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      defaultHeaders: {
        "X-Workspace-Id": "ws-123",
        Authorization: null as unknown as string,
      },
    });
    await client.memory.search({
      query: "hi",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
    });
    const headers = calls[0].headers;
    expect(headers["x-workspace-id"]).toBe("ws-123");
    expect(headers["authorization"]).toBeUndefined();
  });

  test("memory.search sends POST with body and bearer auth", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      apiKey: "secret",
      fetchImpl,
    });
    const result = await client.memory.search({
      query: "hello world",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
    });
    // Inline-anyOf envelope unwrap: caller sees the inner value (the
    // empty array here), not the `{results: ...}` wire shape.
    expect(result).toEqual([] as never);
    expect(calls.length).toBe(1);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/search");
    expect(calls[0].headers.authorization).toBe("Bearer secret");
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(calls[0].body).toEqual({
      query: "hello world",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
    });
  });

  test("single-collection search derives edge routing header", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.memory.search({
      query: "hello",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
      collection_ids: ["33333333-3333-4333-8333-333333333333"],
    } as never);
    await client.memory.search({
      query: "hello",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
      collection_ids: [
        "33333333-3333-4333-8333-333333333333",
        "44444444-4444-4444-8444-444444444444",
      ],
    } as never);

    expect(calls[0].headers["x-nebula-owner-key"]).toBe(
      "collection:33333333-3333-4333-8333-333333333333"
    );
    expect(calls[1].headers["x-nebula-owner-key"]).toBeUndefined();
  });

  test("workspace-scoped upload uses canonical query routing", async () => {
    const workspaceId = "22222222-2222-4222-8222-222222222222";
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, {
        results: {
          upload_session_id: "33333333-3333-4333-8333-333333333333",
          part_size: 8388608,
          expires_in: 3600,
          max_size: 104857600,
        },
      })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.memory.createUpload({
      filename: "image.png",
      contentType: "image/png",
      fileSize: 12,
      workspaceId,
    } as never);

    const url = new URL(calls[0].url);
    expect(url.pathname).toBe("/v1/memories/upload");
    expect(url.searchParams.get("workspace_id")).toBe(workspaceId);
    expect(calls[0].headers["x-nebula-owner-key"]).toBeUndefined();
  });

  test("filter-scoped search derives edge routing header", async () => {
    const collectionId = "33333333-3333-4333-8333-333333333333";
    const otherCollectionId = "44444444-4444-4444-8444-444444444444";
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.memory.search({
      query: "hello",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
      filters: {
        collection_ids: {
          $overlap: [collectionId],
        },
      },
    } as never);
    await client.memory.search({
      query: "hello",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
      filters: {
        collection_ids: {
          $overlap: [collectionId, otherCollectionId],
        },
      },
    } as never);
    await client.memory.search({
      query: "hello",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
      collection_id: collectionId,
    } as never);

    expect(calls[0].headers["x-nebula-owner-key"]).toBe(`collection:${collectionId}`);
    expect(calls[1].headers["x-nebula-owner-key"]).toBeUndefined();
    expect(calls[2].headers["x-nebula-owner-key"]).toBeUndefined();
  });

  test("write calls derive edge routing headers from body ids", async () => {
    const { fetchImpl, calls } = makeMockFetch((req) => {
      if (req.url.endsWith("/v1/collections")) {
        return jsonResponse(200, { results: { id: "collection-id" } });
      }
      if (req.url.endsWith("/v1/memories")) {
        return jsonResponse(200, { results: { id: "memory-id", message: "ok" } });
      }
      return jsonResponse(200, { results: { message: "ok" } });
    });
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.collections.create({ name: "Personal collection" });
    await client.collections.create({
      name: "Team collection",
      workspace_id: "22222222-2222-4222-8222-222222222222",
    });
    await client.memory.store({
      collection_id: "33333333-3333-4333-8333-333333333333",
      raw_text: "hello",
    });
    await client.memory.append({
      id: "44444444-4444-4444-8444-444444444444",
      body: {
        collection_id: "55555555-5555-4555-8555-555555555555",
        operation_id: "66666666-6666-4666-8666-666666666666",
        raw_text: "more",
      },
    } as never);

    expect(calls[0].headers["x-nebula-owner-key"]).toBeUndefined();
    expect(calls[1].headers["x-nebula-owner-key"]).toBe(
      "workspace:22222222-2222-4222-8222-222222222222"
    );
    expect(calls[2].headers["x-nebula-owner-key"]).toBe(
      "collection:33333333-3333-4333-8333-333333333333"
    );
    expect(calls[3].headers["x-nebula-owner-key"]).toBe(
      "collection:55555555-5555-4555-8555-555555555555"
    );
  });

  test("single ingestion-operation calls route with an explicit collection argument", async () => {
    const operationId = "11111111-1111-4111-8111-111111111111";
    const collectionId = "22222222-2222-4222-8222-222222222222";
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: {} })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.ingestionOperation.putItem({
      operationId,
      collectionId,
      body: { item_key: "item-1", memory: { raw_text: "hello" } } as never,
    });
    await client.ingestionOperation.seal({ operationId, collectionId });
    await client.ingestionOperation.cancel({ operationId, collectionId });
    await client.ingestionOperation.get({ operationId, collectionId });

    expect(calls).toHaveLength(4);
    for (const call of calls) {
      expect(call.headers["x-nebula-owner-key"]).toBe(`collection:${collectionId}`);
      expect(new URL(call.url).searchParams.has("collection_id")).toBe(false);
    }
    expect(calls[0].body).not.toHaveProperty("collection_id");
  });

  test("an explicit undefined routing value fails closed", async () => {
    const collectionId = "22222222-2222-4222-8222-222222222222";
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { ok: true })
    );
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await core.request({
      method: "POST",
      path: "/v1/things",
      body: { collection_id: collectionId },
      routing: {
        owner: "collection",
        value: undefined,
        bodyFields: ["collection_id"],
      },
    });
    await core.request({
      method: "POST",
      path: "/v1/things",
      body: { collection_id: collectionId },
      routing: {
        owner: "collection",
        bodyFields: ["collection_id"],
      },
    });

    expect(calls[0].headers["x-nebula-owner-key"]).toBeUndefined();
    expect(calls[1].headers["x-nebula-owner-key"]).toBe(
      `collection:${collectionId}`
    );
  });

  test("zero-config personal collection create does not require a routing header", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          id: "11111111-1111-4111-8111-111111111111",
          state: "provisioning",
          failure: null,
        },
      })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.collections.create({ name: "Personal collection" });

    expect(calls[0].headers["x-nebula-owner-key"]).toBeUndefined();
  });

  test("collections.list serializes query params (cursor + limit)", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { data: [], next_cursor: null, has_more: false })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      apiKey: "k1",
      fetchImpl,
    });
    await client.collections.list({ cursor: "MTA=", limit: 5, ownerOnly: true });
    expect(calls[0].headers.authorization).toBe("Bearer k1");
    expect(calls[0].url).toContain("cursor=MTA%3D");
    expect(calls[0].url).toContain("limit=5");
    expect(calls[0].url).toContain("owner_only=true");
  });

  test("path params are substituted and encoded", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { id: "abc" })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      apiKey: "k1",
      fetchImpl,
    });
    await client.memory.get("11111111-2222-3333-4444-555555555555");
    expect(calls[0].url).toBe(
      "https://api.example.com/v1/memories/11111111-2222-3333-4444-555555555555"
    );
  });

  test("422 maps to NebulaValidationError", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(422, { detail: [{ msg: "bad" }] })
    );
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    await expect(
      client.memory.search({} as never)
    ).rejects.toBeInstanceOf(NebulaValidationError);
  });

  test("404 maps to NebulaNotFoundError", async () => {
    const { fetchImpl } = makeMockFetch(() => jsonResponse(404, { detail: "missing" }));
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    await expect(
      client.memory.get("missing")
    ).rejects.toBeInstanceOf(NebulaNotFoundError);
  });

  test("does not retry nonretryable upload-session creation", async () => {
    let attempts = 0;
    const { fetchImpl } = makeMockFetch(() => {
      attempts++;
      return jsonResponse(503, { detail: "down" });
    });
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 5, baseMs: 1, maxMs: 5 },
    });
    await expect(
      client.memory.createUpload({
        filename: "file.txt",
        contentType: "text/plain",
        fileSize: 5,
      })
    ).rejects.toThrow();
    expect(attempts).toBe(1);
  });

  test("memory.store retries the identical generated body within its overall deadline", async () => {
    let attempts = 0;
    const { fetchImpl, calls } = makeMockFetch(() => {
      attempts++;
      if (attempts === 1) return jsonResponse(503, { detail: "warming up" });
      return jsonResponse(202, {
        results: {
          id: "11111111-1111-4111-8111-111111111111",
          state: "processing",
          failure: null,
        },
      });
    });
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 1, baseMs: 0, maxMs: 0 },
    });

    const result = await client.memory.store(
      {
        collection_id: "44444444-4444-4444-8444-444444444444",
        messages: [{ role: "user", content: "hello" }],
      },
      { timeoutMs: 1_000 },
    );

    expect(result.id).toBe("11111111-1111-4111-8111-111111111111");
    expect(calls).toHaveLength(2);
    expect(calls[0].body).toEqual(calls[1].body);
    expect(calls[0].url).toBe("https://api.example.com/v1/memories");
  });

  test("retries only when the operation is marked retryable", async () => {
    let attempts = 0;
    const { fetchImpl } = makeMockFetch(() => {
      attempts++;
      if (attempts < 3) return jsonResponse(503, { detail: "warming up" });
      return jsonResponse(200, { results: [], total_entries: 0 });
    });
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 3, baseMs: 1, maxMs: 5 },
    });
    const result = await core.request({
      method: "GET",
      path: "/v1/collections",
      retryable: true,
      httpSemanticallyIdempotent: true,
    });
    expect(result).toEqual({ results: [], total_entries: 0 });
    expect(attempts).toBe(3);
  });

  test("HTTP semantic idempotence alone does not enable retries", async () => {
    let attempts = 0;
    const { fetchImpl } = makeMockFetch(() => {
      attempts++;
      return jsonResponse(503, { detail: "down" });
    });
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 3, baseMs: 1, maxMs: 5 },
    });
    await expect(core.request({
      method: "PUT",
      path: "/v1/things",
      httpSemanticallyIdempotent: true,
      retryable: false,
    })).rejects.toThrow();
    expect(attempts).toBe(1);
  });

  test("freezes encoded request bodies across transport retries", async () => {
    const body = { value: "original" };
    const encodedBodies: string[] = [];
    let attempts = 0;
    const fetchImpl: typeof fetch = async (_input, init) => {
      attempts++;
      encodedBodies.push(String(init?.body));
      if (attempts === 1) {
        body.value = "mutated";
        throw new TypeError("connection reset");
      }
      return jsonResponse(200, { ok: true });
    };
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 1, baseMs: 0, maxMs: 0 },
    });
    await core.request({ method: "PUT", path: "/v1/things", body, retryable: true });
    expect(encodedBodies).toEqual(['{"value":"original"}', '{"value":"original"}']);
  });

  test("retries a non-success response body transport failure", async () => {
    let attempts = 0;
    const fetchImpl: typeof fetch = async () => {
      attempts++;
      if (attempts === 1) {
        return {
          ok: false,
          status: 503,
          headers: new Headers(),
          text: async () => { throw new TypeError("body stream reset"); },
        } as Response;
      }
      return jsonResponse(200, { ok: true });
    };
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 1, baseMs: 0, maxMs: 0 },
    });
    await expect(core.request({
      method: "GET",
      path: "/v1/things",
      retryable: true,
    })).resolves.toEqual({ ok: true });
    expect(attempts).toBe(2);
  });

  test("Retry-After is not capped and cannot exceed the total invocation budget", async () => {
    let attempts = 0;
    const { fetchImpl } = makeMockFetch(() => {
      attempts++;
      return jsonResponse(503, { detail: "busy" }, { "Retry-After": "10" });
    });
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 3, baseMs: 1, maxMs: 2 },
    });
    await expect(core.request({
      method: "GET",
      path: "/v1/things",
      retryable: true,
      timeoutMs: 20,
    })).rejects.toBeInstanceOf(NebulaTimeoutError);
    expect(attempts).toBe(1);
  });

  test("Retry-After is a floor over ordinary jitter", () => {
    const random = spyOn(Math, "random").mockReturnValue(0.9);
    try {
      expect(
        backoffMs(0, { maxRetries: 1, baseMs: 1000, maxMs: 1000 }, 0.1),
      ).toBe(900);
      expect(
        backoffMs(0, { maxRetries: 1, baseMs: 1000, maxMs: 1000 }, 2),
      ).toBe(2000);
    } finally {
      random.mockRestore();
    }
  });

  test("total invocation deadline is enforced when an injected transport ignores abort", async () => {
    const fetchImpl: typeof fetch = () => new Promise<Response>(() => {});
    const core = new NebulaCore({ baseUrl: "https://api.example.com", fetchImpl });
    await expect(core.request({
      method: "GET",
      path: "/v1/things",
      timeoutMs: 10,
    })).rejects.toBeInstanceOf(NebulaTimeoutError);
  });

  test("total invocation deadline covers a stalled response body", async () => {
    const fetchImpl: typeof fetch = async () => ({
      ok: true,
      status: 200,
      headers: new Headers(),
      json: () => new Promise<unknown>(() => {}),
    }) as Response;
    const core = new NebulaCore({ baseUrl: "https://api.example.com", fetchImpl });
    await expect(core.request({
      method: "GET",
      path: "/v1/things",
      timeoutMs: 10,
    })).rejects.toBeInstanceOf(NebulaTimeoutError);
  });

  test("429 surfaces NebulaRateLimitError with retryAfter parsed", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(429, { detail: "slow down" }, { "Retry-After": "2" })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 0, baseMs: 1, maxMs: 5 },
    });
    try {
      await client.memory.get("x");
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NebulaRateLimitError);
      expect((e as NebulaRateLimitError).retryAfter).toBe(2);
    }
  });

  test("rejects malformed Retry-After delta-seconds", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(429, { detail: "slow down" }, { "Retry-After": "1x" })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 0, baseMs: 0, maxMs: 0 },
    });
    try {
      await client.memory.get("x");
      throw new Error("expected rate limit");
    } catch (error) {
      expect(error).toBeInstanceOf(NebulaRateLimitError);
      expect((error as NebulaRateLimitError).retryAfter).toBeUndefined();
    }
  });

  test("caller cancellation never retries a retryable operation", async () => {
    const controller = new AbortController();
    let attempts = 0;
    const fetchImpl: typeof fetch = async () => {
      attempts++;
      controller.abort(new Error("caller cancelled"));
      throw new TypeError("connection reset");
    };
    const core = new NebulaCore({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 3, baseMs: 0, maxMs: 0 },
    });

    await expect(core.request({
      method: "GET",
      path: "/v1/things",
      retryable: true,
      signal: controller.signal,
    })).rejects.toThrow("caller cancelled");
    expect(attempts).toBe(1);
  });

  test("canonical Error envelope populates type/code/details/requestId/message", async () => {
    const envelope = {
      type: "validation_error",
      message: "raw_text must be non-empty",
      code: "raw_text.empty",
      request_id: "rid-abc-123",
      details: { field: "raw_text", limit: 1 },
    };
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(422, envelope, { "X-Request-Id": "header-rid-should-lose-to-body" })
    );
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    try {
      await client.memory.search({} as never);
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NebulaValidationError);
      const err = e as NebulaValidationError;
      expect(err.type).toBe("validation_error");
      expect(err.code).toBe("raw_text.empty");
      expect(err.details).toEqual({ field: "raw_text", limit: 1 });
      // Envelope's request_id wins over the transport header.
      expect(err.requestId).toBe("rid-abc-123");
      expect(err.message).toBe("raw_text must be non-empty");
    }
  });

  test("envelope with explicit null code/request_id coerces to undefined", async () => {
    // The server's Error schema is `code: anyOf [string, null]`. Make sure
    // a null wire value doesn't leak into `err.code` as the literal `null`.
    const envelope = {
      type: "internal_server_error",
      message: "boom",
      code: null,
      request_id: null,
      details: null,
    };
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(500, envelope, { "X-Request-Id": "rid-from-header" })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 0, baseMs: 1, maxMs: 5 },
    });
    try {
      await client.memory.get("x");
      throw new Error("expected throw");
    } catch (e) {
      const err = e as InstanceType<typeof NebulaNotFoundError>;
      expect(err.type).toBe("internal_server_error");
      expect(err.code).toBeUndefined();
      expect(err.details).toBeUndefined();
      expect(err.publicError).toBeUndefined();
      // Envelope's null request_id falls through to the transport header.
      expect(err.requestId).toBe("rid-from-header");
    }
  });

  test("array-shaped details (validation errors) survive intact", async () => {
    // FastAPI's RequestValidationError emits `details` as an array of
    // {loc, msg, type} entries. Narrowing `details` to Record<string,
    // unknown> would silently drop the array; the runtime types it as
    // unknown and the array passes through to err.details verbatim.
    const validationDetails = [
      { loc: ["body", "raw_text"], msg: "field required", type: "value_error.missing" },
      { loc: ["body", "collection_id"], msg: "uuid_parsing", type: "value_error" },
    ];
    const envelope = {
      type: "validation_error",
      message: "Request validation failed",
      code: "validation_error",
      request_id: "rid-validation",
      details: validationDetails,
    };
    const { fetchImpl } = makeMockFetch(() => jsonResponse(422, envelope));
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    try {
      await client.memory.search({} as never);
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NebulaValidationError);
      const err = e as NebulaValidationError;
      expect(Array.isArray(err.details)).toBe(true);
      expect(err.details).toEqual(validationDetails);
    }
  });

  test("non-envelope body leaves type/code/details undefined", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(404, { detail: "missing" }, { "X-Request-Id": "rid-fallback" })
    );
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    try {
      await client.memory.get("nope");
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NebulaNotFoundError);
      const err = e as NebulaNotFoundError;
      expect(err.type).toBeUndefined();
      expect(err.code).toBeUndefined();
      expect(err.details).toBeUndefined();
      // Falls back to the transport header when the body isn't an envelope.
      expect(err.requestId).toBe("rid-fallback");
      expect(err.message).toBe("Nebula API error (status 404)");
    }
  });

  test("closed public error is validated and narrowed on exception", async () => {
    const envelope = {
      type: "not_found",
      message: "missing",
      code: "resource_not_found",
      request_id: "rid-public",
      details: null,
    };
    const { fetchImpl } = makeMockFetch(() => jsonResponse(404, envelope));
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    try {
      await client.memory.get("nope");
      throw new Error("expected throw");
    } catch (error) {
      expect(isNebulaPublicAPIError(error)).toBe(true);
      if (!isNebulaPublicAPIError(error)) {
        throw new Error("expected a closed public API error");
      }
      expect(error.publicError.code).toBe("resource_not_found");
      expect(error.publicError.details).toBeNull();
    }
  });

  test("mismatched public error discriminants retain generic fallback", async () => {
    const envelope = {
      type: "conflict",
      message: "missing",
      code: "resource_not_found",
      request_id: "rid-mismatch",
      details: null,
    };
    const { fetchImpl } = makeMockFetch(() => jsonResponse(404, envelope));
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    try {
      await client.memory.get("nope");
      throw new Error("expected throw");
    } catch (error) {
      expect(error).toBeInstanceOf(NebulaNotFoundError);
      expect(isNebulaPublicAPIError(error)).toBe(false);
      expect((error as NebulaNotFoundError).code).toBe("resource_not_found");
    }
  });

  test.each([
    [
      "code-specific details",
      {
        type: "not_found",
        message: "missing",
        code: "resource_not_found",
        request_id: "rid-invalid-details",
        details: { unexpected: true },
      },
    ],
    [
      "additional properties",
      {
        type: "not_found",
        message: "missing",
        code: "resource_not_found",
        request_id: "rid-extra-property",
        details: null,
        constructor: "must not enter the closed public type",
      },
    ],
  ])(
    "invalid public error %s retains the generic fallback",
    async (_case, envelope) => {
      const { fetchImpl } = makeMockFetch(() => jsonResponse(404, envelope));
      const client = new NebulaClient({
        baseUrl: "https://api.example.com",
        fetchImpl,
      });

      try {
        await client.memory.get("nope");
        throw new Error("expected throw");
      } catch (error) {
        expect(error).toBeInstanceOf(NebulaNotFoundError);
        expect(isNebulaPublicAPIError(error)).toBe(false);
        expect((error as NebulaNotFoundError).code).toBe(
          "resource_not_found",
        );
      }
    },
  );
});
