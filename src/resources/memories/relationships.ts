// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RelationshipsAPI from '../graphs/relationships';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Relationships extends APIResource {
  /**
   * Retrieves the relationships between entities that were extracted from an engram.
   * These represent connections and interactions between entities found in the text.
   *
   * Users can only access relationships from engrams they own or have access to
   * through collections. Results can be filtered by entity names and relationship
   * types.
   *
   * Results are returned in the order they were extracted from the engram.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultRelationship =
   *   await client.memories.relationships.list(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  list(
    id: string,
    query: RelationshipListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultRelationship> {
    return this._client.get(path`/v1/memories/${id}/relationships`, { query, ...options });
  }

  /**
   * Export engrams as a downloadable CSV file.
   *
   * @example
   * ```ts
   * const response = await client.memories.relationships.export(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  export(
    id: string,
    body: RelationshipExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/v1/memories/${id}/relationships/export`, { body, ...options });
  }
}

export interface PaginatedNebulaResultRelationship {
  results: Array<RelationshipsAPI.Relationship>;

  total_entries: number;
}

export type RelationshipExportResponse = unknown;

export interface RelationshipListParams {
  /**
   * Filter relationships by specific entity names.
   */
  entity_names?: Array<string> | null;

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
   * Filter relationships by specific relationship types.
   */
  relationship_types?: Array<string> | null;
}

export interface RelationshipExportParams {
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

export declare namespace Relationships {
  export {
    type PaginatedNebulaResultRelationship as PaginatedNebulaResultRelationship,
    type RelationshipExportResponse as RelationshipExportResponse,
    type RelationshipListParams as RelationshipListParams,
    type RelationshipExportParams as RelationshipExportParams,
  };
}
