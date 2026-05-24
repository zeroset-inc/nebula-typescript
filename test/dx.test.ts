import { describe, test, expect } from "bun:test";
import { Nebula, NebulaClient } from "../src/index.ts";
import { looksLikeNebulaAPIKey } from "../src/lib/dx.ts";

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
    new Headers(init?.headers).forEach((v, k) => {
      headers[k] = v;
    });
    calls.push({
      url,
      method: (init?.method ?? "GET").toUpperCase(),
      headers,
      body: init?.body ? JSON.parse(init.body as string) : undefined,
    });
    return responder(calls.at(-1)!);
  };
  return { fetchImpl, calls };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("DX layer", () => {
  test("Nebula extends NebulaClient", () => {
    const client = new Nebula({ baseUrl: "https://api.example.com" });
    expect(client).toBeInstanceOf(NebulaClient);
    expect(client.memories).toBeDefined();
    expect(client.collections).toBeDefined();
  });

  test("storeMemory(create) dispatches to memories.create and returns id", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "mem_123", message: "ok" } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const id = await client.storeMemory({ collection_id: "c1", raw_text: "hello" });
    expect(id).toBe("mem_123");
    expect(calls.length).toBe(1);
    expect(calls[0].url).toBe("https://api.example.com/v1/memories");
    expect(calls[0].method).toBe("POST");
    expect(calls[0].body).toMatchObject({ collection_id: "c1", raw_text: "hello" });
  });

  test("storeMemory(append) dispatches to memories.append when memory_id set", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "appended" } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const id = await client.storeMemory({
      memory_id: "mem_existing",
      collection_id: "c1",
      raw_text: "more content",
    });
    expect(id).toBe("mem_existing");
    expect(calls.length).toBe(1);
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/mem_existing/append");
  });

  test("storeMemory(content string) maps to raw_text", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "mem_x" } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.storeMemory({ collection_id: "c1", content: "shorthand" } as never);
    expect(calls[0].body).toMatchObject({ raw_text: "shorthand" });
  });

  test("storeMemory(messages) sets kind='conversation' and omits engram_type", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "mem_conv" } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.storeMemory({
      collection_id: "c1",
      messages: [{ role: "user", content: "hi" }],
    });
    expect(calls[0].body).toMatchObject({ kind: "conversation" });
    expect((calls[0].body as Record<string, unknown>).engram_type).toBeUndefined();
  });

  test("search returns unwrapped results", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(200, { results: { entities: [], relationships: [] } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.search({ query: "find this" } as never);
    expect(result).toEqual({ entities: [], relationships: [] });
  });

  test("delete(string) calls memories.delete", async () => {
    const { fetchImpl, calls } = makeMockFetch(() => jsonResponse(204, null));
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const ok = await client.delete("mem_to_delete");
    expect(ok).toBe(true);
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/mem_to_delete");
  });

  test("delete(string[]) calls memories.deleteMany with body array", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { succeeded: 2, failed: 0 } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.delete(["m1", "m2"]);
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/delete");
    expect(calls[0].body).toEqual(["m1", "m2"]);
  });

  test("looksLikeNebulaAPIKey detects key_ / neb_ prefixes", () => {
    expect(looksLikeNebulaAPIKey("key_abc.def")).toBe(true);
    expect(looksLikeNebulaAPIKey("neb_xyz.123")).toBe(true);
    expect(looksLikeNebulaAPIKey("eyJhbGciOiJIUzI1NiJ9")).toBe(false);
    expect(looksLikeNebulaAPIKey("key_abc")).toBe(false);
  });

  test("compat options: api_key alias is accepted", async () => {
    const { fetchImpl, calls } = makeMockFetch(() => jsonResponse(200, { results: {} }));
    const client = new Nebula({
      baseUrl: "https://api.example.com",
      api_key: "key_real.token",
      fetchImpl,
    } as never);
    await client.getMemory("m1");
    expect(calls[0].headers["x-api-key"]).toBe("key_real.token");
    expect(calls[0].headers.authorization).toBeUndefined();
  });

  test("auth normalization: non-key-shaped token routes to bearer", async () => {
    const { fetchImpl, calls } = makeMockFetch(() => jsonResponse(200, { results: {} }));
    const client = new Nebula({
      baseUrl: "https://api.example.com",
      apiKey: "eyJhbGciOiJIUzI1NiJ9.opaquebearer",
      fetchImpl,
    });
    await client.getMemory("m1");
    expect(calls[0].headers.authorization).toBe("Bearer eyJhbGciOiJIUzI1NiJ9.opaquebearer");
    expect(calls[0].headers["x-api-key"]).toBeUndefined();
  });

  test("deleteCollection unwraps and coerces to boolean", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(200, { results: { success: true } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const ok = await client.deleteCollection("c1");
    expect(ok).toBe(true);
  });

  test("listMemories(string) becomes collectionIds array filter", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.listMemories("collection-abc");
    expect(calls[0].url).toContain("collection_ids=collection-abc");
  });

  test("legacy cluster aliases are bound", () => {
    const client = new Nebula({ baseUrl: "https://api.example.com" });
    expect(client.createCluster).toBe(client.createCollection);
    expect(client.deleteCluster).toBe(client.deleteCollection);
  });
});
