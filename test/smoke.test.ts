import { describe, test, expect } from "bun:test";
import { NebulaClient } from "../src/index.ts";
import {
  NebulaNotFoundError,
  NebulaRateLimitError,
  NebulaValidationError,
} from "../src/runtime/errors.ts";

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
    await client.memories.search({ query: "hi" } as never);
    const headers = calls[0].headers;
    expect(headers["x-workspace-id"]).toBe("ws-123");
    expect(headers["authorization"]).toBeUndefined();
  });

  test("memories.search sends POST with body and bearer auth", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      apiKey: "secret",
      fetchImpl,
    });
    const result = await client.memories.search({
      query: "hello world",
    } as never);
    // Inline-anyOf envelope unwrap: caller sees the inner value (the
    // empty array here), not the `{results: ...}` wire shape.
    expect(result).toEqual([] as never);
    expect(calls.length).toBe(1);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/search");
    expect(calls[0].headers.authorization).toBe("Bearer secret");
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(calls[0].body).toEqual({ query: "hello world" });
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

    await client.collections.create({ name: "Personal collection" } as never);
    await client.collections.create({
      name: "Team collection",
      workspace_id: "22222222-2222-4222-8222-222222222222",
    } as never);
    await client.memories.create({
      collection_id: "33333333-3333-4333-8333-333333333333",
      raw_text: "hello",
    } as never);
    await client.memories.append({
      id: "44444444-4444-4444-8444-444444444444",
      body: {
        collection_id: "55555555-5555-4555-8555-555555555555",
        raw_text: "more",
      },
    } as never);

    expect(calls[0].headers["x-nebula-workspace-id"]).toBeUndefined();
    expect(calls[1].headers["x-nebula-workspace-id"]).toBe(
      "22222222-2222-4222-8222-222222222222"
    );
    expect(calls[2].headers["x-nebula-collection-id"]).toBe(
      "33333333-3333-4333-8333-333333333333"
    );
    expect(calls[3].headers["x-nebula-collection-id"]).toBe(
      "55555555-5555-4555-8555-555555555555"
    );
  });

  test("zero-config personal collection create does not require a routing header", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "collection-id" } })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
    });

    await client.collections.create({ name: "Personal collection" } as never);

    expect(calls[0].headers["x-nebula-workspace-id"]).toBeUndefined();
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
    await client.memories.retrieve("11111111-2222-3333-4444-555555555555");
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
      client.memories.search({} as never)
    ).rejects.toBeInstanceOf(NebulaValidationError);
  });

  test("404 maps to NebulaNotFoundError", async () => {
    const { fetchImpl } = makeMockFetch(() => jsonResponse(404, { detail: "missing" }));
    const client = new NebulaClient({ baseUrl: "https://api.example.com", fetchImpl });
    await expect(
      client.memories.retrieve("missing")
    ).rejects.toBeInstanceOf(NebulaNotFoundError);
  });

  test("does not retry POST when idempotent=false (memories.create)", async () => {
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
      client.memories.create({ collection_id: "c1" } as never)
    ).rejects.toThrow();
    expect(attempts).toBe(1);
  });

  test("retries GET on 503 (idempotent by default)", async () => {
    let attempts = 0;
    const { fetchImpl } = makeMockFetch(() => {
      attempts++;
      if (attempts < 3) return jsonResponse(503, { detail: "warming up" });
      return jsonResponse(200, { results: [], total_entries: 0 });
    });
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      fetchImpl,
      retry: { maxRetries: 3, baseMs: 1, maxMs: 5 },
    });
    const result = await client.collections.list({ limit: 10 });
    expect(result).toEqual({ results: [], total_entries: 0 } as never);
    expect(attempts).toBe(3);
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
      await client.memories.retrieve("x");
      throw new Error("expected throw");
    } catch (e) {
      expect(e).toBeInstanceOf(NebulaRateLimitError);
      expect((e as NebulaRateLimitError).retryAfter).toBe(2);
    }
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
      await client.memories.search({} as never);
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
      await client.memories.retrieve("x");
      throw new Error("expected throw");
    } catch (e) {
      const err = e as InstanceType<typeof NebulaNotFoundError>;
      expect(err.type).toBe("internal_server_error");
      expect(err.code).toBeUndefined();
      expect(err.details).toBeUndefined();
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
      await client.memories.search({} as never);
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
      await client.memories.retrieve("nope");
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
});
