// Handwritten Nebula DX layer.
//
// Carries only the methods that need real dispatch logic (storeMemory's
// create-vs-append branch, polymorphic delete, search-affinity headers,
// auth normalization, response-shape coercion to bool). The simple
// unwrap/passthrough methods (getMemory, updateCollection, exportSnapshot,
// listProviders, ...) are generated from
// `nebula-sdks/config/dx-extensions.yaml` into `_dx_generated.ts`, which
// this class extends via `NebulaDX`.
//
// Source of truth: nebula-sdks/custom/typescript/dx.ts
// The generator copies this file into sdks/typescript/src/lib/dx.ts on every
// `bun run generate`. Edit the source, not the copy.

import { NebulaDX } from "./_dx_generated.ts";
import {
  type ClientOptions,
  type components,
} from "../index.ts";

type Schemas = components["schemas"];
type SnapshotEnvelopeInput = Schemas["SnapshotEnvelope-Input"];
type SnapshotEnvelopeOutput = Schemas["SnapshotEnvelope-Output"];

type ResultsOf<T> = T extends { results: infer R } ? R : T;
type RequestPath = `/${string}` | `http://${string}` | `https://${string}`;

export type CompatClientOptions = ClientOptions & {
  api_key?: string | null;
  apiKey?: string | null;
  baseUrl?: string | null;
  base_url?: string | null;
  accessToken?: string | null;
  bearerToken?: string | null;
  bearer_token?: string | null;
  access_token?: string | null;
};

export interface MemoryCommonInput {
  collection_id?: string | null;
  collectionId?: string | null;
  content?: string | string[] | unknown[] | null;
  raw_text?: string | null;
  chunks?: Array<string> | null;
  messages?: unknown[] | null;
  metadata?: { [key: string]: unknown } | null;
  ingestion_config?: unknown;
  ingestion_mode?: string | null;
}

export interface MemoryCreateInput extends MemoryCommonInput {
  name?: string | null;
  speaker_id?: string | null;
  speaker_name?: string | null;
  content_parts?: unknown[] | null;
  contents?: string[] | null;
  snapshot?: SnapshotEnvelopeInput | null;
  memory_id?: undefined | null;
}

export interface MemoryAppendInput extends Omit<MemoryCommonInput, "ingestion_mode" | "messages"> {
  memory_id: string;
  ingestion_mode?: string | null;
  messages?: unknown[] | null;
}

export type MemoryInput = MemoryCreateInput | MemoryAppendInput;

type MemoryCreateBody = Schemas["CreateMemoryRequest"];
type MemoryAppendBody = Schemas["AppendMemoryRequest"];

export class Nebula extends NebulaDX {
  constructor(options: CompatClientOptions = {}) {
    super(normalizeAuthOptions(normalizeClientOptions(options)));
  }

  /**
   * Polymorphic memory creator: dispatches to memories.create or memories.append
   * based on whether `memory_id` is set on the input. Returns the new memory's
   * id (string), or — when `snapshot` is set — the updated snapshot envelope.
   */
  async storeMemory(
    memory: MemoryInput,
    options?: { signal?: AbortSignal }
  ): Promise<string | SnapshotEnvelopeOutput> {
    if ("memory_id" in memory && memory.memory_id != null) {
      const memoryID = memory.memory_id;
      await this.memories.append(
        { id: memoryID, body: toMemoryAppendParams(memory) },
        options
      );
      return memoryID;
    }
    const response = await this.memories.create(
      { body: toMemoryCreateParams(memory as MemoryCreateInput) },
      options
    );
    const result = unwrapResults(response);
    if (isSnapshotResult(result)) {
      return (result.snapshot ?? result) as SnapshotEnvelopeOutput;
    }
    return extractID(result);
  }

  /** Bulk parallel version of storeMemory. */
  storeMemories(
    memories: MemoryInput[],
    options?: { signal?: AbortSignal }
  ): Promise<(string | SnapshotEnvelopeOutput)[]> {
    return Promise.all(memories.map((memory) => this.storeMemory(memory, options)));
  }

