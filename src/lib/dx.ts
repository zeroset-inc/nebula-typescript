import { Nebula as GeneratedNebula, type ClientOptions } from '../client';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import type { PromiseOrValue } from '../internal/types';
import type { RequestOptions } from '../internal/request-options';
import type { HealthResponse } from '../resources/top-level';
import type {
  CollectionCreateParams,
  CollectionCreateResponse,
  CollectionDeleteResponse,
  CollectionListParams,
  CollectionListResponse,
  CollectionRetrieveByNameResponse,
  CollectionRetrieveResponse,
  CollectionUpdateParams,
  CollectionUpdateResponse,
} from '../resources/collections';
import type {
  ConnectorConnectResponse,
  ConnectorDisconnectResponse,
  ConnectorListProvidersResponse,
  ConnectorListResponse,
  ConnectorRetrieveResponse,
  ConnectorSyncResponse,
} from '../resources/connectors';
import type {
  MemoryAppendParams,
  MemoryCreateParams,
  MemoryCreateResponse,
  MemoryCreateUploadParams,
  MemoryCreateUploadResponse,
  MemoryDeleteManyResponse,
  MemoryDeleteResponse,
  MemoryListParams,
  MemoryListResponse,
  MemoryRetrieveResponse,
  MemorySearchParams,
  MemorySearchResponse,
  MemoryUpdateParams,
  MemoryUpdateResponse,
} from '../resources/memories';
import type {
  SnapshotExportResponse,
  SnapshotImportParams,
  SnapshotImportResponse,
} from '../resources/snapshots';
import { path } from '../internal/utils/path';

type ResultsOf<T> = T extends { results: infer R } ? R : T;
type MemoryCreateResult = MemoryCreateResponse['results'];
type StoredMemoryResult = string | MemoryCreateResult;
type SnapshotMemoryInput = MemoryInput & { snapshot: NonNullable<MemoryCreateParams['snapshot']> };
type NonSnapshotMemoryInput = MemoryInput & { snapshot?: null | undefined };
type RequestPath = `/${string}` | `http://${string}` | `https://${string}`;
type CompatClientOptions = ClientOptions & {
  api_key?: string | null;
  baseUrl?: string | null;
  base_url?: string | null;
  bearerToken?: string | null;
  bearer_token?: string | null;
};

export interface MemoryInput extends Omit<MemoryCreateParams, 'collection_id' | 'raw_text'> {
  collection_id?: string | null;
  collectionId?: string | null;
  content?: string | MemoryCreateParams['content_parts'];
  raw_text?: string | null;
  memory_id?: string | null;
}

export class Nebula extends GeneratedNebula {
  constructor(options: CompatClientOptions = {}) {
    super(normalizeAuthOptions(normalizeClientOptions(options)));
  }

  override health(options?: RequestOptions): APIPromise<HealthResponse> {
    return this.get('/v1/health', {
      ...options,
      headers: buildHeaders([options?.headers, { 'X-API-Key': null, Authorization: null }]),
      __security: {},
    });
  }

  async storeMemory(memory: SnapshotMemoryInput, options?: RequestOptions): Promise<MemoryCreateResult>;
  async storeMemory(memory: NonSnapshotMemoryInput, options?: RequestOptions): Promise<string>;
  async storeMemory(memory: MemoryInput, options?: RequestOptions): Promise<StoredMemoryResult>;
  async storeMemory(memory: MemoryInput, options?: RequestOptions): Promise<StoredMemoryResult> {
    if (memory.memory_id) {
      const { memory_id: memoryID, collectionId: _collectionId, content, ...rest } = memory;
      await this.memories.append(memoryID, toMemoryAppendParams({ ...rest, content }), options);
      return memoryID;
    }

    const response = await this.memories.create(toMemoryCreateParams(memory), options);
    const result = unwrapResults(response);
    if (isMemoryCreateResult(result)) {
      return result;
    }
    return extractID(result);
  }

