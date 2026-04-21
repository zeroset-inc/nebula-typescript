// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as MemoriesEntitiesAPI from '../memories/entities';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entities extends APIResource {
  /**
   * Creates a new entity in the graph.
   */
  create(
    collectionID: string,
    body: EntityCreateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsEntity> {
    return this._client.post(path`/v1/graphs/${collectionID}/entities`, { body, ...options });
  }

  /**
   * Retrieves a specific entity by its ID.
   */
  retrieve(
    entityID: string,
    params: EntityRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsEntity> {
    const { collection_id } = params;
    return this._client.get(path`/v1/graphs/${collection_id}/entities/${entityID}`, options);
  }

  /**
   * Updates an existing entity in the graph.
   */
  update(
    entityID: string,
    params: EntityUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsEntity> {
    const { collection_id, ...body } = params;
    return this._client.post(path`/v1/graphs/${collection_id}/entities/${entityID}`, { body, ...options });
  }

  /**
   * Lists all entities in the graph with pagination support.
   */
  list(
    collectionID: string,
    query: EntityListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoriesEntitiesAPI.PaginatedNebulaResultEntity> {
    return this._client.get(path`/v1/graphs/${collectionID}/entities`, { query, ...options });
  }

  /**
   * Removes an entity from the graph.
   */
  delete(
    entityID: string,
    params: EntityDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { collection_id } = params;
    return this._client.delete(path`/v1/graphs/${collection_id}/entities/${entityID}`, options);
  }

  /**
   * Export engrams as a downloadable CSV file.
   */
  export(
    collectionID: string,
    body: EntityExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/v1/graphs/${collectionID}/entities/export`, { body, ...options });
  }
}

/**
 * An entity extracted from a engram.
 */
export interface Entity {
  name: string;

  id?: string | null;

  category?: string | null;

  chunk_ids?: Array<string> | null;

  collection_id?: string | null;

  description?: string | null;

  description_embedding?: Array<number> | null;

  engram_id?: string | null;

  metadata?: { [key: string]: unknown } | null;
}

export interface NebulaResultsEntity {
  /**
   * An entity extracted from a engram.
   */
  results: Entity;
}

export type EntityExportResponse = unknown;

export interface EntityCreateParams {
  /**
   * The description of the entity to create.
   */
  description: string;

  /**
   * The name of the entity to create.
   */
  name: string;

  /**
   * The category of the entity to create.
   */
  category?: string | null;

  /**
   * The metadata of the entity to create.
   */
  metadata?: { [key: string]: unknown } | null;
}

export interface EntityRetrieveParams {
  /**
   * The collection ID corresponding to the graph containing the entity.
   */
  collection_id: string;
}

export interface EntityUpdateParams {
  /**
   * Path param: The collection ID corresponding to the graph containing the entity.
   */
  collection_id: string;

  /**
   * Body param: The updated name of the entity.
   */
  name: string | null;

  /**
   * Body param: The updated category of the entity.
   */
  category?: string | null;

  /**
   * Body param: The updated description of the entity.
   */
  description?: string | null;

  /**
   * Body param: The updated metadata of the entity.
   */
  metadata?: { [key: string]: unknown } | null;
}

export interface EntityListParams {
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

export interface EntityDeleteParams {
  /**
   * The collection ID corresponding to the graph to remove the entity from.
   */
  collection_id: string;
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
    type Entity as Entity,
    type NebulaResultsEntity as NebulaResultsEntity,
    type EntityExportResponse as EntityExportResponse,
    type EntityCreateParams as EntityCreateParams,
    type EntityRetrieveParams as EntityRetrieveParams,
    type EntityUpdateParams as EntityUpdateParams,
    type EntityListParams as EntityListParams,
    type EntityDeleteParams as EntityDeleteParams,
    type EntityExportParams as EntityExportParams,
  };
}
