// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Memories extends APIResource {
  /**
   * Create a new memory (conversation or document) using clean JSON body.
   *
   * - Use `collection_id` (UUID)
   * - `kind` is optional and inferred from payload shape:
   *   - If `messages` present -> conversation
   *   - Otherwise -> document
   * - For conversations: provide `messages` array
   * - For documents: provide `raw_text` or `chunks`
   * - Use `snapshot` for device-memory mode (mutually exclusive with collection_id)
   */
  create(body: MemoryCreateParams, options?: RequestOptions): APIPromise<MemoryCreateResponse> {
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
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MemoryRetrieveResponse> {
    return this._client.get(path`/v1/memories/${id}`, options);
  }

  /**
   * Update memory-level properties including name, metadata, and collection
   * associations.
   *
   * This endpoint allows updating properties of an entire memory (document or
   * conversation) without modifying its content:
   *
   * - **name**: Updates the authoritative engram title
   * - **metadata**: Can replace or merge with existing metadata
   * - **collection_ids**: Updates authoritative engram collection associations
   *
   * Users can only update memories they own or have access to through collections.
   * At least one collection association must be maintained.
   *
   * If collection_id is provided and the engram is shared across collections, a
   * copy-on-write will be performed to create a collection-specific copy before
   * modification.
   */
  update(id: string, params: MemoryUpdateParams, options?: RequestOptions): APIPromise<MemoryUpdateResponse> {
    const { collection_id, ...body } = params;
    return this._client.patch(path`/v1/memories/${id}`, { query: { collection_id }, body, ...options });
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
   */
  list(
    query: MemoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoryListResponse> {
    return this._client.get('/v1/memories', { query, ...options });
  }

  /**
   * Delete a specific engram with graph awareness. All chunks corresponding to the
   * engram are deleted, and graph components (entities/relationships) are updated or
   * deleted based on remaining chunk references from other engrams.
   *
   * This method now properly handles graph components and maintains graph integrity
   * for search operations.
   */
  delete(id: string, options?: RequestOptions): APIPromise<MemoryDeleteResponse> {
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
   */
  append(id: string, body: MemoryAppendParams, options?: RequestOptions): APIPromise<MemoryAppendResponse> {
    return this._client.post(path`/v1/memories/${id}/append`, { body, ...options });
  }

  /**
   * Get a presigned URL for uploading large files directly to S3.
   *
   * Use this for files larger than 5MB that cannot be sent inline as base64. After
   * uploading, reference the file in memory creation using S3FileReference.
   *
   * Args: filename: Original filename (e.g., "image.jpg") content_type: MIME type
   * (e.g., "image/jpeg", "application/pdf") file_size: Expected file size in bytes
   * (max 100MB)
   *
   * Returns: dict with: - upload_url: Presigned URL for PUT request (expires in 1
   * hour) - upload_headers: Headers that must be sent with the presigned PUT
   * request - s3_key: The S3 key to reference in memory creation - bucket: S3 bucket
   * name - expires_in: Seconds until URL expires - max_size: Maximum allowed file
   * size
   */
  createUpload(
    params: MemoryCreateUploadParams,
    options?: RequestOptions,
  ): APIPromise<MemoryCreateUploadResponse> {
    const { content_type, file_size, filename } = params;
    return this._client.post('/v1/memories/upload', {
      query: { content_type, file_size, filename },
      ...options,
    });
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
   */
  deleteMany(params: MemoryDeleteManyParams, options?: RequestOptions): APIPromise<MemoryDeleteManyResponse> {
    const { body } = params;
    return this._client.post('/v1/memories/delete', { body: body, ...options });
  }

  /**
   * Delete a file from S3 that was uploaded via a presigned URL. Verifies the caller
   * owns the file via S3 object metadata.
   */
  deleteUpload(
    params: MemoryDeleteUploadParams,
    options?: RequestOptions,
  ): APIPromise<MemoryDeleteUploadResponse> {
    const { s3_key } = params;
    return this._client.delete('/v1/memories/upload', { query: { s3_key }, ...options });
  }

  /**
   * Perform a search query across your memories.
   *
   * **Standard mode** (collection_ids or readable-scope search): returns
   * hierarchical MemoryRecall with semantics, episodes, procedures, and sources.
   *
   * **Snapshot mode** (snapshot field): returns graph-search results with {entities,
   * relationships} from stateless in-memory traversal.
   */
  search(body: MemorySearchParams, options?: RequestOptions): APIPromise<MemorySearchResponse> {
    return this._client.post('/v1/memories/search', { body, ...options });
  }
}

/**
 * Create-memory success response. Standard memory ingestion returns an accepted
 * async-ingestion envelope; snapshot mode returns the updated snapshot
 * synchronously.
 */
export type MemoryCreateResponse =
  | MemoryCreateResponse.NebulaResultsMemoryCreateAcceptedResponse
  | MemoryCreateResponse.NebulaResultsSnapshotMutationResult;

export namespace MemoryCreateResponse {
  export interface NebulaResultsMemoryCreateAcceptedResponse {
    /**
     * Accepted-response envelope for async memory ingestion.
     */
    results: NebulaResultsMemoryCreateAcceptedResponse.Results;
  }

  export namespace NebulaResultsMemoryCreateAcceptedResponse {
    /**
     * Accepted-response envelope for async memory ingestion.
     */
    export interface Results {
      id: string;

      message: string;

      /**
       * WAL committed sequence number from this placeholder write, for read-your-writes
       * assertions on the next collection-scoped list call. A non-zero value indicates
       * the request appended a WAL entry; pass it back as `min_applied_wal_seq` on GET
       * /v1/memories to wait for the entry's visibility before serving. Zero on
       * idempotent observe-existing replays and on multi-shard collections (per-shard
       * scalars are not comparable across shards) — clients should treat zero as 'no
       * assertion to make.' Single-shard collections only.
       */
      applied_wal_seq?: number;

      engram_id?: string | null;

      memory_id?: string | null;

      status?: 'parsing' | 'processing' | 'queued' | null;

      task_id?: string | null;
    }
  }

  export interface NebulaResultsSnapshotMutationResult {
    /**
     * Updated snapshot returned by snapshot-mode memory writes.
     */
    results: NebulaResultsSnapshotMutationResult.Results;
  }

  export namespace NebulaResultsSnapshotMutationResult {
    /**
     * Updated snapshot returned by snapshot-mode memory writes.
     */
    export interface Results {
      /**
       * Portable full snapshot owned by the client.
       */
      snapshot: Results.Snapshot;
    }

    export namespace Results {
      /**
       * Portable full snapshot owned by the client.
       */
      export interface Snapshot {
        collection_id: string;

        root_hash: string;

        created_at?: string;

        format_version?: number;

        generation?: number;

        /**
         * A complete graph payload or a context subgraph payload.
         */
        graph?: Snapshot.Graph;
      }

      export namespace Snapshot {
        /**
         * A complete graph payload or a context subgraph payload.
         */
        export interface Graph {
          entities?: Array<Graph.Entity>;

          /**
           * A positionally-aligned masked embedding matrix.
           */
          entity_description_embeddings?: Graph.EntityDescriptionEmbeddings;

          /**
           * A positionally-aligned masked embedding matrix.
           */
          relationship_description_embeddings?: Graph.RelationshipDescriptionEmbeddings;

          /**
           * A positionally-aligned masked embedding matrix.
           */
          relationship_relation_embeddings?: Graph.RelationshipRelationEmbeddings;

          relationships?: Array<Graph.Relationship>;
        }

        export namespace Graph {
          /**
           * Canonical entity record used in snapshots, WAL ops, and segments.
           */
          export interface Entity {
            id: string;

            created_at: string;

            engram_id: string;

            name: string;

            updated_at: string;

            category?: string | null;

            chunk_ids?: Array<string>;

            collection_id?: string;

            description?: string | null;

            fts_terms?: { [key: string]: number } | null;

            metadata?: { [key: string]: unknown };

            relationship_count?: number;
          }

          /**
           * A positionally-aligned masked embedding matrix.
           */
          export interface EntityDescriptionEmbeddings {
            dim?: number;

            encoding?: 'npy-base64';

            mask_b64?: string;

            values_b64?: string;
          }

          /**
           * A positionally-aligned masked embedding matrix.
           */
          export interface RelationshipDescriptionEmbeddings {
            dim?: number;

            encoding?: 'npy-base64';

            mask_b64?: string;

            values_b64?: string;
          }

          /**
           * A positionally-aligned masked embedding matrix.
           */
          export interface RelationshipRelationEmbeddings {
            dim?: number;

            encoding?: 'npy-base64';

            mask_b64?: string;

            values_b64?: string;
          }

          /**
           * Canonical relationship record used in snapshots, WAL ops, and segments.
           */
          export interface Relationship {
            id: string;

            created_at: string;

            object_id: string;

            subject_id: string;

            updated_at: string;

            category?: string | null;

            chunk_ids?: Array<string>;

            collection_id?: string;

            description?: string | null;

            engram_id?: string | null;

            inference_metadata?: { [key: string]: unknown } | null;

            metadata?: { [key: string]: unknown };

            object?: string | null;

            predicate?: string;

            relationship_type?: string | null;

            subject?: string | null;

            temporal_precision?: string | null;

            valid_span?: { [key: string]: unknown } | null;

            weight?: number | null;
          }
        }
      }
    }
  }
}

export interface MemoryRetrieveResponse {
  /**
   * The unified engram model: typed kind + per-kind substructure.
   *
   * `kind` is the canonical discriminator. The per-kind `conversation` and
   * `document` substructures hold typed fields known to the platform; `metadata` is
   * reserved for user-supplied annotations and must never carry platform-written
   * discriminators or routing markers.
   *
   * Construction enforces shape consistency via a model validator:
   * `kind=conversation` must not carry document fields, `kind=document` must carry a
   * `DocumentFields` substructure (`document_type` is required), and vice versa.
   */
  results: MemoryRetrieveResponse.Results;
}

export namespace MemoryRetrieveResponse {
  /**
   * The unified engram model: typed kind + per-kind substructure.
   *
   * `kind` is the canonical discriminator. The per-kind `conversation` and
   * `document` substructures hold typed fields known to the platform; `metadata` is
   * reserved for user-supplied annotations and must never carry platform-written
   * discriminators or routing markers.
   *
   * Construction enforces shape consistency via a model validator:
   * `kind=conversation` must not carry document fields, `kind=document` must carry a
   * `DocumentFields` substructure (`document_type` is required), and vice versa.
   */
  export interface Results {
    /**
     * The canonical engram discriminator.
     *
     * A single source of truth: every engram is either a `document` or a
     * `conversation`. The kind drives which typed substructure (`Engram.document` /
     * `Engram.conversation`) carries kind-specific fields. The free-form `metadata`
     * dict is reserved for user-supplied annotations and is never inspected for
     * routing.
     */
    kind: 'document' | 'conversation';

    owner_id: string;

    id?: string;

    chunks?: Array<unknown> | null;

    collection_ids?: Array<string>;

    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    conversation?: Results.Conversation | null;

    created_at?: string | null;

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    document?: Results.Document | null;

    /**
     * Status of graph creation per document.
     */
    extraction_status?: 'pending' | 'processing' | 'success' | 'failed';

    ingestion_attempt_number?: number | null;

    /**
     * Status of document processing.
     */
    ingestion_status?:
      | 'pending'
      | 'parsing'
      | 'extracting'
      | 'chunking'
      | 'embedding'
      | 'augmenting'
      | 'storing'
      | 'failed'
      | 'success';

    merkle_root?: string | null;

    metadata?: { [key: string]: unknown };

    search_ready_seq?: number | null;

    size_in_bytes?: number | null;

    text?: string | null;

    title?: string | null;

    total_tokens?: number | null;

    updated_at?: string | null;

    version?: string | null;

    workflow_run_id?: string | null;
  }

  export namespace Results {
    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    export interface Conversation {
      conversation_id?: string | null;

      episode_type?: string | null;
    }

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    export interface Document {
      /**
       * Types of file formats that can be stored as engrams.
       */
      document_type:
        | 'mp3'
        | 'csv'
        | 'eml'
        | 'msg'
        | 'p7s'
        | 'epub'
        | 'xls'
        | 'xlsx'
        | 'html'
        | 'htm'
        | 'bmp'
        | 'heic'
        | 'jpeg'
        | 'png'
        | 'tiff'
        | 'jpg'
        | 'svg'
        | 'md'
        | 'org'
        | 'odt'
        | 'pdf'
        | 'txt'
        | 'json'
        | 'ppt'
        | 'pptx'
        | 'rst'
        | 'rtf'
        | 'tsv'
        | 'gif'
        | 'doc'
        | 'docx'
        | 'py'
        | 'js'
        | 'ts'
        | 'css';

      original_extension?: string | null;
    }
  }
}

export interface MemoryUpdateResponse {
  /**
   * The unified engram model: typed kind + per-kind substructure.
   *
   * `kind` is the canonical discriminator. The per-kind `conversation` and
   * `document` substructures hold typed fields known to the platform; `metadata` is
   * reserved for user-supplied annotations and must never carry platform-written
   * discriminators or routing markers.
   *
   * Construction enforces shape consistency via a model validator:
   * `kind=conversation` must not carry document fields, `kind=document` must carry a
   * `DocumentFields` substructure (`document_type` is required), and vice versa.
   */
  results: MemoryUpdateResponse.Results;
}

export namespace MemoryUpdateResponse {
  /**
   * The unified engram model: typed kind + per-kind substructure.
   *
   * `kind` is the canonical discriminator. The per-kind `conversation` and
   * `document` substructures hold typed fields known to the platform; `metadata` is
   * reserved for user-supplied annotations and must never carry platform-written
   * discriminators or routing markers.
   *
   * Construction enforces shape consistency via a model validator:
   * `kind=conversation` must not carry document fields, `kind=document` must carry a
   * `DocumentFields` substructure (`document_type` is required), and vice versa.
   */
  export interface Results {
    /**
     * The canonical engram discriminator.
     *
     * A single source of truth: every engram is either a `document` or a
     * `conversation`. The kind drives which typed substructure (`Engram.document` /
     * `Engram.conversation`) carries kind-specific fields. The free-form `metadata`
     * dict is reserved for user-supplied annotations and is never inspected for
     * routing.
     */
    kind: 'document' | 'conversation';

    owner_id: string;

    id?: string;

    chunks?: Array<unknown> | null;

    collection_ids?: Array<string>;

    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    conversation?: Results.Conversation | null;

    created_at?: string | null;

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    document?: Results.Document | null;

    /**
     * Status of graph creation per document.
     */
    extraction_status?: 'pending' | 'processing' | 'success' | 'failed';

    ingestion_attempt_number?: number | null;

    /**
     * Status of document processing.
     */
    ingestion_status?:
      | 'pending'
      | 'parsing'
      | 'extracting'
      | 'chunking'
      | 'embedding'
      | 'augmenting'
      | 'storing'
      | 'failed'
      | 'success';

    merkle_root?: string | null;

    metadata?: { [key: string]: unknown };

    search_ready_seq?: number | null;

    size_in_bytes?: number | null;

    text?: string | null;

    title?: string | null;

    total_tokens?: number | null;

    updated_at?: string | null;

    version?: string | null;

    workflow_run_id?: string | null;
  }

  export namespace Results {
    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    export interface Conversation {
      conversation_id?: string | null;

      episode_type?: string | null;
    }

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    export interface Document {
      /**
       * Types of file formats that can be stored as engrams.
       */
      document_type:
        | 'mp3'
        | 'csv'
        | 'eml'
        | 'msg'
        | 'p7s'
        | 'epub'
        | 'xls'
        | 'xlsx'
        | 'html'
        | 'htm'
        | 'bmp'
        | 'heic'
        | 'jpeg'
        | 'png'
        | 'tiff'
        | 'jpg'
        | 'svg'
        | 'md'
        | 'org'
        | 'odt'
        | 'pdf'
        | 'txt'
        | 'json'
        | 'ppt'
        | 'pptx'
        | 'rst'
        | 'rtf'
        | 'tsv'
        | 'gif'
        | 'doc'
        | 'docx'
        | 'py'
        | 'js'
        | 'ts'
        | 'css';

      original_extension?: string | null;
    }
  }
}

/**
 * Paginated /v1/memories list response.
 *
 * Memories-specific subclass that adds `applied_wal_seq` without leaking the field
 * into every paginated engram-list endpoint's wire format. The plain alias
 * :class:`WrappedCollectionEngramsResponse` is the right shape for sibling
 * endpoints (e.g. /collections/{id}/ engrams) where the seq isn't surfaced.
 */
export interface MemoryListResponse {
  results: Array<MemoryListResponse.Result>;

  total_entries: number;

  /**
   * Highest WAL committed sequence number reflected in this response. Non-zero only
   * when the request was served via the WAL-tail fast path (collection-scoped
   * requests on shards with WAL-tail compaction enabled). Zero on the legacy overlay
   * path; clients should treat zero as 'the served path does not honor RYW
   * assertions on this shard.' Pair with `min_applied_wal_seq` on the request to
   * assert read-your-writes against a value returned by a prior memory-create call.
   */
  applied_wal_seq?: number;
}

export namespace MemoryListResponse {
  /**
   * The unified engram model: typed kind + per-kind substructure.
   *
   * `kind` is the canonical discriminator. The per-kind `conversation` and
   * `document` substructures hold typed fields known to the platform; `metadata` is
   * reserved for user-supplied annotations and must never carry platform-written
   * discriminators or routing markers.
   *
   * Construction enforces shape consistency via a model validator:
   * `kind=conversation` must not carry document fields, `kind=document` must carry a
   * `DocumentFields` substructure (`document_type` is required), and vice versa.
   */
  export interface Result {
    /**
     * The canonical engram discriminator.
     *
     * A single source of truth: every engram is either a `document` or a
     * `conversation`. The kind drives which typed substructure (`Engram.document` /
     * `Engram.conversation`) carries kind-specific fields. The free-form `metadata`
     * dict is reserved for user-supplied annotations and is never inspected for
     * routing.
     */
    kind: 'document' | 'conversation';

    owner_id: string;

    id?: string;

    chunks?: Array<unknown> | null;

    collection_ids?: Array<string>;

    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    conversation?: Result.Conversation | null;

    created_at?: string | null;

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    document?: Result.Document | null;

    /**
     * Status of graph creation per document.
     */
    extraction_status?: 'pending' | 'processing' | 'success' | 'failed';

    ingestion_attempt_number?: number | null;

    /**
     * Status of document processing.
     */
    ingestion_status?:
      | 'pending'
      | 'parsing'
      | 'extracting'
      | 'chunking'
      | 'embedding'
      | 'augmenting'
      | 'storing'
      | 'failed'
      | 'success';

    merkle_root?: string | null;

    metadata?: { [key: string]: unknown };

    search_ready_seq?: number | null;

    size_in_bytes?: number | null;

    text?: string | null;

    title?: string | null;

    total_tokens?: number | null;

    updated_at?: string | null;

    version?: string | null;

    workflow_run_id?: string | null;
  }

  export namespace Result {
    /**
     * Conversation-specific typed fields.
     *
     * Present iff `Engram.kind == CONVERSATION`. Holds the platform-written fields
     * that previously lived on `metadata` (`conversation_id`, `episode_type`) so they
     * have a typed home and are not co-mingled with user-supplied metadata.
     */
    export interface Conversation {
      conversation_id?: string | null;

      episode_type?: string | null;
    }

    /**
     * Document-specific typed fields.
     *
     * Present iff `Engram.kind == DOCUMENT`. `document_type` is required because every
     * document needs an extension/format classifier for parsing. `original_extension`
     * records the source filename's extension when it differs from the canonical
     * `document_type` (e.g. user uploaded `.JPG` normalized to `jpeg`).
     */
    export interface Document {
      /**
       * Types of file formats that can be stored as engrams.
       */
      document_type:
        | 'mp3'
        | 'csv'
        | 'eml'
        | 'msg'
        | 'p7s'
        | 'epub'
        | 'xls'
        | 'xlsx'
        | 'html'
        | 'htm'
        | 'bmp'
        | 'heic'
        | 'jpeg'
        | 'png'
        | 'tiff'
        | 'jpg'
        | 'svg'
        | 'md'
        | 'org'
        | 'odt'
        | 'pdf'
        | 'txt'
        | 'json'
        | 'ppt'
        | 'pptx'
        | 'rst'
        | 'rtf'
        | 'tsv'
        | 'gif'
        | 'doc'
        | 'docx'
        | 'py'
        | 'js'
        | 'ts'
        | 'css';

      original_extension?: string | null;
    }
  }
}

export interface MemoryDeleteResponse {
  results: MemoryDeleteResponse.Results;
}

export namespace MemoryDeleteResponse {
  export interface Results {
    success: boolean;
  }
}

export type MemoryAppendResponse =
  | MemoryAppendResponse.NebulaResultsAppendMemoryResponse
  | MemoryAppendResponse.NebulaResultsIngestionResponse;

export namespace MemoryAppendResponse {
  export interface NebulaResultsAppendMemoryResponse {
    results: NebulaResultsAppendMemoryResponse.Results;
  }

  export namespace NebulaResultsAppendMemoryResponse {
    export interface Results {
      id: string;

      message: Results.Message;

      appended_messages?: Array<Results.AppendedMessage>;

      metadata?: { [key: string]: unknown };
    }

    export namespace Results {
      export interface Message {
        role: 'system' | 'user' | 'assistant' | 'function' | 'tool' | (string & {});

        content?: unknown;

        function_call?: { [key: string]: unknown } | null;

        image_data?: { [key: string]: string } | null;

        image_url?: string | null;

        metadata?: { [key: string]: unknown } | null;

        name?: string | null;

        structured_content?: Array<{ [key: string]: unknown }> | null;

        tool_call_id?: string | null;

        tool_calls?: Array<{ [key: string]: unknown }> | null;
      }

      export interface AppendedMessage {
        message_id: string;

        chunk_ids?: Array<string>;
      }
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

export interface MemoryCreateUploadResponse {
  results: MemoryCreateUploadResponse.Results;
}

export namespace MemoryCreateUploadResponse {
  export interface Results {
    bucket: string;

    download_url: string;

    expires_in: number;

    max_size: number;

    s3_key: string;

    upload_headers: { [key: string]: string };

    upload_url: string;
  }
}

export type MemoryDeleteManyResponse =
  | MemoryDeleteManyResponse.NebulaResultsGenericBooleanResponse
  | MemoryDeleteManyResponse.BatchDeleteResponse;

export namespace MemoryDeleteManyResponse {
  export interface NebulaResultsGenericBooleanResponse {
    results: NebulaResultsGenericBooleanResponse.Results;
  }

  export namespace NebulaResultsGenericBooleanResponse {
    export interface Results {
      success: boolean;
    }
  }

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

export interface MemoryDeleteUploadResponse {
  results: MemoryDeleteUploadResponse.Results;
}

export namespace MemoryDeleteUploadResponse {
  export interface Results {
    message: string;

    id?: string | null;

    memory_id?: string | null;
  }
}

export type MemorySearchResponse =
  | MemorySearchResponse.NebulaResultsCompactMemoryRecallResponse
  | MemorySearchResponse.NebulaResultsMemoryRecall
  | MemorySearchResponse.NebulaResultsSnapshotSearchResult;

export namespace MemorySearchResponse {
  export interface NebulaResultsCompactMemoryRecallResponse {
    /**
     * Default compact response from /v1/memories/search.
     */
    results: NebulaResultsCompactMemoryRecallResponse.Results;
  }

  export namespace NebulaResultsCompactMemoryRecallResponse {
    /**
     * Default compact response from /v1/memories/search.
     */
    export interface Results {
      query: string;

      episodic?: Array<{ [key: string]: unknown }>;

      procedural?: Array<{ [key: string]: unknown }>;

      semantic?: Array<{ [key: string]: unknown }>;

      sources?: Array<{ [key: string]: unknown }>;

      token_count?: number;
    }
  }

  export interface NebulaResultsMemoryRecall {
    /**
     * Hierarchical memory response - all layers, weighted by activation.
     *
     * This is the primary response type for conceptual memory retrieval. It contains
     * all layers of the memory hierarchy:
     *
     * 1. **Entities (gestalt/schema layer)**: EntityProfiles that represent the
     *    conceptual understanding of activated entities.
     *
     * 2. **Semantics (semantic layer)**: Structured assertions (facts, inferences,
     *    tasks) scored by relevance and confidence.
     *
     * 3. **Episodes (temporal clusters)**: Episodic nodegroups that cluster temporally
     *    related facts and events.
     *
     * 4. **Sources (episodic layer)**: The raw source material that grounds the
     *    structured knowledge in actual moments/quotes.
     */
    results: NebulaResultsMemoryRecall.Results;
  }

  export namespace NebulaResultsMemoryRecall {
    /**
     * Hierarchical memory response - all layers, weighted by activation.
     *
     * This is the primary response type for conceptual memory retrieval. It contains
     * all layers of the memory hierarchy:
     *
     * 1. **Entities (gestalt/schema layer)**: EntityProfiles that represent the
     *    conceptual understanding of activated entities.
     *
     * 2. **Semantics (semantic layer)**: Structured assertions (facts, inferences,
     *    tasks) scored by relevance and confidence.
     *
     * 3. **Episodes (temporal clusters)**: Episodic nodegroups that cluster temporally
     *    related facts and events.
     *
     * 4. **Sources (episodic layer)**: The raw source material that grounds the
     *    structured knowledge in actual moments/quotes.
     */
    export interface Results {
      query: string;

      entities?: Array<Results.Entity>;

      episodic?: Array<Results.Episodic>;

      inference_hints?: Array<Results.InferenceHint>;

      procedural?: Array<Results.Procedural>;

      semantic?: Array<Results.Semantic>;

      sources?: Array<Results.Source>;

      total_traversal_time_ms?: number | null;

      workflows?: Array<Results.Workflow>;
    }

    export namespace Results {
      /**
       * An entity activated during memory traversal with its profile.
       *
       * Represents a conceptual node in memory that was activated by the query. Contains
       * the full EntityProfile (gestalt) filtered by relevance.
       */
      export interface Entity {
        id: string;

        name: string;

        activation_score?: number;

        category?: string | null;

        profile?: unknown;
      }

      /**
       * An episodic nodegroup activated during memory traversal.
       *
       * Represents a cluster of temporally related facts/events discovered during graph
       * traversal.
       */
      export interface Episodic {
        id: string;

        name: string;

        activation_score?: number;

        category?: string;

        description?: string | null;

        entity_names?: Array<string>;

        evidence_ids?: Array<string>;

        member_semantic_ids?: Array<string>;

        n_facts?: number;

        status?: string | null;

        t_last?: string | null;

        t_start?: string | null;
      }

      /**
       * A lightweight inference artifact returned alongside MemoryRecall.
       *
       * These are _not_ asserted facts. They are "evidence + weak hints" that may have
       * influenced retrieval (e.g. query expansion) or may be useful for UI
       * transparency.
       */
      export interface InferenceHint {
        object: string;

        predicate: string;

        term: string;

        confidence?: number | null;

        inference_metadata?: { [key: string]: unknown } | null;

        inferred?: boolean;

        ledger_p_stable?: number | null;

        ledger_p_true?: number | null;

        ledger_p_use?: number | null;

        metadata?: { [key: string]: unknown } | null;

        object_id?: string | null;

        relationship_id?: string | null;

        subject_id?: string | null;

        usable_for_rewrite?: boolean;

        used_for_rewrite?: boolean;
      }

      /**
       * A procedure-like memory activated during memory traversal.
       *
       * This includes preference procedures, atomic traces, and trace-derived
       * strategies. Distinct from facts which are descriptive assertions.
       */
      export interface Procedural {
        id: string;

        statement: string;

        activation_score?: number;

        belief_kind?: string | null;

        confidence?: number;

        derivation_type?: string;

        entity_id?: string | null;

        entity_name?: string | null;

        is_negated?: boolean;

        metadata?: { [key: string]: unknown } | null;
      }

      /**
       * A semantic item activated during memory traversal.
       *
       * Represents a structured assertion (fact, inference, or task) that was found
       * relevant to the query. Links back to its entity and source utterances for
       * provenance.
       */
      export interface Semantic {
        id: string;

        predicate: string;

        subject: string;

        value: string;

        activation_score?: number;

        belief_kind?: string | null;

        category?: string;

        corroboration_count?: number;

        description?: string | null;

        entity_id?: string | null;

        entity_name?: string | null;

        evidence_ids?: Array<string>;

        evidence_refs?: Array<Semantic.EvidenceRef>;

        extraction_confidence?: number;

        is_current?: boolean | null;

        reasoning?: string | null;

        resolved_at?: string | null;

        source_nodegroup_ids?: Array<string>;

        stability_confidence?: number | null;

        temporal_precision?: string | null;

        temporal_validity?: unknown;

        truth_confidence?: number | null;

        use_confidence?: number | null;
      }

      export namespace Semantic {
        /**
         * Tagged reference to a source of evidence.
         */
        export interface EvidenceRef {
          ref_type: 'chunk' | 'table_artifact';

          artifact_id?: string | null;

          chunk_id?: string | null;

          collection_id?: string | null;

          column_names?: Array<string> | null;

          row_indices?: Array<number> | null;

          table_name?: string | null;
        }
      }

      /**
       * A source that grounds facts in episodic memory.
       *
       * This is the raw source material that supports the structured knowledge. Provides
       * the exact quotes and context for verification.
       *
       * `evidence_ref` carries typed provenance so the client can distinguish
       * chunk-backed sources from table-artifact-backed sources (or future modalities)
       * without parsing opaque metadata.
       */
      export interface Source {
        id: string;

        text: string;

        activation_score?: number;

        display_name?: string | null;

        engram_id?: string | null;

        /**
         * Tagged reference to a source of evidence.
         */
        evidence_ref?: Source.EvidenceRef | null;

        metadata?: { [key: string]: unknown } | null;

        owner_id?: string | null;

        page_number?: number | null;

        section_path?: Array<string> | null;

        source_role?: string | null;

        speaker?: string | null;

        speaker_id?: string | null;

        structure_label?: string | null;

        supporting_fact_ids?: Array<string>;

        timestamp?: string | null;
      }

      export namespace Source {
        /**
         * Tagged reference to a source of evidence.
         */
        export interface EvidenceRef {
          ref_type: 'chunk' | 'table_artifact';

          artifact_id?: string | null;

          chunk_id?: string | null;

          collection_id?: string | null;

          column_names?: Array<string> | null;

          row_indices?: Array<number> | null;

          table_name?: string | null;
        }
      }

      /**
       * A workflow template activated during memory traversal.
       *
       * Workflows are the most structured form of procedure: ordered step sequences
       * derived from Stage 2B causal subgraphs, clustered by taxonomy-triple backbone
       * signature, and canonicalized via LLM-backed template induction. They answer
       * "walk me through how I do X" and "what comes after step Y" queries, as opposed
       * to ActivatedProcedure which answers "what are my preferences about X".
       */
      export interface Workflow {
        id: string;

        goal: string;

        name: string;

        activation_score?: number;

        active_instance_count?: number;

        backbone_signature_hash?: string | null;

        branches?: Array<{ [key: string]: unknown }>;

        confidence?: number;

        current_step_index?: number | null;

        instance_count?: number;

        last_observed_at?: string | null;

        metadata?: { [key: string]: unknown } | null;

        /**
         * A single canonical step inside an activated workflow template.
         *
         * Rich context fields (how_this_works, typical_entities, typical_tools,
         * causes_next_because) are populated by the template inducer and carry forward the
         * observational detail from the instances that built this template. They exist so
         * an agent can understand _how_ a step works, _what tools are used_, and _why_ it
         * causes the next step — not just _what_ the step is.
         */
        predicted_next_step?: Workflow.PredictedNextStep | null;

        steps?: Array<Workflow.Step>;

        taxonomy_version?: number;

        variable_slots?: { [key: string]: unknown };
      }

      export namespace Workflow {
        /**
         * A single canonical step inside an activated workflow template.
         *
         * Rich context fields (how_this_works, typical_entities, typical_tools,
         * causes_next_because) are populated by the template inducer and carry forward the
         * observational detail from the instances that built this template. They exist so
         * an agent can understand _how_ a step works, _what tools are used_, and _why_ it
         * causes the next step — not just _what_ the step is.
         */
        export interface PredictedNextStep {
          canonical_description: string;

          goal_category: string;

          index: number;

          object_type: string;

          verb_class: string;

          causes_next_because?: string | null;

          entity_roles?: Array<string>;

          how_this_works?: string | null;

          optional?: boolean;

          typical_entities?: Array<string>;

          typical_tools?: Array<string>;

          variable_slots?: Array<string>;
        }

        /**
         * A single canonical step inside an activated workflow template.
         *
         * Rich context fields (how_this_works, typical_entities, typical_tools,
         * causes_next_because) are populated by the template inducer and carry forward the
         * observational detail from the instances that built this template. They exist so
         * an agent can understand _how_ a step works, _what tools are used_, and _why_ it
         * causes the next step — not just _what_ the step is.
         */
        export interface Step {
          canonical_description: string;

          goal_category: string;

          index: number;

          object_type: string;

          verb_class: string;

          causes_next_because?: string | null;

          entity_roles?: Array<string>;

          how_this_works?: string | null;

          optional?: boolean;

          typical_entities?: Array<string>;

          typical_tools?: Array<string>;

          variable_slots?: Array<string>;
        }
      }
    }
  }

  export interface NebulaResultsSnapshotSearchResult {
    /**
     * Stateless snapshot-search response shape.
     */
    results: NebulaResultsSnapshotSearchResult.Results;
  }

  export namespace NebulaResultsSnapshotSearchResult {
    /**
     * Stateless snapshot-search response shape.
     */
    export interface Results {
      entities?: Array<Results.Entity>;

      relationships?: Array<Results.Relationship>;
    }

    export namespace Results {
      export interface Entity {
        id: string;

        name: string;

        score: number;

        category?: string | null;

        description?: string | null;
      }

      export interface Relationship {
        id: string;

        object_id: string;

        predicate: string;

        subject_id: string;

        description?: string | null;

        weight?: number | null;
      }
    }
  }
}

export interface MemoryCreateParams {
  /**
   * Pre-chunked text for document kind
   */
  chunks?: Array<string> | null;

  /**
   * Collection UUID (mutually exclusive with snapshot)
   */
  collection_id?: string | null;

  /**
   * Multimodal content parts (text, images, audio, documents) for document kind.
   */
  content_parts?: Array<
    | MemoryCreateParams.TextContentRequest
    | MemoryCreateParams.FileContentRequest
    | MemoryCreateParams.S3FileReferenceRequest
  > | null;

  /**
   * Batch content strings for snapshot mode
   */
  contents?: Array<string> | null;

  /**
   * Public ingestion config accepted by memory-ingestion endpoints.
   *
   * This mirrors the supported request payload shape while staying independent from
   * the runtime provider config, which also carries internal-only fields such as
   * `app` and `extra_fields`.
   */
  ingestion_config?: MemoryCreateParams.IngestionConfig | null;

  /**
   * Ingestion mode for documents
   */
  ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom' | null;

  /**
   * Engram discriminator: `document` or `conversation`. When omitted, `conversation`
   * is inferred if `messages` is present; otherwise defaults to `document`.
   */
  kind?: 'document' | 'conversation';

  /**
   * Messages for conversation kind
   */
  messages?: Array<MemoryCreateParams.Message> | null;

  /**
   * User-supplied metadata for the memory. Must not carry platform discriminators or
   * routing markers — use the `kind` / `conversation` / `document` fields instead.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Optional name for the memory
   */
  name?: string | null;

  /**
   * Raw text content for document kind
   */
  raw_text?: string | null;

  /**
   * Portable full snapshot owned by the client.
   */
  snapshot?: MemoryCreateParams.Snapshot | null;

  /**
   * UUID of the SourceRole entity creating this memory
   */
  speaker_id?: string | null;

  /**
   * Display name of the speaker/agent creating this memory
   */
  speaker_name?: string | null;
}

export namespace MemoryCreateParams {
  /**
   * Text content block.
   */
  export interface TextContentRequest {
    /**
     * Text content
     */
    text: string;

    type?: 'text';
  }

  /**
   * Unified file content for multimodal messages.
   */
  export interface FileContentRequest {
    /**
     * Base64 encoded file data
     */
    data: string;

    /**
     * Duration in seconds (for audio)
     */
    duration_seconds?: number | null;

    /**
     * Original filename
     */
    filename?: string | null;

    /**
     * MIME type
     */
    media_type?: string;

    /**
     * Content kind: file, image, audio, or document.
     */
    type?: 'file' | 'image' | 'audio' | 'document';
  }

  /**
   * Reference to a file uploaded to S3 (for large files).
   */
  export interface S3FileReferenceRequest {
    /**
     * S3 object key
     */
    s3_key: string;

    /**
     * S3 bucket (uses default if not specified)
     */
    bucket?: string | null;

    /**
     * Original filename
     */
    filename?: string | null;

    /**
     * MIME type
     */
    media_type?: string;

    /**
     * File size in bytes
     */
    size_bytes?: number | null;

    type?: 's3_ref';
  }

  /**
   * Public ingestion config accepted by memory-ingestion endpoints.
   *
   * This mirrors the supported request payload shape while staying independent from
   * the runtime provider config, which also carries internal-only fields such as
   * `app` and `extra_fields`.
   */
  export interface IngestionConfig {
    audio_transcription_model?: string | null;

    automatic_extraction?: boolean;

    /**
     * Settings for chunk enrichment.
     *
     * Model selection for the enrichment LLM call lives in
     * `app.task_llms.chunk_enrichment`; the legacy `generation_config` field was
     * removed in the per-task LLM cleanup pass.
     */
    chunk_enrichment_settings?: IngestionConfig.ChunkEnrichmentSettings;

    chunk_overlap?: number;

    chunk_size?: number;

    chunking_strategy?: string;

    excluded_parsers?: Array<string>;

    extra_parsers?: { [key: string]: unknown };

    max_concurrent_vlm_tasks?: number;

    parser_overrides?: { [key: string]: string };

    provider?: string;

    vlm?: string | null;

    vlm_batch_size?: number;

    vlm_max_tokens_to_sample?: number;

    vlm_ocr_one_page_per_chunk?: boolean;
  }

  export namespace IngestionConfig {
    /**
     * Settings for chunk enrichment.
     *
     * Model selection for the enrichment LLM call lives in
     * `app.task_llms.chunk_enrichment`; the legacy `generation_config` field was
     * removed in the per-task LLM cleanup pass.
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
       * The number of preceding and succeeding chunks to include. Defaults to 2.
       */
      n_chunks?: number;
    }
  }

  /**
   * A message in a conversation with multimodal support.
   */
  export interface Message {
    /**
     * Message content. Use a string for text-only messages or a list of content parts
     * for multimodal content.
     */
    content:
      | string
      | Array<Message.TextContentRequest | Message.FileContentRequest | Message.S3FileReferenceRequest>;

    /**
     * Role: 'user', 'assistant', or 'system'
     */
    role: 'user' | 'assistant' | 'system';

    /**
     * Optional authority score
     */
    authority?: number | null;

    /**
     * Optional message-level metadata
     */
    metadata?: { [key: string]: unknown } | null;

    /**
     * Semantic timestamp for when the message was authored. Drives chunk timestamps,
     * the extraction LLM's temporal anchor, and episodic grouping. Without it,
     * relative phrases ('this morning') resolve against ingestion wall-clock and
     * episodes collapse.
     */
    timestamp?: string | null;
  }

  export namespace Message {
    /**
     * Text content block.
     */
    export interface TextContentRequest {
      /**
       * Text content
       */
      text: string;

      type?: 'text';
    }

    /**
     * Unified file content for multimodal messages.
     */
    export interface FileContentRequest {
      /**
       * Base64 encoded file data
       */
      data: string;

      /**
       * Duration in seconds (for audio)
       */
      duration_seconds?: number | null;

      /**
       * Original filename
       */
      filename?: string | null;

      /**
       * MIME type
       */
      media_type?: string;

      /**
       * Content kind: file, image, audio, or document.
       */
      type?: 'file' | 'image' | 'audio' | 'document';
    }

    /**
     * Reference to a file uploaded to S3 (for large files).
     */
    export interface S3FileReferenceRequest {
      /**
       * S3 object key
       */
      s3_key: string;

      /**
       * S3 bucket (uses default if not specified)
       */
      bucket?: string | null;

      /**
       * Original filename
       */
      filename?: string | null;

      /**
       * MIME type
       */
      media_type?: string;

      /**
       * File size in bytes
       */
      size_bytes?: number | null;

      type?: 's3_ref';
    }
  }

  /**
   * Portable full snapshot owned by the client.
   */
  export interface Snapshot {
    collection_id: string;

    root_hash: string;

    created_at?: string;

    format_version?: number;

    generation?: number;

    /**
     * A complete graph payload or a context subgraph payload.
     */
    graph?: Snapshot.Graph;
  }

  export namespace Snapshot {
    /**
     * A complete graph payload or a context subgraph payload.
     */
    export interface Graph {
      entities?: Array<Graph.Entity>;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      entity_description_embeddings?: Graph.EntityDescriptionEmbeddings;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      relationship_description_embeddings?: Graph.RelationshipDescriptionEmbeddings;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      relationship_relation_embeddings?: Graph.RelationshipRelationEmbeddings;

      relationships?: Array<Graph.Relationship>;
    }

    export namespace Graph {
      /**
       * Canonical entity record used in snapshots, WAL ops, and segments.
       */
      export interface Entity {
        id: string;

        created_at: string;

        engram_id: string;

        name: string;

        updated_at: string;

        category?: string | null;

        chunk_ids?: Array<string>;

        collection_id?: string;

        description?: string | null;

        fts_terms?: { [key: string]: number } | null;

        metadata?: { [key: string]: unknown };

        relationship_count?: number;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface EntityDescriptionEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface RelationshipDescriptionEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface RelationshipRelationEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * Canonical relationship record used in snapshots, WAL ops, and segments.
       */
      export interface Relationship {
        id: string;

        created_at: string;

        object_id: string;

        subject_id: string;

        updated_at: string;

        category?: string | null;

        chunk_ids?: Array<string>;

        collection_id?: string;

        description?: string | null;

        engram_id?: string | null;

        inference_metadata?: { [key: string]: unknown } | null;

        metadata?: { [key: string]: unknown };

        object?: string | null;

        predicate?: string;

        relationship_type?: string | null;

        subject?: string | null;

        temporal_precision?: string | null;

        valid_span?: { [key: string]: unknown } | null;

        weight?: number | null;
      }
    }
  }
}

export interface MemoryUpdateParams {
  /**
   * Query param: Collection context for copy-on-write. If provided and engram is
   * shared, creates a copy before modification.
   */
  collection_id?: string | null;

  /**
   * Body param: New collection associations
   */
  collection_ids?: Array<string> | null;

  /**
   * Body param: Merge with existing metadata
   */
  merge_metadata?: boolean;

  /**
   * Body param: Metadata to update
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Body param: New name for the memory
   */
  name?: string | null;
}

export interface MemoryListParams {
  /**
   * Maximum chunks to inline per engram. Defaults to all chunks for backwards
   * compatibility; pass 0 to skip chunk hydration.
   */
  chunks_limit?: number | null;

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
   * Specifies a limit on the number of objects to return, ranging between 1
   * and 1000. Defaults to 100.
   */
  limit?: number;

  /**
   * JSON string for metadata filtering. Example: '{"metadata.source": {"$eq":
   * "playground"}}'
   */
  metadata_filters?: string | null;

  /**
   * Read-your-writes assertion: the WAL-tail overlay path waits for at least this
   * seq to be applied before serving (or returns 503 Unavailable on timeout).
   * REQUIRES exactly one collection_ids entry — without a collection scope the
   * request returns 422 (the per-WAL-shard scalar applied_wal_seq is meaningless
   * across collections). When the served shard has not been migrated to
   * wal_compaction_enabled, the field is accepted but the served path is the legacy
   * overlay (the assertion has no effect — the response's applied_wal_seq will be
   * 0). Pass back the value the matching upload response surfaced.
   */
  min_applied_wal_seq?: number | null;

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
   * Pre-processed text chunks to append for document memories.
   */
  chunks?: Array<string> | null;

  /**
   * Public ingestion config accepted by memory-ingestion endpoints.
   *
   * This mirrors the supported request payload shape while staying independent from
   * the runtime provider config, which also carries internal-only fields such as
   * `app` and `extra_fields`.
   */
  ingestion_config?: MemoryAppendParams.IngestionConfig | null;

  /**
   * Ingestion mode for document content.
   */
  ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom';

  /**
   * Messages to append for conversation memories. Each message has content, role,
   * and optional metadata.
   */
  messages?: Array<MemoryAppendParams.Message> | null;

  /**
   * Additional metadata for the appended content.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Raw text content to append for document memories.
   */
  raw_text?: string | null;
}

export namespace MemoryAppendParams {
  /**
   * Public ingestion config accepted by memory-ingestion endpoints.
   *
   * This mirrors the supported request payload shape while staying independent from
   * the runtime provider config, which also carries internal-only fields such as
   * `app` and `extra_fields`.
   */
  export interface IngestionConfig {
    audio_transcription_model?: string | null;

    automatic_extraction?: boolean;

    /**
     * Settings for chunk enrichment.
     *
     * Model selection for the enrichment LLM call lives in
     * `app.task_llms.chunk_enrichment`; the legacy `generation_config` field was
     * removed in the per-task LLM cleanup pass.
     */
    chunk_enrichment_settings?: IngestionConfig.ChunkEnrichmentSettings;

    chunk_overlap?: number;

    chunk_size?: number;

    chunking_strategy?: string;

    excluded_parsers?: Array<string>;

    extra_parsers?: { [key: string]: unknown };

    max_concurrent_vlm_tasks?: number;

    parser_overrides?: { [key: string]: string };

    provider?: string;

    vlm?: string | null;

    vlm_batch_size?: number;

    vlm_max_tokens_to_sample?: number;

    vlm_ocr_one_page_per_chunk?: boolean;
  }

  export namespace IngestionConfig {
    /**
     * Settings for chunk enrichment.
     *
     * Model selection for the enrichment LLM call lives in
     * `app.task_llms.chunk_enrichment`; the legacy `generation_config` field was
     * removed in the per-task LLM cleanup pass.
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
       * The number of preceding and succeeding chunks to include. Defaults to 2.
       */
      n_chunks?: number;
    }
  }

  export interface Message {
    /**
     * Message content. Use a string for text-only messages or a list of content parts
     * for multimodal content.
     */
    content:
      | string
      | Array<Message.TextContentRequest | Message.FileContentRequest | Message.S3FileReferenceRequest>;

    /**
     * Role: 'user', 'assistant', or 'system'
     */
    role: 'user' | 'assistant' | 'system';

    /**
     * Optional authority score
     */
    authority?: number | null;

    /**
     * Optional message-level metadata
     */
    metadata?: { [key: string]: unknown } | null;

    /**
     * Optional parent message ID
     */
    parent_id?: string | null;

    /**
     * Optional SourceRole entity ID
     */
    source_role_id?: string | null;

    /**
     * Semantic timestamp for when the message was authored. Drives chunk timestamps,
     * the extraction LLM's temporal anchor, and episodic grouping. Without it,
     * relative phrases ('this morning') resolve against ingestion wall-clock and
     * episodes collapse.
     */
    timestamp?: string | null;
  }

  export namespace Message {
    /**
     * Text content block.
     */
    export interface TextContentRequest {
      /**
       * Text content
       */
      text: string;

      type?: 'text';
    }

    /**
     * Unified file content for multimodal messages.
     */
    export interface FileContentRequest {
      /**
       * Base64 encoded file data
       */
      data: string;

      /**
       * Duration in seconds (for audio)
       */
      duration_seconds?: number | null;

      /**
       * Original filename
       */
      filename?: string | null;

      /**
       * MIME type
       */
      media_type?: string;

      /**
       * Content kind: file, image, audio, or document.
       */
      type?: 'file' | 'image' | 'audio' | 'document';
    }

    /**
     * Reference to a file uploaded to S3 (for large files).
     */
    export interface S3FileReferenceRequest {
      /**
       * S3 object key
       */
      s3_key: string;

      /**
       * S3 bucket (uses default if not specified)
       */
      bucket?: string | null;

      /**
       * Original filename
       */
      filename?: string | null;

      /**
       * MIME type
       */
      media_type?: string;

      /**
       * File size in bytes
       */
      size_bytes?: number | null;

      type?: 's3_ref';
    }
  }
}

export interface MemoryCreateUploadParams {
  /**
   * MIME type (e.g., 'image/jpeg', 'application/pdf')
   */
  content_type: string;

  /**
   * Expected file size in bytes (max 100MB)
   */
  file_size: number;

  /**
   * Original filename (e.g., 'image.jpg')
   */
  filename: string;
}

export type MemoryDeleteManyParams = MemoryDeleteManyParams.Variant0 | MemoryDeleteManyParams.Variant1;

export declare namespace MemoryDeleteManyParams {
  export interface Variant0 {
    body: string;
  }

  export interface Variant1 {
    body: Array<string>;
  }
}

export interface MemoryDeleteUploadParams {
  /**
   * S3 key of the file to delete (returned by POST /memories/upload)
   */
  s3_key: string;
}

export interface MemorySearchParams {
  /**
   * Optional list of collection UUIDs or names to scope the search.
   */
  collection_ids?: Array<string> | null;

  /**
   * Compute effort budget for memory search.
   *
   * Effort controls traversal compute (exploration budgets, depth, fanout), not the
   * size of the returned MemoryRecall projection.
   */
  effort?: 'auto' | 'low' | 'medium' | 'high' | null;

  /**
   * Optional filters to apply to the search.
   */
  filters?: { [key: string]: unknown } | null;

  /**
   * Pre-written NQL script. Executes directly without planner compilation. Mutually
   * exclusive with `query`.
   */
  nql?: string | null;

  /**
   * Natural-language search query. Mutually exclusive with `nql`.
   */
  query?: string | null;

  /**
   * Advanced search settings for fine-tuning search behavior.
   *
   * Note: Core parameters (query, collection_ids, filters) are now top-level API
   * parameters. This class contains advanced tuning options plus internal fields
   * used by the retrieval service.
   *
   * Memory search uses `effort` (auto/low/medium/high) to control compute.
   */
  search_settings?: MemorySearchParams.SearchSettings | null;

  /**
   * Portable full snapshot owned by the client.
   */
  snapshot?: MemorySearchParams.Snapshot | null;
}

export namespace MemorySearchParams {
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

  /**
   * Portable full snapshot owned by the client.
   */
  export interface Snapshot {
    collection_id: string;

    root_hash: string;

    created_at?: string;

    format_version?: number;

    generation?: number;

    /**
     * A complete graph payload or a context subgraph payload.
     */
    graph?: Snapshot.Graph;
  }

  export namespace Snapshot {
    /**
     * A complete graph payload or a context subgraph payload.
     */
    export interface Graph {
      entities?: Array<Graph.Entity>;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      entity_description_embeddings?: Graph.EntityDescriptionEmbeddings;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      relationship_description_embeddings?: Graph.RelationshipDescriptionEmbeddings;

      /**
       * A positionally-aligned masked embedding matrix.
       */
      relationship_relation_embeddings?: Graph.RelationshipRelationEmbeddings;

      relationships?: Array<Graph.Relationship>;
    }

    export namespace Graph {
      /**
       * Canonical entity record used in snapshots, WAL ops, and segments.
       */
      export interface Entity {
        id: string;

        created_at: string;

        engram_id: string;

        name: string;

        updated_at: string;

        category?: string | null;

        chunk_ids?: Array<string>;

        collection_id?: string;

        description?: string | null;

        fts_terms?: { [key: string]: number } | null;

        metadata?: { [key: string]: unknown };

        relationship_count?: number;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface EntityDescriptionEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface RelationshipDescriptionEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * A positionally-aligned masked embedding matrix.
       */
      export interface RelationshipRelationEmbeddings {
        dim?: number;

        encoding?: 'npy-base64';

        mask_b64?: string;

        values_b64?: string;
      }

      /**
       * Canonical relationship record used in snapshots, WAL ops, and segments.
       */
      export interface Relationship {
        id: string;

        created_at: string;

        object_id: string;

        subject_id: string;

        updated_at: string;

        category?: string | null;

        chunk_ids?: Array<string>;

        collection_id?: string;

        description?: string | null;

        engram_id?: string | null;

        inference_metadata?: { [key: string]: unknown } | null;

        metadata?: { [key: string]: unknown };

        object?: string | null;

        predicate?: string;

        relationship_type?: string | null;

        subject?: string | null;

        temporal_precision?: string | null;

        valid_span?: { [key: string]: unknown } | null;

        weight?: number | null;
      }
    }
  }
}

export declare namespace Memories {
  export {
    type MemoryCreateResponse as MemoryCreateResponse,
    type MemoryRetrieveResponse as MemoryRetrieveResponse,
    type MemoryUpdateResponse as MemoryUpdateResponse,
    type MemoryListResponse as MemoryListResponse,
    type MemoryDeleteResponse as MemoryDeleteResponse,
    type MemoryAppendResponse as MemoryAppendResponse,
    type MemoryCreateUploadResponse as MemoryCreateUploadResponse,
    type MemoryDeleteManyResponse as MemoryDeleteManyResponse,
    type MemoryDeleteUploadResponse as MemoryDeleteUploadResponse,
    type MemorySearchResponse as MemorySearchResponse,
    type MemoryCreateParams as MemoryCreateParams,
    type MemoryUpdateParams as MemoryUpdateParams,
    type MemoryListParams as MemoryListParams,
    type MemoryAppendParams as MemoryAppendParams,
    type MemoryCreateUploadParams as MemoryCreateUploadParams,
    type MemoryDeleteManyParams as MemoryDeleteManyParams,
    type MemoryDeleteUploadParams as MemoryDeleteUploadParams,
    type MemorySearchParams as MemorySearchParams,
  };
}
