// Handwritten Nebula DX layer.
//
// Carries only the methods that need real dispatch logic: storeMemory's
// create-vs-append branch, bulk storeMemories with a concurrency cap,
// positional connector helpers (connectProvider/listConnections/
// disconnectConnection), and auth normalization.
//
// For everything else, use the resource methods directly. Resource
// methods now return unwrapped values natively (the generator peels
// the `{results: X}` wire envelope), so there's no separate auto-
// generated unwrap layer to extend.
//
// Source of truth: nebula-sdks/custom/typescript/dx.ts
// The generator copies this file into sdks/typescript/src/lib/dx.ts on every
// `bun run generate`. Edit the source, not the copy.

import { NebulaClient } from "../client.ts";
import {
  type ClientOptions,
  type components,
} from "../index.ts";

type Schemas = components["schemas"];
type SnapshotEnvelopeInput = Schemas["SnapshotEnvelope-Input"];
type SnapshotEnvelopeOutput = Schemas["SnapshotEnvelope-Output"];

export type CompatClientOptions = ClientOptions & {
  apiKey?: string | null;
  baseUrl?: string | null;
  // Stainless-shape capital-U alias. Some internal callers, including the
  // local playground WebSocket server, still pass `baseURL`; without this
  // alias the value falls through unused and the runtime defaults to
  // api.zeroset.com.
  baseURL?: string | null;
  // Stainless-shape alias for `timeoutMs`. Same compat reason.
  timeout?: number | null;
  bearerToken?: string | null;
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
  kind?: Schemas["EngramKind"] | null;
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

export class Nebula extends NebulaClient {
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
    // `memories.create` now returns the unwrapped inner type directly
    // (the generator peels the wire `{results: X}` envelope).
    const result = await this.memories.create(
      toMemoryCreateParams(memory as MemoryCreateInput),
      options
    );
    if (isSnapshotResult(result)) {
      return (result.snapshot ?? result) as SnapshotEnvelopeOutput;
    }
    return extractID(result);
  }

  /**
   * Bulk parallel version of storeMemory with a concurrency cap.
   *
   * Default 8 concurrent in-flight requests matches the Python DX's
   * `asyncio.Semaphore(max_concurrency)` pattern. Use `maxConcurrency: 1`
   * for strictly serial submission; higher values risk overwhelming the
   * server when memories[] is large.
   */
  async storeMemories(
    memories: MemoryInput[],
    options?: { signal?: AbortSignal; maxConcurrency?: number }
  ): Promise<(string | SnapshotEnvelopeOutput)[]> {
    const cap = Math.max(1, options?.maxConcurrency ?? 8);
    const signal = options?.signal;
    const results: (string | SnapshotEnvelopeOutput)[] = new Array(memories.length);
    let nextIndex = 0;
    const worker = async (): Promise<void> => {
      while (true) {
        const i = nextIndex++;
        if (i >= memories.length) return;
        results[i] = await this.storeMemory(memories[i], { signal });
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(cap, memories.length) }, () => worker())
    );
    return results;
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
    return this.memories.list(normalized as never, options);
  }

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
    return this.connectors.connect({ provider, body }, options);
  }

  /** Positional listConnections(collectionID) — wraps the query wrapper. */
  async listConnections(
    collectionID: string,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.list({ collectionId: collectionID } as never, options);
  }

  /** Positional disconnect(connectionID, deleteMemories?). */
  async disconnectConnection(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.disconnect(
      { connectionId: connectionID, deleteMemories } as never,
      options
    );
  }

  /** Alias for disconnectConnection (same arg shape). */
  async disconnect(
    connectionID: string,
    deleteMemories = false,
    options?: { signal?: AbortSignal }
  ): Promise<unknown> {
    return this.connectors.disconnect(
      { connectionId: connectionID, deleteMemories } as never,
      options
    );
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
    apiKey,
    baseUrl: baseUrlAlias,
    baseURL: baseURLCapAlias,
    timeout: timeoutAlias,
    bearerToken,
    ...rest
  } = options;
  const restClientOptions: ClientOptions = rest;
  return {
    ...restClientOptions,
    apiKey: apiKey ?? undefined,
    bearerToken: bearerToken ?? undefined,
    baseUrl:
      firstDefined(restClientOptions.baseUrl, baseUrlAlias, baseURLCapAlias) ?? undefined,
    timeoutMs:
      firstDefined(restClientOptions.timeoutMs, timeoutAlias) ?? undefined,
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
  if (params.messages != null && !params.kind) {
    params.kind = "conversation";
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