  storeMemories(memories: SnapshotMemoryInput[], options?: RequestOptions): Promise<MemoryCreateResult[]>;
  storeMemories(memories: NonSnapshotMemoryInput[], options?: RequestOptions): Promise<string[]>;
  storeMemories(memories: MemoryInput[], options?: RequestOptions): Promise<StoredMemoryResult[]>;
  storeMemories(memories: MemoryInput[], options?: RequestOptions): Promise<StoredMemoryResult[]> {
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
    const collectionIDs =
      Array.isArray(body.collection_ids) ? body.collection_ids
      : body.collection_ids ? [body.collection_ids]
      : undefined;
    return unwrap(
      this.memories.search(body, {
        ...options,
        headers: buildHeaders([options?.headers, collectionAffinityHeaders(collectionIDs)]),
      }),
    );
  }

  healthCheck(options?: RequestOptions): Promise<HealthResponse['results']> {
    return unwrap(this.health(options));
  }

  createCollection(
    body: CollectionCreateParams,
    options?: RequestOptions,
  ): Promise<CollectionCreateResponse['results']> {
    return unwrap(this.collections.create(body, options));
  }

  getCollection(id: string, options?: RequestOptions): Promise<CollectionRetrieveResponse['results']> {
    return unwrap(this.collections.retrieve(id, options));
  }

  getCollectionByName(
    name: string,
    options?: RequestOptions,
  ): Promise<CollectionRetrieveByNameResponse['results']> {
    return unwrap(this.collections.retrieveByName(name, {}, options));
  }

  listCollections(
    query: CollectionListParams = {},
    options?: RequestOptions,
  ): Promise<CollectionListResponse['results']> {
    return unwrap(this.collections.list(query, options));
  }

  updateCollection(
    id: string,
    body: CollectionUpdateParams,
    options?: RequestOptions,
  ): Promise<CollectionUpdateResponse['results']> {
    return unwrap(this.collections.update(id, body, options));
  }

  deleteCollection(id: string, options?: RequestOptions): Promise<boolean> {
    return this.collections.delete(id, options).then((response: CollectionDeleteResponse) => {
      const result = unwrapResults(response) as { success?: boolean };
      return Boolean(result.success);
    });
  }

  createCluster = this.createCollection;
  getCluster = this.getCollection;
  getClusterByName = this.getCollectionByName;
  listClusters = this.listCollections;
  updateCluster = this.updateCollection;
  deleteCluster = this.deleteCollection;

  listProviders(options?: RequestOptions): Promise<ConnectorListProvidersResponse['results']> {
    return unwrap(this.connectors.listProviders(options));
  }

  connectProvider(
    provider: string,
    collectionID: string,
    config?: Record<string, unknown>,
    options?: RequestOptions,
  ): Promise<ConnectorConnectResponse['results']> {
    return unwrap(
      this.connectors.connect(
        provider,
        config === undefined ? { collection_id: collectionID } : { collection_id: collectionID, config },
        options,
      ),
    );
  }

  listConnections(collectionID: string, options?: RequestOptions): Promise<ConnectorListResponse['results']> {
    return unwrap(this.connectors.list({ collection_id: collectionID }, options));
  }

  getConnection(
    connectionID: string,
    options?: RequestOptions,
  ): Promise<ConnectorRetrieveResponse['results']> {
    return unwrap(this.connectors.retrieve(connectionID, options));
  }

  triggerSync(connectionID: string, options?: RequestOptions): Promise<ConnectorSyncResponse['results']> {
    return unwrap(this.connectors.sync(connectionID, options));
  }

  disconnectConnection(
    connectionID: string,
    deleteMemories = false,
    options?: RequestOptions,
  ): Promise<ConnectorDisconnectResponse['results']> {
    return unwrap(this.connectors.disconnect(connectionID, { delete_memories: deleteMemories }, options));
  }

  disconnect(
    connectionID: string,
    deleteMemories = false,
    options?: RequestOptions,
  ): Promise<ConnectorDisconnectResponse['results']> {
    return this.disconnectConnection(connectionID, deleteMemories, options);
  }

  getUploadUrl(
    params: MemoryCreateUploadParams,
    options?: RequestOptions,
  ): Promise<MemoryCreateUploadResponse['results']> {
    return unwrap(this.memories.createUpload(params, options));
  }

  exportSnapshot(collectionID: string, options?: RequestOptions): Promise<SnapshotExportResponse['results']> {
    return unwrap(this.snapshots.export({ collection_id: collectionID }, options));
  }

