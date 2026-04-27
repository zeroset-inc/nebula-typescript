// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Snapshots extends APIResource {
  /**
   * Export a collection's full graph state as a portable SnapshotEnvelope.
   */
  export(body: SnapshotExportParams, options?: RequestOptions): APIPromise<SnapshotExportResponse> {
    return this._client.post('/v1/device-memory/snapshot/export', { body, ...options });
  }

  /**
   * Import a SnapshotEnvelope into an ephemeral collection. Returns the ephemeral
   * collection UUID.
   */
  import(body: SnapshotImportParams, options?: RequestOptions): APIPromise<SnapshotImportResponse> {
    return this._client.post('/v1/device-memory/snapshot/import', { body, ...options });
  }
}

export interface SnapshotExportResponse {
  /**
   * Portable full snapshot owned by the client.
   */
  results: SnapshotExportResponse.Results;
}

export namespace SnapshotExportResponse {
  /**
   * Portable full snapshot owned by the client.
   */
  export interface Results {
    collection_id: string;

    root_hash: string;

    created_at?: string;

    format_version?: number;

    generation?: number;

    /**
     * A complete graph payload or a context subgraph payload.
     */
    graph?: Results.Graph;
  }

  export namespace Results {
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

export interface SnapshotImportResponse {
  /**
   * Ephemeral collection handle returned after importing a snapshot.
   */
  results: SnapshotImportResponse.Results;
}

export namespace SnapshotImportResponse {
  /**
   * Ephemeral collection handle returned after importing a snapshot.
   */
  export interface Results {
    ephemeral_collection_id: string;
  }
}

export interface SnapshotExportParams {
  collection_id: string;
}

export interface SnapshotImportParams {
  /**
   * Portable full snapshot owned by the client.
   */
  snapshot: SnapshotImportParams.Snapshot;
}

export namespace SnapshotImportParams {
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

export declare namespace Snapshots {
  export {
    type SnapshotExportResponse as SnapshotExportResponse,
    type SnapshotImportResponse as SnapshotImportResponse,
    type SnapshotExportParams as SnapshotExportParams,
    type SnapshotImportParams as SnapshotImportParams,
  };
}