  /**
   * List memories scoped to one or more collection ids (string | string[])
   * or a full MemoryListParams object.
   */
  async listMemories(
    query: string | string[] | Record<string, unknown>,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    const normalized: Record<string, unknown> =
      typeof query === "string" || Array.isArray(query)
        ? { collectionIds: arrayify(query) }
        : query;
    return unwrap(this.memories.list(normalized as never, options));
  }

  /**
   * Memory search shortcut: unwraps `results`. (Affinity-header injection
   * is a planned enhancement; currently delegates straight to the resource.)
   */
  async search(
    body: Schemas["MemorySearchRequest"],
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return unwrap(this.memories.search({ body }, options));
  }

  /**
   * deleteCollection coerces the wire {success: bool} envelope into a Python-
   * style boolean return.
   */
  async deleteCollection(id: string, options?: { signal?: AbortSignal }): Promise<boolean> {
    const response = await this.collections.delete(id, options);
    const result = unwrapResults(response);
    return Boolean((result as { success?: boolean }).success);
  }

  // Legacy aliases — "cluster" was the old name for "collection".
  // Bound to inherited (generated) collection methods.
  createCluster = this.createCollection;
  getCluster = this.getCollection;
  getClusterByName = this.getCollectionByName;
  listClusters = this.listCollections;
  updateCluster = this.updateCollection;
  deleteCluster = this.deleteCollection;

  /**
   * Positional `connectProvider(provider, collectionID, config?)` — wraps the
   * generated `connectors.connect({provider, body})` to build the body shape.
   */
  async connectProvider(
    provider: string,
    collectionID: string,
    config?: Record<string, unknown>,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    const body: Schemas["ConnectRequest"] = {
      collection_id: collectionID,
      ...(config !== undefined ? { config } : {}),
    } as Schemas["ConnectRequest"];
    return unwrap(this.connectors.connect({ provider, body }, options));
  }

  /** Positional listConnections(collectionID) — wraps the query wrapper. */
  async listConnections(
    collectionID: string,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return unwrap(
      this.connectors.list({ collectionId: collectionID } as never, options)
    );
  }

  /** Positional disconnect(connectionID, deleteMemories?). */
  async disconnectConnection(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return unwrap(
      this.connectors.disconnect(
        { connectionId: connectionID, deleteMemories } as never,
        options
      )
    );
  }

  /** Alias for disconnectConnection (same arg shape). */
  async disconnect(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return unwrap(
      this.connectors.disconnect(
        { connectionId: connectionID, deleteMemories } as never,
        options
      )
    );
  }

  /** Single-id delete; coerces 204 to boolean true. */
  async deleteMemory(memoryID: string, options?: { signal?: AbortSignal }): Promise<boolean> {
    await this.memories.delete(memoryID, options);
    return true;
  }

  /** Bulk delete by ids. */
  async deleteMemories(
    memoryIDs: string[],
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.memories.deleteMany({ body: memoryIDs }, options);
  }

  /**
   * Polymorphic delete: dispatches based on argument type.
   * - `delete("/some/path")` -> raw HTTP DELETE (escape hatch; not implemented)
   * - `delete("memory-id")` -> deleteMemory
   * - `delete(["id1", "id2"])` -> deleteMemories (bulk)
   */
  async delete(
    pathOrMemoryIDs: RequestPath | string | string[],
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    if (Array.isArray(pathOrMemoryIDs)) {
      return this.deleteMemories(pathOrMemoryIDs, options);
    }
    if (isRequestPath(pathOrMemoryIDs)) {
      throw new Error(
        `delete("${pathOrMemoryIDs}") raw-path escape hatch is not implemented in this SDK yet`
      );
    }
    return this.deleteMemory(pathOrMemoryIDs, options);
  }
}

// ---------- helpers ----------

function normalizeAuthOptions(options: ClientOptions): ClientOptions {
  if (
    options.apiKey != null &&
    options.bearerToken == null &&
    !looksLikeNebulaAPIKey(options.apiKey)
  ) {
    return { ...options, apiKey: undefined, bearerToken: options.apiKey };
  }
  return options;
}

