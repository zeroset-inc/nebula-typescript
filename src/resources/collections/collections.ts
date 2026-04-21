// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as RetrievalAPI from '../retrieval';
import * as EngramsAPI from './engrams';
import {
  EngramAddParams,
  EngramListParams,
  EngramRemoveParams,
  Engrams,
  NebulaResultsGenericMessageResponse,
  PaginatedNebulaResultListEngramResponse,
} from './engrams';
import * as UsersAPI from './users';
import {
  PaginatedNebulaResultListUser,
  UserAddParams,
  UserListParams,
  UserRemoveParams,
  Users,
} from './users';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  engrams: EngramsAPI.Engrams = new EngramsAPI.Engrams(this._client);
  users: UsersAPI.Users = new UsersAPI.Users(this._client);

  /**
   * Create a new collection and automatically add the creating user to it.
   *
   * This endpoint allows authenticated users to create a new collection with a
   * specified name and optional description. The user creating the collection is
   * automatically added as a member.
   */
  create(
    body: CollectionCreateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCollectionResponse> {
    return this._client.post('/v1/collections', { body, ...options });
  }

  /**
   * Get details of a specific collection.
   *
   * This endpoint retrieves detailed information about a single collection
   * identified by its UUID. The user must have access to the collection to view its
   * details.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<NebulaResultsCollectionResponse> {
    return this._client.get(path`/v1/collections/${id}`, options);
  }

  /**
   * Update an existing collection's configuration.
   *
   * This endpoint allows updating the name, description, and access settings of an
   * existing collection. The user must have appropriate permissions to modify the
   * collection.
   */
  update(
    id: string,
    body: CollectionUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCollectionResponse> {
    return this._client.post(path`/v1/collections/${id}`, { body, ...options });
  }

  /**
   * Returns a paginated list of collections the authenticated user has access to.
   *
   * Results can be filtered by providing specific collection IDs. Regular users will
   * only see collections they own or have access to. Superusers can see all
   * collections.
   *
   * The collections are returned in order of last modification, with most recent
   * first.
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultListCollectionResponse> {
    return this._client.get('/v1/collections', { query, ...options });
  }

  /**
   * Delete an existing collection.
   *
   * This endpoint allows deletion of a collection identified by its UUID. The user
   * must have appropriate permissions to delete the collection. Deleting a
   * collection removes all associations but does not delete the engrams within it.
   */
  delete(id: string, options?: RequestOptions): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    return this._client.delete(path`/v1/collections/${id}`, options);
  }

  /**
   * Export collections as a CSV file.
   */
  export(
    body: CollectionExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post('/v1/collections/export', { body, ...options });
  }

  /**
   * Extracts entities and relationships from an engram.
   *
   * The entities and relationships extraction process involves:
   *
   * 1. Parsing engrams into semantic chunks
   * 2. Extracting entities and relationships using LLMs
   */
  extract(
    id: string,
    body: CollectionExtractParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post(path`/v1/collections/${id}/extract`, { body, ...options });
  }

  /**
   * Get documents with their memory entries and embeddings for graph visualization.
   *
   * This endpoint retrieves documents (engrams) from a collection along with their
   * associated memory entries (chunks). It includes embeddings needed for
   * calculating semantic similarity in the graph visualization.
   *
   * Returns: - documents: List of documents with their memory entries - pagination:
   * Pagination information
   */
  getDocumentsWithMemories(
    id: string,
    query: CollectionGetDocumentsWithMemoriesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/collections/${id}/documents-with-memories`, { query, ...options });
  }

  /**
   * Get metrics for a specific collection
   *
   * Args: collection_id: The collection UUID days: Number of days to include in time
   * series (default: 14)
   */
  getMetrics(
    collectionID: string,
    query: CollectionGetMetricsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get(path`/v1/collections/${collectionID}/metrics`, { query, ...options });
  }

  /**
   * Retrieve a collection by its (owner_id, name) combination.
   *
   * The authenticated user can only fetch collections they own, or, if superuser,
   * from anyone.
   */
  retrieveByName(
    collectionName: string,
    query: CollectionRetrieveByNameParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCollectionResponse> {
    return this._client.get(path`/v1/collections/name/${collectionName}`, { query, ...options });
  }

  /**
   * Validate collection status against actual database state.
   *
   * This endpoint computes the collection status from the actual state of engrams
   * and communities, compares it to the stored status, and updates if they are out
   * of sync.
   *
   * Returns diagnostics including:
   *
   * - Stored vs computed status
   * - Whether they are in sync
   * - Extraction progress (engrams extracted/total)
   * - Community count
   * - Whether the status was updated
   */
  validateStatus(
    id: string,
    params: CollectionValidateStatusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { force_update } = params ?? {};
    return this._client.post(path`/v1/collections/${id}/validate-status`, {
      query: { force_update },
      ...options,
    });
  }
}

export interface CollectionResponse {
  id: string;

  created_at: string;

  description: string | null;

  engram_count: number;

  graph_collection_status: string;

  graph_sync_status: string;

  name: string;

  owner_id: string | null;

  updated_at: string;

  user_count: number;

  access_tier?: string | null;

  chain_type?: string | null;

  contract_address?: string | null;

  creator_royalty_bps?: number | null;

  has_preview_access?: boolean | null;

  marketplace_metadata?: { [key: string]: unknown } | null;

  nft_collection_address?: string | null;

  owner_email?: string | null;

  owner_name?: string | null;

  preview_query_limit?: number | null;

  purchase_price_usd?: string | null;

  rental_price_monthly_usd?: string | null;
}

/**
 * Settings for knowledge graph creation.
 */
export interface GraphCreationSettings {
  /**
   * Whether to automatically trigger graph clustering after entity deduplication.
   */
  automatic_clustering?: boolean;

  /**
   * Whether to automatically deduplicate entities.
   */
  automatic_deduplication?: boolean;

  /**
   * The number of extractions to merge into a single graph extraction.
   */
  chunk_merge_count?: number;

  /**
   * Whether to include multi-message context windows when extracting from
   * conversations. Enables temporal continuity across messages.
   */
  conversation_context_enabled?: boolean;

  /**
   * Number of recent messages to include verbatim in engram_summary for conversation
   * context. Messages beyond this window are summarized.
   */
  conversation_context_window_size?: number;

  /**
   * How often (in number of messages) to re-summarize older conversation context.
   * Lower values give fresher summaries but cost more. Set to 0 to disable summary
   * caching and always summarize on-the-fly.
   */
  conversation_summary_update_frequency?: number;

  /**
   * Enhanced settings for entity deduplication.
   */
  entity_deduplication?: GraphCreationSettings.EntityDeduplication | null;

  /**
   * The types of entities to extract.
   */
  entity_types?: Array<string>;

  /**
   * Configuration for text generation during graph enrichment.
   */
  generation_config?: RetrievalAPI.GenerationConfig | null;

  /**
   * The prompt to use for entity description generation.
   */
  graph_entity_description_prompt?: string;

  /**
   * The prompt to use for knowledge graph extraction.
   */
  graph_extraction_prompt?: string;

  /**
   * Interval in minutes to check for idle system state for full re-clustering.
   */
  idle_check_interval_minutes?: number;

  /**
   * Whether to trigger full re-clustering during idle periods when no other
   * workflows are active.
   */
  idle_full_clustering?: boolean;

  /**
   * Enable incremental (streaming) clustering updates after each ingestion.
   */
  incremental_clustering?: boolean;

  /**
   * Lightweight Jaccard filter when in 'leiden' mode; used only to prune obviously
   * unrelated communities.
   */
  incremental_jaccard_filter?: number;

  /**
   * Minimum Jaccard overlap to reuse an existing community during incremental
   * updates.
   */
  incremental_jaccard_reuse_threshold?: number;

  /**
   * Minimum size of a new incremental cluster before considering promotion.
   */
  incremental_min_cluster_size?: number;

  /**
   * Number of hops around changed entities to include in incremental subgraph.
   */
  incremental_neighbor_hops?: number;

  /**
   * Minimum structural affinity (local modularity proxy) to reuse an existing
   * community in incremental updates.
   */
  incremental_structural_affinity_threshold?: number;

  /**
   * Maximum number of entities to create concurrently per extraction. Set to 1 for
   * sequential processing.
   */
  max_concurrent_entities_per_extraction?: number;

  /**
   * Maximum number of relationships to process concurrently per extraction. Set to 1
   * for sequential processing.
   */
  max_concurrent_relationships_per_extraction?: number;

  /**
   * The maximum length of the description for a node in the graph.
   */
  max_description_input_length?: number;

  /**
   * The maximum number of knowledge relationships to extract from each chunk.
   */
  max_knowledge_relationships?: number;

  /**
   * The types of relations to extract.
   */
  relation_types?: Array<string>;
}

export namespace GraphCreationSettings {
  /**
   * Enhanced settings for entity deduplication.
   */
  export interface EntityDeduplication {
    /**
     * Confidence threshold for automatic entity merging.
     */
    auto_merge_threshold?: number;

    /**
     * Maximum number of candidates to load for in-memory vectorized retrieval
     * fallback.
     */
    candidate_pool_limit?: number;

    /**
     * Whether to limit deduplication to within collections.
     */
    collection_scope?: boolean;

    /**
     * Whether to create IS_DUPLICATE_OF relationships for audit trail.
     */
    create_audit_relationships?: boolean;

    /**
     * Whether to deduplicate entities across engrams.
     */
    cross_engram_deduplication?: boolean;

    /**
     * Maximum concurrent candidate searches during deduplication.
     */
    dedup_candidate_search_limit?: number;

    /**
     * Per-entity concurrency factor (multiplied with dedup_max_concurrent_chunks for
     * effective concurrency).
     */
    dedup_llm_per_chunk_limit?: number;

    /**
     * Base concurrency factor for deduplication (multiplied with
     * dedup_llm_per_chunk_limit for effective concurrency).
     */
    dedup_max_concurrent_chunks?: number;

    /**
     * Overall timeout for enhanced deduplication per engram (seconds).
     */
    dedup_timeout_seconds?: number;

    /**
     * Whether to enable embedding caching.
     */
    embedding_cache_enabled?: boolean;

    /**
     * Whether to enable entity deduplication.
     */
    enabled?: boolean;

    /**
     * Confidence threshold for creating IS_DUPLICATE_OF relationships.
     */
    link_threshold?: number;

    /**
     * Maximum number of candidate entities to consider for each entity.
     */
    max_candidate_entities?: number;

    /**
     * Global ceiling for concurrent LLM calls across all deduplication operations.
     */
    max_concurrent_llm_calls?: number;

    /**
     * Maximum number of recursive deduplication iterations.
     */
    max_recursive_iterations?: number;

    /**
     * Prompt template for entity merging.
     */
    merge_prompt_template?: string;

    /**
     * Whether to preserve original entities with IS_DUPLICATE_OF links.
     */
    preserve_entities?: boolean;

    /**
     * Whether to resolve duplicates during search queries.
     */
    query_time_resolution?: boolean;

    /**
     * Whether to recursively resolve transitive duplicates.
     */
    recursive_deduplication?: boolean;

    /**
     * Number of top candidates to retrieve per entity using vectorized cosine
     * similarity before reranking.
     */
    retrieval_top_k?: number;

    /**
     * Minimum similarity threshold for semantic matching.
     */
    semantic_similarity_threshold?: number;

    /**
     * Whether to include IS_DUPLICATE_OF relationships in queries.
     */
    show_duplicate_relationships?: boolean;

    /**
     * Deduplication strategy: 'exact', 'semantic', or 'hybrid'.
     */
    strategy?: string;

    /**
     * Whether to use engram context in deduplication decisions.
     */
    use_engram_context?: boolean;

    /**
     * Whether to use LLM for intelligent entity merging.
     */
    use_llm_for_merging?: boolean;

    /**
     * Number of document embeddings to process at once during vectorized retrieval.
     */
    vector_doc_chunk_size?: number;

    /**
     * Number of query embeddings to process at once during vectorized retrieval.
     */
    vector_query_chunk_size?: number;
  }
}

export interface NebulaResultsCollectionResponse {
  results: CollectionResponse;
}

export interface PaginatedNebulaResultListCollectionResponse {
  results: Array<CollectionResponse>;

  total_entries: number;
}

export type CollectionExportResponse = unknown;

export type CollectionGetDocumentsWithMemoriesResponse = unknown;

export type CollectionGetMetricsResponse = unknown;

export type CollectionValidateStatusResponse = unknown;

export interface CollectionCreateParams {
  /**
   * The name of the collection
   */
  name: string;

  /**
   * An optional description of the collection
   */
  description?: string | null;
}

export interface CollectionUpdateParams {
  /**
   * Access tier for the collection: 'private', 'public_preview', or 'marketplace'
   */
  access_tier?: string | null;

  /**
   * An optional description of the collection
   */
  description?: string | null;

  /**
   * Whether to generate a new synthetic description for the collection
   */
  generate_description?: boolean | null;

  /**
   * The name of the collection
   */
  name?: string | null;
}

export interface CollectionListParams {
  /**
   * A list of collection IDs to retrieve. If not provided, all collections will be
   * returned.
   */
  ids?: Array<string>;

  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;

  /**
   * If true, only returns collections owned by the user, not all accessible
   * collections.
   */
  owner_only?: boolean;
}

export interface CollectionExportParams {
  /**
   * Specific columns to export
   */
  columns?: Array<string> | null;

  /**
   * Filters to apply to the export
   */
  filters?: { [key: string]: unknown } | null;

  /**
   * Whether to include column headers
   */
  include_header?: boolean | null;
}

export interface CollectionExtractParams {
  /**
   * Whether to automatically trigger graph clustering after entity deduplication.
   */
  automatic_clustering?: boolean;

  /**
   * Whether to automatically deduplicate entities.
   */
  automatic_deduplication?: boolean;

  /**
   * The number of extractions to merge into a single graph extraction.
   */
  chunk_merge_count?: number;

  /**
   * Whether to include multi-message context windows when extracting from
   * conversations. Enables temporal continuity across messages.
   */
  conversation_context_enabled?: boolean;

  /**
   * Number of recent messages to include verbatim in engram_summary for conversation
   * context. Messages beyond this window are summarized.
   */
  conversation_context_window_size?: number;

  /**
   * How often (in number of messages) to re-summarize older conversation context.
   * Lower values give fresher summaries but cost more. Set to 0 to disable summary
   * caching and always summarize on-the-fly.
   */
  conversation_summary_update_frequency?: number;

  /**
   * Enhanced settings for entity deduplication.
   */
  entity_deduplication?: CollectionExtractParams.EntityDeduplication | null;

  /**
   * The types of entities to extract.
   */
  entity_types?: Array<string>;

  /**
   * Configuration for text generation during graph enrichment.
   */
  generation_config?: RetrievalAPI.GenerationConfig | null;

  /**
   * The prompt to use for entity description generation.
   */
  graph_entity_description_prompt?: string;

  /**
   * The prompt to use for knowledge graph extraction.
   */
  graph_extraction_prompt?: string;

  /**
   * Interval in minutes to check for idle system state for full re-clustering.
   */
  idle_check_interval_minutes?: number;

  /**
   * Whether to trigger full re-clustering during idle periods when no other
   * workflows are active.
   */
  idle_full_clustering?: boolean;

  /**
   * Enable incremental (streaming) clustering updates after each ingestion.
   */
  incremental_clustering?: boolean;

  /**
   * Lightweight Jaccard filter when in 'leiden' mode; used only to prune obviously
   * unrelated communities.
   */
  incremental_jaccard_filter?: number;

  /**
   * Minimum Jaccard overlap to reuse an existing community during incremental
   * updates.
   */
  incremental_jaccard_reuse_threshold?: number;

  /**
   * Minimum size of a new incremental cluster before considering promotion.
   */
  incremental_min_cluster_size?: number;

  /**
   * Number of hops around changed entities to include in incremental subgraph.
   */
  incremental_neighbor_hops?: number;

  /**
   * Minimum structural affinity (local modularity proxy) to reuse an existing
   * community in incremental updates.
   */
  incremental_structural_affinity_threshold?: number;

  /**
   * Maximum number of entities to create concurrently per extraction. Set to 1 for
   * sequential processing.
   */
  max_concurrent_entities_per_extraction?: number;

  /**
   * Maximum number of relationships to process concurrently per extraction. Set to 1
   * for sequential processing.
   */
  max_concurrent_relationships_per_extraction?: number;

  /**
   * The maximum length of the description for a node in the graph.
   */
  max_description_input_length?: number;

  /**
   * The maximum number of knowledge relationships to extract from each chunk.
   */
  max_knowledge_relationships?: number;

  /**
   * The types of relations to extract.
   */
  relation_types?: Array<string>;
}

export namespace CollectionExtractParams {
  /**
   * Enhanced settings for entity deduplication.
   */
  export interface EntityDeduplication {
    /**
     * Confidence threshold for automatic entity merging.
     */
    auto_merge_threshold?: number;

    /**
     * Maximum number of candidates to load for in-memory vectorized retrieval
     * fallback.
     */
    candidate_pool_limit?: number;

    /**
     * Whether to limit deduplication to within collections.
     */
    collection_scope?: boolean;

    /**
     * Whether to create IS_DUPLICATE_OF relationships for audit trail.
     */
    create_audit_relationships?: boolean;

    /**
     * Whether to deduplicate entities across engrams.
     */
    cross_engram_deduplication?: boolean;

    /**
     * Maximum concurrent candidate searches during deduplication.
     */
    dedup_candidate_search_limit?: number;

    /**
     * Per-entity concurrency factor (multiplied with dedup_max_concurrent_chunks for
     * effective concurrency).
     */
    dedup_llm_per_chunk_limit?: number;

    /**
     * Base concurrency factor for deduplication (multiplied with
     * dedup_llm_per_chunk_limit for effective concurrency).
     */
    dedup_max_concurrent_chunks?: number;

    /**
     * Overall timeout for enhanced deduplication per engram (seconds).
     */
    dedup_timeout_seconds?: number;

    /**
     * Whether to enable embedding caching.
     */
    embedding_cache_enabled?: boolean;

    /**
     * Whether to enable entity deduplication.
     */
    enabled?: boolean;

    /**
     * Confidence threshold for creating IS_DUPLICATE_OF relationships.
     */
    link_threshold?: number;

    /**
     * Maximum number of candidate entities to consider for each entity.
     */
    max_candidate_entities?: number;

    /**
     * Global ceiling for concurrent LLM calls across all deduplication operations.
     */
    max_concurrent_llm_calls?: number;

    /**
     * Maximum number of recursive deduplication iterations.
     */
    max_recursive_iterations?: number;

    /**
     * Prompt template for entity merging.
     */
    merge_prompt_template?: string;

    /**
     * Whether to preserve original entities with IS_DUPLICATE_OF links.
     */
    preserve_entities?: boolean;

    /**
     * Whether to resolve duplicates during search queries.
     */
    query_time_resolution?: boolean;

    /**
     * Whether to recursively resolve transitive duplicates.
     */
    recursive_deduplication?: boolean;

    /**
     * Number of top candidates to retrieve per entity using vectorized cosine
     * similarity before reranking.
     */
    retrieval_top_k?: number;

    /**
     * Minimum similarity threshold for semantic matching.
     */
    semantic_similarity_threshold?: number;

    /**
     * Whether to include IS_DUPLICATE_OF relationships in queries.
     */
    show_duplicate_relationships?: boolean;

    /**
     * Deduplication strategy: 'exact', 'semantic', or 'hybrid'.
     */
    strategy?: string;

    /**
     * Whether to use engram context in deduplication decisions.
     */
    use_engram_context?: boolean;

    /**
     * Whether to use LLM for intelligent entity merging.
     */
    use_llm_for_merging?: boolean;

    /**
     * Number of document embeddings to process at once during vectorized retrieval.
     */
    vector_doc_chunk_size?: number;

    /**
     * Number of query embeddings to process at once during vectorized retrieval.
     */
    vector_query_chunk_size?: number;
  }
}

export interface CollectionGetDocumentsWithMemoriesParams {
  /**
   * Whether to include embedding vectors in the response
   */
  include_embeddings?: boolean;

  /**
   * Number of documents to return (1-100)
   */
  limit?: number;

  /**
   * Number of documents to skip for pagination
   */
  offset?: number;
}

export interface CollectionGetMetricsParams {
  days?: number;
}

export interface CollectionRetrieveByNameParams {
  /**
   * (Superuser only) Specify the owner_id to retrieve a collection by name
   */
  owner_id?: string | null;
}

export interface CollectionValidateStatusParams {
  /**
   * Force update to computed status even if already in sync
   */
  force_update?: boolean;
}

Collections.Engrams = Engrams;
Collections.Users = Users;

export declare namespace Collections {
  export {
    type CollectionResponse as CollectionResponse,
    type GraphCreationSettings as GraphCreationSettings,
    type NebulaResultsCollectionResponse as NebulaResultsCollectionResponse,
    type PaginatedNebulaResultListCollectionResponse as PaginatedNebulaResultListCollectionResponse,
    type CollectionExportResponse as CollectionExportResponse,
    type CollectionGetDocumentsWithMemoriesResponse as CollectionGetDocumentsWithMemoriesResponse,
    type CollectionGetMetricsResponse as CollectionGetMetricsResponse,
    type CollectionValidateStatusResponse as CollectionValidateStatusResponse,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionUpdateParams as CollectionUpdateParams,
    type CollectionListParams as CollectionListParams,
    type CollectionExportParams as CollectionExportParams,
    type CollectionExtractParams as CollectionExtractParams,
    type CollectionGetDocumentsWithMemoriesParams as CollectionGetDocumentsWithMemoriesParams,
    type CollectionGetMetricsParams as CollectionGetMetricsParams,
    type CollectionRetrieveByNameParams as CollectionRetrieveByNameParams,
    type CollectionValidateStatusParams as CollectionValidateStatusParams,
  };

  export {
    Engrams as Engrams,
    type NebulaResultsGenericMessageResponse as NebulaResultsGenericMessageResponse,
    type PaginatedNebulaResultListEngramResponse as PaginatedNebulaResultListEngramResponse,
    type EngramListParams as EngramListParams,
    type EngramAddParams as EngramAddParams,
    type EngramRemoveParams as EngramRemoveParams,
  };

  export {
    Users as Users,
    type PaginatedNebulaResultListUser as PaginatedNebulaResultListUser,
    type UserListParams as UserListParams,
    type UserAddParams as UserAddParams,
    type UserRemoveParams as UserRemoveParams,
  };
}
