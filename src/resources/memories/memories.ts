// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as RetrievalAPI from '../retrieval';
import * as CollectionsAPI from '../collections/collections';
import * as EngramsAPI from '../collections/engrams';
import * as EntitiesAPI from './entities';
import {
  Entities,
  EntityExportParams,
  EntityExportResponse,
  EntityListParams,
  PaginatedNebulaResultEntity,
} from './entities';
import * as MetadataAPI from './metadata';
import {
  EngramResponse,
  Metadata,
  MetadataAppendParams,
  MetadataReplaceParams,
  NebulaResultsEngramResponse,
} from './metadata';
import * as RelationshipsAPI from './relationships';
import {
  PaginatedNebulaResultRelationship,
  RelationshipExportParams,
  RelationshipExportResponse,
  RelationshipListParams,
  Relationships,
} from './relationships';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Memories extends APIResource {
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);
  entities: EntitiesAPI.Entities = new EntitiesAPI.Entities(this._client);
  relationships: RelationshipsAPI.Relationships = new RelationshipsAPI.Relationships(this._client);

  /**
   * Create a new memory (conversation or document) using clean JSON body.
   *
   * - Use `collection_ref` (UUID or name) instead of `collection_ids`
   * - Discriminated union on `engram_type`: "conversation" or "document"
   * - For conversations: provide `messages` array
   * - For documents: provide `raw_text` or `chunks`
   *
   * @example
   * ```ts
   * const memory = await client.memories.create({
   *   collection_ref: 'collection_ref',
   *   engram_type: 'conversation',
   * });
   * ```
   */
  create(body: MemoryCreateParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/memories', { body, ...options });
  }

  /**
   * Retrieves detailed information about a specific engram by its ID.
   *
   * This endpoint returns the engram's metadata, status, and system information. It
   * does not return the engram's content - use the `/engrams/{id}/download` endpoint
   * for that.
   *
   * Users can only retrieve engrams they own or have access to through collections.
   * Superusers can retrieve any engram.
   *
   * @example
   * ```ts
   * const nebulaResultsEngramResponse =
   *   await client.memories.retrieve(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MetadataAPI.NebulaResultsEngramResponse> {
    return this._client.get(path`/v1/memories/${id}`, options);
  }

  /**
   * Update memory-level properties including name, metadata, and collection
   * associations.
   *
   * This endpoint allows updating properties of an entire memory (document or
   * conversation) without modifying its content:
   *
   * - **name**: Updates the title field in the engrams table
   * - **metadata**: Can replace or merge with existing metadata
   * - **collection_ids**: Updates engram_collections table associations
   *
   * Users can only update memories they own or have access to through collections.
   * At least one collection association must be maintained.
   *
   * @example
   * ```ts
   * const nebulaResultsEngramResponse =
   *   await client.memories.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    id: string,
    body: MemoryUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetadataAPI.NebulaResultsEngramResponse> {
    return this._client.patch(path`/v1/memories/${id}`, { body, ...options });
  }

  /**
   * Returns a paginated list of engrams the authenticated user has access to.
   *
   * Results can be filtered by providing specific engram IDs or collection IDs.
   * Regular users will only see engrams they own or have access to through
   * collections. Superusers can see all engrams.
   *
   * The engrams are returned in order of last modification, with most recent first.
   * The response includes the engram's text field if available.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultListEngramResponse =
   *   await client.memories.list();
   * ```
   */
  list(
    query: MemoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.PaginatedNebulaResultListEngramResponse> {
    return this._client.get('/v1/memories', { query, ...options });
  }

  /**
   * Delete a specific engram with graph awareness. All chunks corresponding to the
   * engram are deleted, and graph components (entities/relationships) are updated or
   * deleted based on remaining chunk references from other engrams.
   *
   * This method now properly handles graph components and maintains graph integrity
   * for search operations.
   *
   * @example
   * ```ts
   * const nebulaResultsGenericBooleanResponse =
   *   await client.memories.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    return this._client.delete(path`/v1/memories/${id}`, options);
  }

  /**
   * Append content to an existing engram.
   *
   * **For conversation engrams:**
   *
   * - Provide `messages` array with content, role, and optional metadata
   * - Works like `/conversations/{id}/messages` endpoint
   *
   * **For document engrams:**
   *
   * - Provide either `raw_text` or `chunks` to append additional content
   * - Content will be processed and added to the engram
   *
   * @example
   * ```ts
   * const response = await client.memories.append(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  append(id: string, body: MemoryAppendParams, options?: RequestOptions): APIPromise<MemoryAppendResponse> {
    return this._client.post(path`/v1/memories/${id}/append`, { body, ...options });
  }

  /**
   * Deduplicates entities from an engram.
   *
   * @example
   * ```ts
   * const nebulaResultsGenericMessageResponse =
   *   await client.memories.deduplicateEntities(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  deduplicateEntities(
    id: string,
    body: MemoryDeduplicateEntitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post(path`/v1/memories/${id}/deduplicate`, { body, ...options });
  }

  /**
   * Delete engrams based on provided filters.
   *
   * Allowed operators include: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`,
   * `ilike`, `in`, and `nin`. Deletion requests are limited to a user's own engrams.
   *
   * @example
   * ```ts
   * const nebulaResultsGenericBooleanResponse =
   *   await client.memories.deleteByFilter({
   *     body: { foo: 'bar' },
   *   });
   * ```
   */
  deleteByFilter(
    params: MemoryDeleteByFilterParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { body } = params;
    return this._client.delete('/v1/memories/by-filter', { body: body, ...options });
  }

  /**
   * Delete one or more engrams.
   *
   * This endpoint efficiently handles both single and batch deletions. When multiple
   * IDs are provided, it uses optimized batch operations.
   *
   * Args: ids: Either a single UUID or a list of UUIDs to delete
   *
   * Returns: For single deletion: boolean success response For batch deletion:
   * detailed results with successful and failed deletions
   *
   * @example
   * ```ts
   * const response = await client.memories.deleteMultiple({
   *   body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * });
   * ```
   */
  deleteMultiple(
    params: MemoryDeleteMultipleParams,
    options?: RequestOptions,
  ): APIPromise<MemoryDeleteMultipleResponse> {
    const { body } = params;
    return this._client.post('/v1/memories/delete', { body: body, ...options });
  }

  /**
   * Downloads the original file content of an engram.
   *
   * For uploaded files, returns the original file with its proper MIME type. For
   * text-only engrams, returns the content as plain text.
   *
   * Users can only download engrams they own or have access to through collections.
   *
   * @example
   * ```ts
   * await client.memories.downloadContent('id');
   * ```
   */
  downloadContent(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/v1/memories/${id}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Export multiple engrams as a zip file. Engrams can be filtered by IDs and/or
   * date range.
   *
   * The endpoint allows downloading:
   *
   * - Specific engrams by providing their IDs
   * - Engrams within a date range
   * - All accessible engrams if no filters are provided
   *
   * Files are streamed as a zip archive to handle potentially large downloads
   * efficiently.
   *
   * @example
   * ```ts
   * await client.memories.downloadZip();
   * ```
   */
  downloadZip(
    query: MemoryDownloadZipParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get('/v1/memories/download_zip', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Export engrams as a downloadable CSV file.
   *
   * @example
   * ```ts
   * const response = await client.memories.export();
   * ```
   */
  export(body: MemoryExportParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/memories/export', { body, ...options });
  }

  /**
   * Extracts entities and relationships from an engram.
   *
   * The entities and relationships extraction process involves:
   *
   *     1. Parsing engrams into semantic chunks
   *
   *     2. Extracting entities and relationships using LLMs
   *
   *     3. Storing the created entities and relationships in the knowledge graph
   *
   *     4. Preserving the engram's metadata and content, and associating the elements with collections the engram belongs to
   *
   * @example
   * ```ts
   * const nebulaResultsGenericMessageResponse =
   *   await client.memories.extractEntities(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  extractEntities(
    id: string,
    body: MemoryExtractEntitiesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post(path`/v1/memories/${id}/extract`, { body, ...options });
  }

  /**
   * Retrieves the text chunks that were generated from an engram during ingestion.
   * Chunks represent semantic sections of the engram and are used for retrieval and
   * analysis.
   *
   * Users can only access chunks from engrams they own or have access to through
   * collections. Vector embeddings are only included if specifically requested.
   *
   * Results are returned in chunk sequence order, representing their position in the
   * original engram.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultListChunkResponse =
   *   await client.memories.listChunks(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  listChunks(
    id: string,
    query: MemoryListChunksParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.PaginatedNebulaResultListChunkResponse> {
    return this._client.get(path`/v1/memories/${id}/chunks`, { query, ...options });
  }

  /**
   * Retrieves all collections that contain the specified engram. This endpoint is
   * restricted to superusers only and provides a system-wide view of engram
   * organization.
   *
   * Collections are used to organize engrams and manage access control. An engram
   * can belong to multiple collections, and users can access engrams through
   * collection membership.
   *
   * The results are paginated and ordered by collection creation date, with the most
   * recently created collections appearing first.
   *
   * NOTE - This endpoint is only available to superusers, it will be extended to
   * regular users in a future release.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultListCollectionResponse =
   *   await client.memories.listCollections('id');
   * ```
   */
  listCollections(
    id: string,
    query: MemoryListCollectionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.PaginatedNebulaResultListCollectionResponse> {
    return this._client.get(path`/v1/memories/${id}/collections`, { query, ...options });
  }

  /**
   * Perform a search query on the automatically generated engram summaries in the
   * system.
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
   * const response = await client.memories.search({
   *   query: 'query',
   * });
   * ```
   */
  search(body: MemorySearchParams, options?: RequestOptions): APIPromise<MemorySearchResponse> {
    return this._client.post('/v1/memories/search', { body, ...options });
  }
}

export interface IngestionConfig {
  app?: IngestionConfig.App | null;

  audio_transcription_model?: string | null;

  automatic_extraction?: boolean;

  /**
   * Settings for chunk enrichment.
   */
  chunk_enrichment_settings?: IngestionConfig.ChunkEnrichmentSettings;

  chunk_overlap?: number;

  chunk_size?: number;

  chunking_strategy?: (string & {}) | 'recursive' | 'character' | 'basic' | 'by_title';

  chunks_for_document_summary?: number;

  document_summary_max_length?: number;

  document_summary_model?: string | null;

  document_summary_system_prompt?: string;

  document_summary_task_prompt?: string;

  excluded_parsers?: Array<string>;

  extra_fields?: { [key: string]: unknown };

  extra_parsers?: { [key: string]: unknown };

  max_concurrent_vlm_tasks?: number;

  parser_overrides?: { [key: string]: string };

  provider?: string;

  skip_document_summary?: boolean;

  vlm?: string | null;

  vlm_batch_size?: number;

  vlm_max_tokens_to_sample?: number;

  vlm_ocr_one_page_per_chunk?: boolean;
}

export namespace IngestionConfig {
  export interface App {
    allowed_webhook_ips?: Array<string>;

    app_base_url?: string | null;

    audio_lm?: string | null;

    default_max_chunks_per_user?: number | null;

    default_max_collections_per_user?: number | null;

    default_max_documents_per_user?: number | null;

    default_max_upload_size?: number;

    extra_fields?: { [key: string]: unknown };

    fast_llm?: string | null;

    max_upload_size_by_type?: { [key: string]: number };

    planning_llm?: string | null;

    project_name?: string | null;

    quality_llm?: string | null;

    reasoning_llm?: string | null;

    require_service_api_key?: boolean;

    service_api_key?: string | null;

    stripe_secret_key?: string | null;

    stripe_webhook_secret?: string | null;

    user_tools_path?: string | null;

    vlm?: string | null;

    webhook_hmac_secret?: string | null;

    webhook_hmac_secret_previous?: string | null;

    webhook_ip_validation_enabled?: boolean;

    webhook_rate_limit_max_requests?: number;

    webhook_rate_limit_window_seconds?: number;

    webhook_signature_validation_enabled?: boolean;
  }

  /**
   * Settings for chunk enrichment.
   */
  export interface ChunkEnrichmentSettings {
    /**
     * The prompt to use for chunk enrichment
     */
    chunk_enrichment_prompt?: string | null;

    /**
     * Whether to enable chunk enrichment or not
     */
    enable_chunk_enrichment?: boolean;

    /**
     * The generation config to use for chunk enrichment
     */
    generation_config?: RetrievalAPI.GenerationConfig | null;

    /**
     * The number of preceding and succeeding chunks to include. Defaults to 2.
     */
    n_chunks?: number;
  }
}

export type IngestionMode = 'hi-res' | 'ocr' | 'fast' | 'custom';

/**
 * Search modes for the search endpoint.
 *
 * fast_mode: Fast BFS traversal (max_depth=3, simple scoring) super_mode: SuperBFS
 * with set transformers (max_depth=50, contextualized scoring)
 */
export type SearchMode = 'fast' | 'super';

export type MemoryCreateResponse = unknown;

export type MemoryAppendResponse =
  | MemoryAppendResponse.NebulaResultsMessageResponse
  | MemoryAppendResponse.NebulaResultsIngestionResponse;

export namespace MemoryAppendResponse {
  export interface NebulaResultsMessageResponse {
    results: NebulaResultsMessageResponse.Results;
  }

  export namespace NebulaResultsMessageResponse {
    export interface Results {
      id: string;

      message: RetrievalAPI.Message;

      metadata?: { [key: string]: unknown };
    }
  }

  export interface NebulaResultsIngestionResponse {
    results: NebulaResultsIngestionResponse.Results;
  }

  export namespace NebulaResultsIngestionResponse {
    export interface Results {
      /**
       * The ID of the engram that was ingested.
       */
      engram_id: string;

      /**
       * A message describing the result of the ingestion request.
       */
      message: string;

      /**
       * The task ID of the ingestion request.
       */
      task_id?: string | null;
    }
  }
}

export type MemoryDeleteMultipleResponse =
  | ChunksAPI.NebulaResultsGenericBooleanResponse
  | MemoryDeleteMultipleResponse.BatchDeleteResponse;

export namespace MemoryDeleteMultipleResponse {
  export interface BatchDeleteResponse {
    message: string;

    results: BatchDeleteResponse.Results;
  }

  export namespace BatchDeleteResponse {
    export interface Results {
      failed: Array<{ [key: string]: unknown }>;

      successful: Array<string>;

      summary: { [key: string]: unknown };
    }
  }
}

export type MemoryExportResponse = unknown;

export interface MemorySearchResponse {
  results: Array<MetadataAPI.EngramResponse>;
}

export interface MemoryCreateParams {
  /**
   * Collection UUID or name
   */
  collection_ref: string;

  /**
   * Type of memory to create
   */
  engram_type: 'conversation' | 'document';

  /**
   * Pre-chunked text for document type
   */
  chunks?: Array<string> | null;

  /**
   * Custom ingestion config for documents
   */
  ingestion_config?: IngestionConfig | null;

  /**
   * Ingestion mode for documents
   */
  ingestion_mode?: IngestionMode | null;

  /**
   * Messages for conversation type
   */
  messages?: Array<MemoryCreateParams.Message> | null;

  /**
   * Metadata for the memory
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Optional name for the memory
   */
  name?: string | null;

  /**
   * Raw text content for document type
   */
  raw_text?: string | null;
}

export namespace MemoryCreateParams {
  /**
   * A message in a conversation.
   */
  export interface Message {
    /**
     * Message content
     */
    content: string;

    /**
     * Role: 'user', 'assistant', or 'system'
     */
    role: string;

    /**
     * Optional authority score
     */
    authority?: number | null;

    /**
     * Optional message-level metadata
     */
    metadata?: { [key: string]: unknown } | null;
  }
}

export interface MemoryUpdateParams {
  /**
   * New collection associations
   */
  collection_ids?: Array<string> | null;

  /**
   * Merge with existing metadata
   */
  merge_metadata?: boolean;

  /**
   * Metadata to update
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * New name for the memory
   */
  name?: string | null;
}

export interface MemoryListParams {
  /**
   * Optional list of collection IDs to filter engrams by. If provided, exactly one
   * collection ID must be specified.
   */
  collection_ids?: Array<string> | null;

  /**
   * A list of engram IDs to retrieve. If not provided, all engrams will be returned.
   */
  ids?: Array<string>;

  /**
   * Specifies whether or not to include embeddings of each engram summary.
   */
  include_summary_embeddings?: boolean;

  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * JSON string for metadata filtering. Example: '{"metadata.source": {"$eq":
   * "playground"}}'
   */
  metadata_filters?: string | null;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;

  /**
   * If true, only returns engrams owned by the user, not all accessible engrams.
   */
  owner_only?: boolean;
}

export interface MemoryAppendParams {
  /**
   * Target collection ID for the appended content.
   */
  collection_id: string;

  /**
   * Pre-processed text chunks to append (for document engrams).
   */
  chunks?: Array<string> | null;

  /**
   * Optional ingestion configuration override (for document engrams).
   */
  ingestion_config?: IngestionConfig | null;

  /**
   * Ingestion mode for document content (ignored for conversations).
   */
  ingestion_mode?: IngestionMode;

  /**
   * List of messages to append (for conversation engrams). Each has content, role,
   * optional parent_id, metadata, authority.
   */
  messages?: Array<{ [key: string]: unknown }> | null;

  /**
   * Additional metadata for the appended content.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Raw text content to append (for document engrams).
   */
  raw_text?: string | null;
}

export interface MemoryDeduplicateEntitiesParams {
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
  entity_deduplication?: MemoryDeduplicateEntitiesParams.EntityDeduplication | null;

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

export namespace MemoryDeduplicateEntitiesParams {
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

export interface MemoryDeleteByFilterParams {
  /**
   * JSON-encoded filters
   */
  body: { [key: string]: unknown };
}

export type MemoryDeleteMultipleParams =
  | MemoryDeleteMultipleParams.Variant0
  | MemoryDeleteMultipleParams.Variant1;

export declare namespace MemoryDeleteMultipleParams {
  export interface Variant0 {
    body: string;
  }

  export interface Variant1 {
    body: Array<string>;
  }
}

export interface MemoryDownloadZipParams {
  /**
   * Filter engrams created before this date.
   */
  end_date?: string | null;

  /**
   * List of engram IDs to include in the export. If not provided, all accessible
   * engrams will be included.
   */
  engram_ids?: Array<string> | null;

  /**
   * Filter engrams created on or after this date.
   */
  start_date?: string | null;
}

export interface MemoryExportParams {
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

export interface MemoryExtractEntitiesParams {
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
  entity_deduplication?: MemoryExtractEntitiesParams.EntityDeduplication | null;

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

export namespace MemoryExtractEntitiesParams {
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

export interface MemoryListChunksParams {
  /**
   * Whether to include vector embeddings in the response.
   */
  include_vectors?: boolean | null;

  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;
}

export interface MemoryListCollectionsParams {
  /**
   * Specifies a limit on the number of objects to return, ranging between 1 and 100.
   * Defaults to 100.
   */
  limit?: number;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;
}

export interface MemorySearchParams {
  /**
   * The search query to perform.
   */
  query: string;

  /**
   * Graph search algorithm selection:
   *
   * `fast`: Fast BFS graph traversal (max_depth=3, simple scoring) `super`: SuperBFS
   * with set transformers (max_depth=3, contextualized scoring, default)
   *
   * All modes now use depth=3 for optimal speed + relevance balance. All search
   * settings can be controlled via `search_settings` regardless of mode.
   */
  search_mode?: SearchMode;

  /**
   * Settings for engram search
   */
  search_settings?: ChunksAPI.SearchSettings;
}

Memories.Metadata = Metadata;
Memories.Entities = Entities;
Memories.Relationships = Relationships;

export declare namespace Memories {
  export {
    type IngestionConfig as IngestionConfig,
    type IngestionMode as IngestionMode,
    type SearchMode as SearchMode,
    type MemoryCreateResponse as MemoryCreateResponse,
    type MemoryAppendResponse as MemoryAppendResponse,
    type MemoryDeleteMultipleResponse as MemoryDeleteMultipleResponse,
    type MemoryExportResponse as MemoryExportResponse,
    type MemorySearchResponse as MemorySearchResponse,
    type MemoryCreateParams as MemoryCreateParams,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryListParams as MemoryListParams,
    type MemoryAppendParams as MemoryAppendParams,
    type MemoryDeduplicateEntitiesParams as MemoryDeduplicateEntitiesParams,
    type MemoryDeleteByFilterParams as MemoryDeleteByFilterParams,
    type MemoryDeleteMultipleParams as MemoryDeleteMultipleParams,
    type MemoryDownloadZipParams as MemoryDownloadZipParams,
    type MemoryExportParams as MemoryExportParams,
    type MemoryExtractEntitiesParams as MemoryExtractEntitiesParams,
    type MemoryListChunksParams as MemoryListChunksParams,
    type MemoryListCollectionsParams as MemoryListCollectionsParams,
    type MemorySearchParams as MemorySearchParams,
  };

  export {
    Metadata as Metadata,
    type EngramResponse as EngramResponse,
    type NebulaResultsEngramResponse as NebulaResultsEngramResponse,
    type MetadataAppendParams as MetadataAppendParams,
    type MetadataReplaceParams as MetadataReplaceParams,
  };

  export {
    Entities as Entities,
    type PaginatedNebulaResultEntity as PaginatedNebulaResultEntity,
    type EntityExportResponse as EntityExportResponse,
    type EntityListParams as EntityListParams,
    type EntityExportParams as EntityExportParams,
  };

  export {
    Relationships as Relationships,
    type PaginatedNebulaResultRelationship as PaginatedNebulaResultRelationship,
    type RelationshipExportResponse as RelationshipExportResponse,
    type RelationshipListParams as RelationshipListParams,
    type RelationshipExportParams as RelationshipExportParams,
  };
}
