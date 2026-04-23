// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Sources extends APIResource {
  /**
   * Update an existing source's content and/or metadata.
   *
   * The source's vectors will be automatically recomputed based on the new content.
   * Users can only update sources they own unless they are superusers.
   *
   * @example
   * ```ts
   * const source = await client.sources.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { content: 'content' },
   * );
   * ```
   */
  update(id: string, params: SourceUpdateParams, options?: RequestOptions): APIPromise<SourceUpdateResponse> {
    const { collection_id, ...body } = params;
    return this._client.patch(path`/v1/sources/${id}`, { query: { collection_id }, body, ...options });
  }

  /**
   * List sources with pagination support.
   *
   * Returns a paginated list of sources that the user has access to. Results can be
   * filtered and sorted based on various parameters. Vector embeddings are only
   * included if specifically requested.
   *
   * Regular users can only list sources they own or have access to through
   * collections. Superusers can list all sources in the system.
   *
   * @example
   * ```ts
   * const sources = await client.sources.list();
   * ```
   */
  list(
    query: SourceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SourceListResponse> {
    return this._client.get('/v1/sources', { query, ...options });
  }

  /**
   * Delete a specific source by ID.
   *
   * This permanently removes the source and its associated vector embeddings. The
   * parent engram remains unchanged. Users can only delete sources they own unless
   * they are superusers.
   *
   * @example
   * ```ts
   * const source = await client.sources.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(
    id: string,
    params: SourceDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SourceDeleteResponse> {
    const { collection_id } = params ?? {};
    return this._client.delete(path`/v1/sources/${id}`, { query: { collection_id }, ...options });
  }

  /**
   * Perform a semantic search query over all stored sources.
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
   * const response = await client.sources.search({
   *   query: 'query',
   * });
   * ```
   */
  search(body: SourceSearchParams, options?: RequestOptions): APIPromise<SourceSearchResponse> {
    return this._client.post('/v1/sources/search', { body, ...options });
  }
}

export interface SourceUpdateResponse {
  results: SourceUpdateResponse.Results;
}

export namespace SourceUpdateResponse {
  export interface Results {
    id: string;

    collection_ids: Array<string>;

    engram_id: string;

    metadata: { [key: string]: unknown };

    owner_id: string;

    text: string;

    content_hash?: string | null;

    created_at?: string | null;

    next_utterance_id?: string | null;

    parent_utterance_id?: string | null;

    prev_utterance_id?: string | null;

    sequence_number?: number | null;

    source_type?: string | null;

    speaker_id?: string | null;

    speaker_name?: string | null;

    timestamp?: string | null;

    token_count?: number | null;

    vector?: Array<number> | null;
  }
}

export interface SourceListResponse {
  results: Array<SourceListResponse.Result>;

  total_entries: number;
}

export namespace SourceListResponse {
  export interface Result {
    id: string;

    collection_ids: Array<string>;

    engram_id: string;

    metadata: { [key: string]: unknown };

    owner_id: string;

    text: string;

    content_hash?: string | null;

    created_at?: string | null;

    next_utterance_id?: string | null;

    parent_utterance_id?: string | null;

    prev_utterance_id?: string | null;

    sequence_number?: number | null;

    source_type?: string | null;

    speaker_id?: string | null;

    speaker_name?: string | null;

    timestamp?: string | null;

    token_count?: number | null;

    vector?: Array<number> | null;
  }
}

export interface SourceDeleteResponse {
  results: SourceDeleteResponse.Results;
}

export namespace SourceDeleteResponse {
  export interface Results {
    success: boolean;
  }
}

export interface SourceSearchResponse {
  results: Array<SourceSearchResponse.Result>;
}

export namespace SourceSearchResponse {
  /**
   * Result of a search operation.
   */
  export interface Result {
    id: string;

    collection_ids: Array<string>;

    engram_id: string;

    metadata: { [key: string]: unknown };

    owner_id: string | null;

    text: string;

    score?: number | null;

    speaker_id?: string | null;

    speaker_name?: string | null;

    timestamp?: string | null;
  }
}

export interface SourceUpdateParams {
  /**
   * Body param
   */
  content: string;

  /**
   * Query param: Collection context for copy-on-write. If provided and the parent
   * engram is shared across multiple collections, a collection-specific copy will be
   * created before applying the update.
   */
  collection_id?: string | null;

  /**
   * Body param
   */
  metadata?: { [key: string]: unknown } | null;
}

export interface SourceListParams {
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

export interface SourceDeleteParams {
  /**
   * Collection context for copy-on-write. If provided and the parent engram is
   * shared across multiple collections, a collection-specific copy will be created
   * before applying the delete.
   */
  collection_id?: string | null;
}

export interface SourceSearchParams {
  query: string;

  /**
   * Advanced search settings for fine-tuning search behavior.
   *
   * Note: Core parameters (query, collection_ids, filters) are now top-level API
   * parameters. This class contains advanced tuning options plus internal fields
   * used by the retrieval service.
   *
   * Memory search uses `effort` (auto/low/medium/high) to control compute.
   */
  search_settings?: SourceSearchParams.SearchSettings;
}

export namespace SourceSearchParams {
  /**
   * Advanced search settings for fine-tuning search behavior.
   *
   * Note: Core parameters (query, collection_ids, filters) are now top-level API
   * parameters. This class contains advanced tuning options plus internal fields
   * used by the retrieval service.
   *
   * Memory search uses `effort` (auto/low/medium/high) to control compute.
   */
  export interface SearchSettings {
    /**
     * Compute effort budget (auto/low/medium/high). Controls traversal compute for
     * memory search, not MemoryRecall size.
     */
    effort?: 'auto' | 'low' | 'medium' | 'high';

    /**
     * Enable conceptual expansion for cross-domain discovery through overlapping
     * concepts
     */
    enable_conceptual_expansion?: boolean;

    /**
     * Internal: Filters populated by the API router
     */
    filters?: { [key: string]: unknown };

    /**
     * Weight for fulltext search in hybrid mode (0-1). Set to 0 for pure semantic
     * search.
     */
    fulltext_weight?: number;

    /**
     * Internal: Graph traversal settings (bfs_max_depth, semantic_threshold, etc.)
     */
    graph_settings?: { [key: string]: unknown };

    /**
     * Internal: Set by select_search_filters when an owner_id $in partition-pruning
     * wrapper has been added around the filter tree. Used by the in-memory graph read
     * engine to strip the Postgres-only wrapper before evaluating delegation.
     */
    has_pruning_gate?: boolean;

    /**
     * Whether to include search score values in the search results
     */
    include_scores?: boolean;

    /**
     * Weight for semantic search in hybrid mode (0-1). Set to 0 for pure fulltext
     * search.
     */
    semantic_weight?: number;

    /**
     * Include full internal metadata, UUIDs, and confidence fields in MemoryRecall
     * responses. When False, returns compact LLM-optimized format.
     */
    verbose?: boolean;
  }
}

export declare namespace Sources {
  export {
    type SourceUpdateResponse as SourceUpdateResponse,
    type SourceListResponse as SourceListResponse,
    type SourceDeleteResponse as SourceDeleteResponse,
    type SourceSearchResponse as SourceSearchResponse,
    type SourceUpdateParams as SourceUpdateParams,
    type SourceListParams as SourceListParams,
    type SourceDeleteParams as SourceDeleteParams,
    type SourceSearchParams as SourceSearchParams,
  };
}
