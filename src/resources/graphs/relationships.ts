// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as MemoriesRelationshipsAPI from '../memories/relationships';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Relationships extends APIResource {
  /**
   * Creates a new relationship in the graph.
   */
  create(
    collectionID: string,
    body: RelationshipCreateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsRelationship> {
    return this._client.post(path`/v1/graphs/${collectionID}/relationships`, { body, ...options });
  }

  /**
   * Retrieves a specific relationship by its ID.
   */
  retrieve(
    relationshipID: string,
    params: RelationshipRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsRelationship> {
    const { collection_id } = params;
    return this._client.get(path`/v1/graphs/${collection_id}/relationships/${relationshipID}`, options);
  }

  /**
   * Updates an existing relationship in the graph.
   */
  update(
    relationshipID: string,
    params: RelationshipUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsRelationship> {
    const { collection_id, ...body } = params;
    return this._client.post(path`/v1/graphs/${collection_id}/relationships/${relationshipID}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all relationships in the graph with pagination support.
   */
  list(
    collectionID: string,
    query: RelationshipListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MemoriesRelationshipsAPI.PaginatedNebulaResultRelationship> {
    return this._client.get(path`/v1/graphs/${collectionID}/relationships`, { query, ...options });
  }

  /**
   * Removes a relationship from the graph.
   */
  delete(
    relationshipID: string,
    params: RelationshipDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { collection_id } = params;
    return this._client.delete(path`/v1/graphs/${collection_id}/relationships/${relationshipID}`, options);
  }

  /**
   * Export engrams as a downloadable CSV file.
   */
  export(
    collectionID: string,
    body: RelationshipExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/v1/graphs/${collectionID}/relationships/export`, { body, ...options });
  }
}

export interface NebulaResultsRelationship {
  /**
   * A relationship between two entities.
   *
   * This is a generic relationship, and can be used to represent any type of
   * relationship between any two entities.
   */
  results: Relationship;
}

/**
 * A relationship between two entities.
 *
 * This is a generic relationship, and can be used to represent any type of
 * relationship between any two entities.
 */
export interface Relationship {
  object: string;

  predicate: string;

  subject: string;

  id?: string | null;

  attributes?: { [key: string]: unknown } | null;

  category?: string | null;

  chunk_ids?: Array<string> | null;

  collection_id?: string | null;

  description?: string | null;

  description_embedding?: Array<number> | null;

  engram_id?: string | null;

  inference_metadata?: { [key: string]: unknown } | null;

  is_derived?: boolean;

  metadata?: { [key: string]: unknown } | null;

  object_id?: string | null;

  occurrence_index?: number | null;

  parent_relationship_id?: number | null;

  recurrence_rule?: { [key: string]: unknown } | string | null;

  relationship_type?: string | null;

  subject_id?: string | null;

  temporal_precision?: string | null;

  valid_span?: unknown;

  weight?: number | null;
}

export type RelationshipExportResponse = unknown;

export interface RelationshipCreateParams {
  /**
   * The description of the relationship to create.
   */
  description: string;

  /**
   * The object of the relationship to create.
   */
  object: string;

  /**
   * The ID of the object of the relationship to create.
   */
  object_id: string;

  /**
   * The predicate of the relationship to create.
   */
  predicate: string;

  /**
   * The subject of the relationship to create.
   */
  subject: string;

  /**
   * The ID of the subject of the relationship to create.
   */
  subject_id: string;

  /**
   * The metadata of the relationship to create.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * The weight of the relationship to create.
   */
  weight?: number;
}

export interface RelationshipRetrieveParams {
  /**
   * The collection ID corresponding to the graph containing the relationship.
   */
  collection_id: string;
}

export interface RelationshipUpdateParams {
  /**
   * Path param: The collection ID corresponding to the graph containing the
   * relationship.
   */
  collection_id: string;

  /**
   * Body param: The updated object of the relationship.
   */
  object: string | null;

  /**
   * Body param: The updated object ID of the relationship.
   */
  object_id: string | null;

  /**
   * Body param: The updated predicate of the relationship.
   */
  predicate: string | null;

  /**
   * Body param: The updated subject of the relationship.
   */
  subject: string | null;

  /**
   * Body param: The updated subject ID of the relationship.
   */
  subject_id: string | null;

  /**
   * Body param: The updated description of the relationship.
   */
  description?: string | null;

  /**
   * Body param: The updated metadata of the relationship.
   */
  metadata?: { [key: string]: unknown } | null;

  /**
   * Body param: The updated weight of the relationship.
   */
  weight?: number | null;
}

export interface RelationshipListParams {
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

export interface RelationshipDeleteParams {
  /**
   * The collection ID corresponding to the graph to remove the relationship from.
   */
  collection_id: string;
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
    type NebulaResultsRelationship as NebulaResultsRelationship,
    type Relationship as Relationship,
    type RelationshipExportResponse as RelationshipExportResponse,
    type RelationshipCreateParams as RelationshipCreateParams,
    type RelationshipRetrieveParams as RelationshipRetrieveParams,
    type RelationshipUpdateParams as RelationshipUpdateParams,
    type RelationshipListParams as RelationshipListParams,
    type RelationshipDeleteParams as RelationshipDeleteParams,
    type RelationshipExportParams as RelationshipExportParams,
  };
}
