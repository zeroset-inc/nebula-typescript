import { describe, test, expect } from "bun:test";
import { Nebula, NebulaClient } from "../src/index.ts";

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

  test("storeMemory forwards client idempotency key", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: { id: "mem_x" } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.storeMemory({
      collection_id: "c1",
      raw_text: "hello",
      clientIdempotencyKey: "idem-123",
    });
    expect(calls[0].body).toMatchObject({
      client_idempotency_key: "idem-123",
    });
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

  test("memories.search peels the inline-anyOf `{results: X}` envelope", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(200, { results: { entities: [], relationships: [] } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.memories.search({
      query: "find this",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
    });
    // Wire envelope `{results: X}` peeled by the generator (the response
    // schema is an inline anyOf of Wrapped* variants — each variant
    // unwraps to its inner type).
    expect(result).toEqual({ entities: [], relationships: [] });
  });

  test("memories.delete returns the accepted deletion operation", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          operation_id: "11111111-2222-4333-8444-555555555555",
          status_url: "/v1/memories/deletions/11111111-2222-4333-8444-555555555555",
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.memories.delete({
      id: "mem_to_delete",
      collectionId: "collection-1",
    });
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe(
      "https://api.example.com/v1/memories/mem_to_delete?collection_id=collection-1"
    );
    expect(calls[0].headers["x-nebula-owner-key"]).toBe("collection:collection-1");
    expect(result.operation_id).toBe("11111111-2222-4333-8444-555555555555");
  });

  test("memories.deleteMany takes a collection-scoped body", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          operation_id: "11111111-2222-4333-8444-555555555555",
          status_url: "/v1/memories/deletions/11111111-2222-4333-8444-555555555555",
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.memories.deleteMany({
      collection_id: "collection-1",
      ids: ["m1", "m2"],
    });
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/delete");
    expect(calls[0].headers["x-nebula-owner-key"]).toBe("collection:collection-1");
    expect(calls[0].body).toEqual({
      collection_id: "collection-1",
      ids: ["m1", "m2"],
    });
  });

  test("apiKey authenticates via Authorization: Bearer", async () => {
    const { fetchImpl, calls } = makeMockFetch(() => jsonResponse(200, { results: {} }));
    const client = new Nebula({
      baseUrl: "https://api.example.com",
      apiKey: "key_abc.secret",
      fetchImpl,
    });
    await client.memories.retrieve("m1");
    expect(calls[0].headers.authorization).toBe("Bearer key_abc.secret");
  });

  test("collections.delete returns the accepted deletion operation", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          operation_id: "11111111-2222-4333-8444-555555555555",
          status_url: "/v1/collections/deletions/11111111-2222-4333-8444-555555555555",
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const resp = await client.collections.delete("c1");
    expect(resp.operation_id).toBe("11111111-2222-4333-8444-555555555555");
  });

  test("listMemories(string) becomes collectionIds array filter", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, { results: [], total_entries: 0 })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    await client.listMemories("collection-abc");
    expect(calls[0].url).toContain("collection_ids=collection-abc");
  });

  test("connectProvider can select a saved workspace OAuth app", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, {
        results: { auth_url: "https://provider.example/auth", state: "state" },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });

    await client.connectProvider(
      "gmail",
      "collection-1",
      undefined,
      { mode: "workspace" },
    );

    expect(calls[0].url).toBe("https://api.example.com/v1/connectors/gmail/connect");
    expect(calls[0].method).toBe("POST");
    expect(calls[0].body).toMatchObject({
      collection_id: "collection-1",
      oauth_client_mode: "workspace",
    });
  });
});
