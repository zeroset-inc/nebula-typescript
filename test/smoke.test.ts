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
  test("memories.search sends POST with body and bearer auth", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new NebulaClient({
      baseUrl: "https://api.example.com",
      bearerToken: "secret",
      fetchImpl,
    });
    const result = await client.memories.search({
      body: { query: "hello world" } as never,
    });
    expect(result).toEqual({ results: [], total_entries: 0 } as never);
    expect(calls.length).toBe(1);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/search");
    expect(calls[0].headers.authorization).toBe("Bearer secret");
    expect(calls[0].headers["content-type"]).toBe("application/json");
    expect(calls[0].body).toEqual({ query: "hello world" });
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
    expect(calls[0].headers["x-api-key"]).toBe("k1");
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
      client.memories.search({ body: {} as never })
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
      client.memories.create({ body: { collection_id: "c1" } as never })
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
});