function normalizeClientOptions(options: CompatClientOptions): ClientOptions {
  const {
    api_key: apiKeyAlias,
    apiKey,
    baseUrl: baseUrlAlias,
    base_url: baseURLAlias,
    bearerToken,
    bearer_token: bearerTokenAlias,
    accessToken,
    access_token: accessTokenAlias,
    ...rest
  } = options;
  const restClientOptions: ClientOptions = rest;
  return {
    ...restClientOptions,
    apiKey: firstDefined(apiKey, apiKeyAlias) ?? undefined,
    bearerToken:
      firstDefined(bearerToken, bearerTokenAlias, accessToken, accessTokenAlias) ?? undefined,
    baseUrl: firstDefined(restClientOptions.baseUrl, baseUrlAlias, baseURLAlias) ?? undefined,
  };
}

function firstDefined<T>(...values: (T | null | undefined)[]): T | null | undefined {
  return values.find((value) => value !== undefined);
}

export function looksLikeNebulaAPIKey(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [publicPart, rawPart] = parts;
  return Boolean(rawPart) && (publicPart.startsWith("key_") || publicPart.startsWith("neb_"));
}

function toMemoryCreateParams(memory: MemoryCreateInput): MemoryCreateBody {
  const collectionID = memory.collection_id ?? memory.collectionId ?? undefined;
  const { collectionId: _ignore, content, memory_id: _ignoreMemoryID, ...rest } = memory;
  const params: Record<string, unknown> = { ...rest };

  if (collectionID !== undefined) {
    params.collection_id = collectionID;
  }
  if (content != null) {
    if (typeof content === "string") {
      params.raw_text = content;
    } else {
      params.content_parts = content;
    }
  }
  if (params.messages != null && !params.engram_type) {
    params.engram_type = "conversation";
  }
  return params as MemoryCreateBody;
}

function toMemoryAppendParams(memory: MemoryAppendInput): MemoryAppendBody {
  const collectionID = memory.collection_id ?? memory.collectionId ?? undefined;
  if (!collectionID) {
    throw new Error("collection_id is required when appending to an existing memory");
  }
  const params: Record<string, unknown> = { collection_id: collectionID };
  for (const key of ["metadata", "ingestion_config", "ingestion_mode", "raw_text", "chunks", "messages"] as const) {
    const value = memory[key as keyof MemoryAppendInput];
    if (value != null) params[key] = value;
  }
  const content = (memory as MemoryCommonInput).content;
  if (content != null) {
    if (typeof content === "string") {
      params.raw_text = content;
    } else if (Array.isArray(content) && content.every((item) => typeof item === "string")) {
      params.chunks = content;
    } else if (Array.isArray(content)) {
      params.messages = content;
    }
  }
  return params as MemoryAppendBody;
}

function unwrap<T>(promise: PromiseLike<T>): Promise<ResultsOf<T>> {
  return Promise.resolve(promise).then((response) => unwrapResults(response) as ResultsOf<T>);
}

function unwrapResults<T>(response: T): unknown {
  if (response !== null && typeof response === "object" && "results" in response) {
    return (response as { results: unknown }).results;
  }
  return response;
}

function extractID(value: unknown): string {
  if (typeof value === "object" && value !== null) {
    const record = value as Record<string, unknown>;
    const id =
      record["id"] ?? record["memory_id"] ?? record["engram_id"] ?? record["ephemeral_collection_id"];
    if (typeof id === "string") return id;
  }
  throw new Error("Nebula memory create response did not include an id");
}

function isSnapshotResult(value: unknown): value is { snapshot?: SnapshotEnvelopeOutput } {
  return (
    typeof value === "object" &&
    value !== null &&
    "snapshot" in (value as Record<string, unknown>)
  );
}

function arrayify(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}

function isRequestPath(value: string): boolean {
  return value.startsWith("/") || /^https?:\/\//i.test(value);
}
