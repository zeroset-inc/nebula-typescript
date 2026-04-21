// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Chunks extends APIResource {
  /**
   * Get a specific chunk by its ID.
   *
   * Returns the chunk's content, metadata, and associated engram/collection
   * information. Users can only retrieve chunks they own or have access to through
   * collections.
   *
   * @example
   * ```ts
   * const nebulaResultsChunkResponse =
   *   await client.chunks.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<NebulaResultsChunkResponse> {
    return this._client.get(path`/v1/chunks/${id}`, options);
  }

  /**
   * Update an existing chunk's content and/or metadata.
   *
   * The chunk's vectors will be automatically recomputed based on the new content.
   * Users can only update chunks they own unless they are superusers.
   *
   * @example
   * ```ts
   * const nebulaResultsChunkResponse =
   *   await client.chunks.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *       text: 'text',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    body: ChunkUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsChunkResponse> {
    return this._client.post(path`/v1/chunks/${id}`, { body, ...options });
  }

  /**
   * List chunks with pagination support.
   *
   * Returns a paginated list of chunks that the user has access to. Results can be
   * filtered and sorted based on various parameters. Vector embeddings are only
   * included if specifically requested.
   *
   * Regular users can only list chunks they own or have access to through
   * collections. Superusers can list all chunks in the system.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultListChunkResponse =
   *   await client.chunks.list();
   * ```
   */
  list(
    query: ChunkListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultListChunkResponse> {
    return this._client.get('/v1/chunks', { query, ...options });
  }

  /**
   * Delete a specific chunk by ID.
   *
   * This permanently removes the chunk and its associated vector embeddings. The
   * parent engram remains unchanged. Users can only delete chunks they own unless
   * they are superusers.
   *
   * @example
   * ```ts
   * const nebulaResultsGenericBooleanResponse =
   *   await client.chunks.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<NebulaResultsGenericBooleanResponse> {
    return this._client.delete(path`/v1/chunks/${id}`, options);
  }

  /**
   * Perform a semantic search query over all stored chunks.
   *
   * This endpoint allows for complex filtering of search results using
   * PostgreSQL-based queries. Filters can be applied to various fields such as
   * engram_id, and internal metadata values.
   *
   * Allowed operators include `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`,
   * `ilike`, `in`, and `nin`.
   *
   * @example
   * ```ts
   * const response = await client.chunks.search({
   *   query: 'query',
   * });
   * ```
   */
  search(body: ChunkSearchParams, options?: RequestOptions): APIPromise<ChunkSearchResponse> {
    return this._client.post('/v1/chunks/search', { body, ...options });
  }
}

export interface ChunkResponse {
  id: string;

  collection_ids: Array<string>;

  engram_id: string;

  metadata: { [key: string]: unknown };

  owner_id: string;

  text: string;

  vector?: Array<number> | null;
}

/**
 * Result of a search operation.
 */
export interface ChunkSearchResult {
  id: string;

  collection_ids: Array<string>;

  engram_id: string;

  metadata: { [key: string]: unknown };

  owner_id: string | null;

  text: string;

  score?: number | null;

  timestamp?: string | null;
}

export interface NebulaResultsChunkResponse {
  results: ChunkResponse;
}

export interface NebulaResultsGenericBooleanResponse {
  results: NebulaResultsGenericBooleanResponse.Results;
}

export namespace NebulaResultsGenericBooleanResponse {
  export interface Results {
    success: boolean;
  }
}

export interface PaginatedNebulaResultListChunkResponse {
  results: Array<ChunkResponse>;

  total_entries: number;
}

/**
 * Simplified search settings with automatic hybrid search and type-specific
 * limits.
 */
export interface SearchSettings {
  /**
   * Enable conceptual expansion for cross-domain discovery through overlapping SLPA
   * concepts
   */
  enable_conceptual_expansion?: boolean;

  /**
   * Filters to apply to the search. Allowed operators include `eq`, `neq`, `gt`,
   * `gte`, `lt`, `lte`, `like`, `ilike`, `in`, and `nin`.
   *
   *       Commonly seen filters include operations include the following:
   *
   *         `{"engram_id": {"$eq": "9fbe403b-..."}}`
   *
   *         `{"engram_id": {"$in": ["9fbe403b-...", "3e157b3a-..."]}}`
   *
   *         `{"collection_ids": {"$overlap": ["122fdf6a-...", "..."]}}`
   *
   *         `{"$and": {"$engram_id": ..., "collection_ids": ...}}`
   *
   *       **Special Filter Keys for Graph Search:**
   *
   *         `{"source_role": "user"}` - Filter by source role (e.g., 'user', 'assistant', 'CEO')
   *
   *         `{"timestamp": {"$gte": "2024-01-01", "$lte": "2024-12-31"}}` - Filter by timestamp (date range)
   *
   *         `{"owner_scope": ["user_id_1", "user_id_2"]}` - Filter by owner IDs
   */
  filters?: { [key: string]: unknown };

  /**
   * Weight for fulltext search in hybrid mode. Set to 0 for pure semantic search.
   */
  fulltext_weight?: number;

  /**
   * Whether to include element metadata in the search results
   */
  include_metadatas?: boolean;

  /**
   * Whether to include search score values in the search results
   */
  include_scores?: boolean;

  /**
   * Maximum number of overall results to return
   */
  limit?: number;

  /**
   * Graph search algorithm: 'fast' (fast BFS) or 'super' (SuperBFS with
   * contextualization)
   */
  search_mode?: string;

  /**
   * Weight for semantic search in hybrid mode. Set to 0 for pure fulltext search.
   */
  semantic_weight?: number;
}

export interface ChunkSearchResponse {
  results: Array<ChunkSearchResult>;
}

export interface ChunkUpdateParams {
  id: string;

  text: string;

  metadata?: { [key: string]: unknown } | null;
}

export interface ChunkListParams {
  /**
   * Include vector data in response
   */
  include_vectors?: boolean;

  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * Filter by metadata
   */
  metadata_filter?: string | null;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;
}

export interface ChunkSearchParams {
  query: string;

  /**
   * Simplified search settings with automatic hybrid search and type-specific
   * limits.
   */
  search_settings?: SearchSettings;
}

export declare namespace Chunks {
  export {
    type ChunkResponse as ChunkResponse,
    type ChunkSearchResult as ChunkSearchResult,
    type NebulaResultsChunkResponse as NebulaResultsChunkResponse,
    type NebulaResultsGenericBooleanResponse as NebulaResultsGenericBooleanResponse,
    type PaginatedNebulaResultListChunkResponse as PaginatedNebulaResultListChunkResponse,
    type SearchSettings as SearchSettings,
    type ChunkSearchResponse as ChunkSearchResponse,
    type ChunkUpdateParams as ChunkUpdateParams,
    type ChunkListParams as ChunkListParams,
    type ChunkSearchParams as ChunkSearchParams,
  };
}
