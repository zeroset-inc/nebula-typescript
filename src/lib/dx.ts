import { Nebula as GeneratedNebula, type ClientOptions } from '../client';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import type { PromiseOrValue } from '../internal/types';
import type { RequestOptions } from '../internal/request-options';
import type { HealthResponse } from '../resources/top-level';
import type {
  MemoryCreateParams,
  MemoryCreateResponse,
  MemoryDeleteManyResponse,
  MemoryListParams,
  MemoryListResponse,
  MemoryRetrieveResponse,
  MemorySearchParams,
  MemorySearchResponse,
  MemoryUpdateParams,
  MemoryUpdateResponse,
} from '../resources/memories';

type ResultsOf<T> = T extends { results: infer R } ? R : T;

export interface MemoryInput extends Omit<MemoryCreateParams, 'collection_id' | 'raw_text'> {
  collection_id?: string | null;
  collectionId?: string | null;
  content?: string | MemoryCreateParams['content_parts'];
  raw_text?: string | null;
  memory_id?: string | null;
}

export class Nebula extends GeneratedNebula {
  constructor(options: ClientOptions = {}) {
    super(normalizeAuthOptions(options));
  }

  override health(options?: RequestOptions): APIPromise<HealthResponse> {
    return this.get('/v1/health', {
      ...options,
      headers: buildHeaders([options?.headers, { 'X-API-Key': null, Authorization: null }]),
      __security: {},
    });
  }

  async storeMemory(memory: MemoryInput, options?: RequestOptions): Promise<string> {
    const response = await this.memories.create(toMemoryCreateParams(memory), options);
    const result = unwrapResults(response) as MemoryCreateResponse['results'];
    return extractID(result);
  }

  storeMemories(memories: MemoryInput[], options?: RequestOptions): Promise<string[]> {
    return Promise.all(memories.map((memory) => this.storeMemory(memory, options)));
  }

  getMemory(id: string, options?: RequestOptions): Promise<MemoryRetrieveResponse['results']> {
    return unwrap(this.memories.retrieve(id, options));
  }

  updateMemory(
    id: string,
    params: MemoryUpdateParams,
    options?: RequestOptions,
  ): Promise<MemoryUpdateResponse['results']> {
    return unwrap(this.memories.update(id, params, options));
  }

  listMemories(
    query: MemoryListParams | string | string[],
    options?: RequestOptions,
  ): Promise<MemoryListResponse['results']> {
    const normalized =
      typeof query === 'string' || Array.isArray(query) ? { collection_ids: arrayify(query) } : query;
    return unwrap(this.memories.list(normalized, options));
  }

  search(body: MemorySearchParams, options?: RequestOptions): Promise<ResultsOf<MemorySearchResponse>> {
    return unwrap(this.memories.search(body, options));
  }

  deleteMemory(memoryID: string, options?: RequestOptions): Promise<boolean> {
    return this.memories.delete(memoryID, options).then(() => true);
  }

  deleteMemories(memoryIDs: string[], options?: RequestOptions): Promise<MemoryDeleteManyResponse> {
    return this.memories.deleteMany({ body: memoryIDs }, options);
  }

  override delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
  override delete(memoryIDs: string[]): Promise<MemoryDeleteManyResponse>;
  override delete(pathOrMemoryIDs: string | string[], opts?: PromiseOrValue<RequestOptions>): unknown {
    if (Array.isArray(pathOrMemoryIDs)) {
      return this.deleteMemories(pathOrMemoryIDs, opts as RequestOptions | undefined);
    }

    if (isRequestPath(pathOrMemoryIDs)) {
      return super.delete(pathOrMemoryIDs, opts);
    }

    return Promise.resolve(opts).then((resolved) => this.deleteMemory(pathOrMemoryIDs, resolved));
  }
}

function normalizeAuthOptions(options: ClientOptions): ClientOptions {
  if (options.apiKey && options.accessToken == null && !looksLikeNebulaAPIKey(options.apiKey)) {
    return { ...options, apiKey: null, accessToken: options.apiKey };
  }
  return options;
}

function looksLikeNebulaAPIKey(token: string): boolean {
  const [publicPart, rawPart, extra] = token.split('.');
  return (
    extra === undefined &&
    publicPart !== undefined &&
    rawPart !== undefined &&
    rawPart.length > 0 &&
    (publicPart.startsWith('key_') || publicPart.startsWith('neb_'))
  );
}

function toMemoryCreateParams(memory: MemoryInput): MemoryCreateParams {
  const collectionID = memory.collection_id ?? memory.collectionId;
  const { collectionId: _collectionId, content, memory_id: _memoryID, ...rest } = memory;
  const params: MemoryCreateParams = { ...rest };

  if (collectionID !== undefined) {
    params.collection_id = collectionID;
  }

  if (content !== undefined) {
    if (typeof content === 'string') {
      params.raw_text = content;
    } else {
      params.content_parts = content;
    }
  }

  if (params.messages && !params.engram_type) {
    params.engram_type = 'conversation';
  }

  return params;
}

function unwrap<T>(promise: PromiseLike<T>): Promise<ResultsOf<T>> {
  return Promise.resolve(promise).then((response) => unwrapResults(response) as ResultsOf<T>);
}

function unwrapResults<T>(response: T): unknown {
  return typeof response === 'object' && response !== null && 'results' in response ?
      (response as { results: unknown }).results
    : response;
}

function extractID(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    const id = record['id'] ?? record['memory_id'] ?? record['ephemeral_collection_id'];
    if (typeof id === 'string') {
      return id;
    }
  }
  throw new Error('Nebula memory create response did not include an id');
}

function arrayify(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}

function isRequestPath(value: string): boolean {
  return value.startsWith('/') || /^https?:\/\//i.test(value);
}
