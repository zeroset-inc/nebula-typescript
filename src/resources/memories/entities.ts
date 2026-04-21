// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EntitiesAPI from '../graphs/entities';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entities extends APIResource {
  /**
   * Retrieves the entities that were extracted from an engram. These represent
   * important semantic elements like people, places, organizations, concepts, etc.
   *
   * Users can only access entities from engrams they own or have access to through
   * collections. Entity embeddings are only included if specifically requested.
   *
   * Results are returned in the order they were extracted from the engram.
   *
   * @example
   * ```ts
   * const paginatedNebulaResultEntity =
   *   await client.memories.entities.list(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  list(
    id: string,
    query: EntityListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultEntity> {
    return this._client.get(path`/v1/memories/${id}/entities`, { query, ...options });
  }

  /**
   * Export engrams as a downloadable CSV file.
   *
   * @example
   * ```ts
   * const response = await client.memories.entities.export(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  export(
    id: string,
    body: EntityExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/v1/memories/${id}/entities/export`, { body, ...options });
  }
}

export interface PaginatedNebulaResultEntity {
  results: Array<EntitiesAPI.Entity>;

  total_entries: number;
}

export type EntityExportResponse = unknown;

export interface EntityListParams {
  /**
   * Whether to include vector embeddings in the response.
   */
  include_embeddings?: boolean | null;

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

export interface EntityExportParams {
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

export declare namespace Entities {
  export {
    type PaginatedNebulaResultEntity as PaginatedNebulaResultEntity,
    type EntityExportResponse as EntityExportResponse,
    type EntityListParams as EntityListParams,
    type EntityExportParams as EntityExportParams,
  };
}
