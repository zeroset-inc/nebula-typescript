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
    expect(client.memory).toBeDefined();
    expect(client.collections).toBeDefined();
  });

  test("memory.store uses one document and conversation surface", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(200, {
        results: {
          id: "11111111-2222-4333-8444-555555555555",
          state: "processing",
          failure: null,
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const input = {
      collection_id: "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = await client.memory.store(input);
    expect(result.id).toBe("11111111-2222-4333-8444-555555555555");
    expect(calls.length).toBe(1);
    expect(calls[0].url).toBe("https://api.example.com/v1/memories");
    expect(calls[0].method).toBe("POST");
    expect(calls[0].body).toMatchObject(input);
    expect((calls[0].body as Record<string, unknown>).memory_id).toMatch(
      /^[0-9a-f-]{36}$/,
    );
    expect(input).not.toHaveProperty("memory_id");
  });

  test("memory.search peels the inline-anyOf `{results: X}` envelope", async () => {
    const { fetchImpl } = makeMockFetch(() =>
      jsonResponse(200, { results: { entities: [], relationships: [] } })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.memory.search({
      query: "find this",
      retrieval_operation_id: RETRIEVAL_OPERATION_ID,
    });
    // Wire envelope `{results: X}` peeled by the generator (the response
    // schema is an inline anyOf of Wrapped* variants — each variant
    // unwraps to its inner type).
    expect(result).toEqual({ entities: [], relationships: [] });
  });

  test("memory.delete returns the unwrapped durable product state", async () => {
    const memoryId = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: { id: memoryId, state: "deleting", failure: null },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.memory.delete({
      id: memoryId,
      collectionId: "collection-1",
    });
    expect(calls[0].method).toBe("DELETE");
    expect(calls[0].url).toBe(
      `https://api.example.com/v1/memories/${memoryId}?collection_id=collection-1`
    );
    expect(calls[0].headers["x-nebula-owner-key"]).toBe("collection:collection-1");
    expect(result.state).toBe("deleting");
  });

  test("memory.deleteMany takes a collection-scoped body", async () => {
    const memoryIds = [
      "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      "11111111-aaaa-4bbb-8ccc-222222222222",
    ];
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          memories: memoryIds.map((id) => ({
            id,
            state: "deleting",
            failure: null,
          })),
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const result = await client.memory.deleteMany({
      collection_id: "collection-1",
      ids: memoryIds,
    });
    expect(calls[0].method).toBe("POST");
    expect(calls[0].url).toBe("https://api.example.com/v1/memories/delete");
    expect(calls[0].headers["x-nebula-owner-key"]).toBe("collection:collection-1");
    expect(calls[0].body).toMatchObject({
      collection_id: "collection-1",
      ids: memoryIds,
    });
    expect((calls[0].body as Record<string, unknown>).operation_id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(result.memories.map((memory) => memory.state)).toEqual([
      "deleting",
      "deleting",
    ]);
  });

  test("apiKey authenticates via Authorization: Bearer", async () => {
    const { fetchImpl, calls } = makeMockFetch(() => jsonResponse(200, { results: {} }));
    const client = new Nebula({
      baseUrl: "https://api.example.com",
      apiKey: "key_abc.secret",
      fetchImpl,
    });
    await client.memory.get("m1");
    expect(calls[0].headers.authorization).toBe("Bearer key_abc.secret");
  });

  test("collections.delete returns the durable product state", async () => {
    const { fetchImpl, calls } = makeMockFetch(() =>
      jsonResponse(202, {
        results: {
          id: "11111111-2222-4333-8444-555555555555",
          state: "deleting",
          failure: null,
        },
      })
    );
    const client = new Nebula({ baseUrl: "https://api.example.com", fetchImpl });
    const resp = await client.collections.delete(
      "11111111-2222-4333-8444-555555555555",
    );
    expect(resp.state).toBe("deleting");
    expect(calls[0].headers["idempotency-key"]).toBeUndefined();
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