  importSnapshot(
    snapshot: SnapshotImportParams['snapshot'],
    options?: RequestOptions,
  ): Promise<SnapshotImportResponse['results']> {
    return unwrap(this.snapshots.import({ snapshot }, options));
  }

  deleteMemory(memoryID: string, options?: PromiseOrValue<RequestOptions>): APIPromise<boolean> {
    return super
      .delete<MemoryDeleteResponse>(path`/v1/memories/${memoryID}`, options)
      ._thenUnwrap(() => true);
  }

  deleteMemories(
    memoryIDs: string[],
    options?: PromiseOrValue<RequestOptions>,
  ): APIPromise<MemoryDeleteManyResponse> {
    return super.post<MemoryDeleteManyResponse>(
      '/v1/memories/delete',
      Promise.resolve(options).then((resolved) => ({ body: memoryIDs, ...resolved })),
    );
  }

  deletePath<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return super.delete(path, opts);
  }

  override delete<Rsp>(path: RequestPath, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
  override delete(memoryID: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<boolean>;
  override delete(memoryIDs: string[]): APIPromise<MemoryDeleteManyResponse>;
  override delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp>;
  override delete(
    pathOrMemoryIDs: string | string[],
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<unknown> {
    if (Array.isArray(pathOrMemoryIDs)) {
      return this.deleteMemories(pathOrMemoryIDs, opts);
    }

    if (isRequestPath(pathOrMemoryIDs)) {
      return super.delete(pathOrMemoryIDs, opts);
    }

    return this.deleteMemory(pathOrMemoryIDs, opts);
  }
}

function normalizeAuthOptions(options: ClientOptions): ClientOptions {
  if (options.apiKey && options.accessToken == null && !looksLikeNebulaAPIKey(options.apiKey)) {
    return { ...options, apiKey: null, accessToken: options.apiKey };
  }
  return options;
}

function normalizeClientOptions(options: CompatClientOptions): ClientOptions {
  const {
    api_key: apiKeyAlias,
    baseUrl,
    base_url: baseURLAlias,
    bearerToken,
    bearer_token: bearerTokenAlias,
    ...rest
  } = options;
  return {
    ...rest,
    apiKey: rest.apiKey ?? apiKeyAlias,
    accessToken: rest.accessToken ?? bearerToken ?? bearerTokenAlias,
    baseURL: rest.baseURL ?? baseUrl ?? baseURLAlias,
  };
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

function toMemoryAppendParams(memory: MemoryInput): MemoryAppendParams {
  const collectionID = memory.collection_id ?? memory.collectionId;
  if (!collectionID) {
    throw new Error('collection_id is required when appending to an existing memory');
  }

  const { content } = memory;
  const params: MemoryAppendParams = {
    collection_id: collectionID,
  };
  if (memory.metadata !== undefined) params.metadata = memory.metadata;
  if (memory.ingestion_config !== undefined) params.ingestion_config = memory.ingestion_config;
  if (memory.ingestion_mode != null) params.ingestion_mode = memory.ingestion_mode;

  if (content != null) {
    if (typeof content === 'string') {
      params.raw_text = content;
    } else if (Array.isArray(content) && content.every((item) => typeof item === 'string')) {
      params.chunks = content;
    } else if (Array.isArray(content)) {
      params.messages = content as unknown as NonNullable<MemoryAppendParams['messages']>;
    }
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
    const id =
      record['id'] ?? record['memory_id'] ?? record['engram_id'] ?? record['ephemeral_collection_id'];
    if (typeof id === 'string') {
      return id;
    }
  }
  throw new Error('Nebula memory create response did not include an id');
}

function isMemoryCreateResult(value: unknown): value is MemoryCreateResult {
  return typeof value === 'object' && value !== null && 'snapshot' in value;
}

function arrayify(value: string | string[]): string[] {
  return Array.isArray(value) ? value : [value];
}

function collectionAffinityHeaders(collectionIDs?: string[]) {
  if (!collectionIDs?.length) {
    return undefined;
  }
  return {
    'X-Nebula-Collection-Id':
      collectionIDs.length === 1 ? collectionIDs[0] : [...collectionIDs].sort().join(','),
  };
}

function isRequestPath(value: string): boolean {
  return value.startsWith('/') || /^https?:\/\//i.test(value);
}
