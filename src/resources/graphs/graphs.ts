// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as CommunitiesAPI from './communities';
import {
  Communities,
  Community,
  CommunityBuildParams,
  CommunityCreateParams,
  CommunityDeleteParams,
  CommunityExportParams,
  CommunityExportResponse,
  CommunityListParams,
  CommunityListResponse,
  CommunityRetrieveParams,
  CommunityUpdateParams,
  NebulaResultsCommunity,
} from './communities';
import * as EntitiesAPI from './entities';
import {
  Entities,
  Entity,
  EntityCreateParams,
  EntityDeleteParams,
  EntityExportParams,
  EntityExportResponse,
  EntityListParams,
  EntityRetrieveParams,
  EntityUpdateParams,
  NebulaResultsEntity,
} from './entities';
import * as RelationshipsAPI from './relationships';
import {
  NebulaResultsRelationship,
  Relationship,
  RelationshipCreateParams,
  RelationshipDeleteParams,
  RelationshipExportParams,
  RelationshipExportResponse,
  RelationshipListParams,
  RelationshipRetrieveParams,
  RelationshipUpdateParams,
  Relationships,
} from './relationships';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Graphs extends APIResource {
  communities: CommunitiesAPI.Communities = new CommunitiesAPI.Communities(this._client);
  entities: EntitiesAPI.Entities = new EntitiesAPI.Entities(this._client);
  relationships: RelationshipsAPI.Relationships = new RelationshipsAPI.Relationships(this._client);

  /**
   * Retrieves detailed information about a specific graph by ID.
   */
  retrieve(collectionID: string, options?: RequestOptions): APIPromise<NebulaResultsGraphResponse> {
    return this._client.get(path`/v1/graphs/${collectionID}`, options);
  }

  /**
   * Update an existing graphs's configuration.
   *
   * This endpoint allows updating the name and description of an existing
   * collection. The user must have appropriate permissions to modify the collection.
   */
  update(
    collectionID: string,
    body: GraphUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NebulaResultsGraphResponse> {
    return this._client.post(path`/v1/graphs/${collectionID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of graphs the authenticated user has access to.
   *
   * Results can be filtered by providing specific graph IDs. Regular users will only
   * see graphs they own or have access to. Superusers can see all graphs.
   *
   * The graphs are returned in order of last modification, with most recent first.
   */
  list(
    query: GraphListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GraphListResponse> {
    return this._client.get('/v1/graphs', { query, ...options });
  }

  /**
   * Deletes a graph and all its associated data.
   *
   * This endpoint permanently removes the specified graph along with all entities
   * and relationships that belong to only this graph. The original source entities
   * and relationships extracted from underlying engrams are not deleted and are
   * managed through the engram lifecycle.
   */
  reset(
    collectionID: string,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    return this._client.post(path`/v1/graphs/${collectionID}/reset`, options);
  }
}

export interface GraphResponse {
  id: string;

  collection_id: string;

  created_at: string;

  description: string | null;

  engram_ids: Array<string>;

  name: string;

  status: string;

  updated_at: string;
}

export interface NebulaResultsGraphResponse {
  results: GraphResponse;
}

export interface GraphListResponse {
  results: Array<GraphResponse>;

  total_entries: number;
}

export interface GraphUpdateParams {
  /**
   * An optional description of the graph
   */
  description?: string | null;

  /**
   * The name of the graph
   */
  name?: string | null;
}

export interface GraphListParams {
  /**
   * A list of graph IDs to retrieve. If not provided, all graphs will be returned.
   */
  collection_ids?: Array<string>;

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

Graphs.Communities = Communities;
Graphs.Entities = Entities;
Graphs.Relationships = Relationships;

export declare namespace Graphs {
  export {
    type GraphResponse as GraphResponse,
    type NebulaResultsGraphResponse as NebulaResultsGraphResponse,
    type GraphListResponse as GraphListResponse,
    type GraphUpdateParams as GraphUpdateParams,
    type GraphListParams as GraphListParams,
  };

  export {
    Communities as Communities,
    type Community as Community,
    type NebulaResultsCommunity as NebulaResultsCommunity,
    type CommunityListResponse as CommunityListResponse,
    type CommunityExportResponse as CommunityExportResponse,
    type CommunityCreateParams as CommunityCreateParams,
    type CommunityRetrieveParams as CommunityRetrieveParams,
    type CommunityUpdateParams as CommunityUpdateParams,
    type CommunityListParams as CommunityListParams,
    type CommunityDeleteParams as CommunityDeleteParams,
    type CommunityBuildParams as CommunityBuildParams,
    type CommunityExportParams as CommunityExportParams,
  };

  export {
    Entities as Entities,
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

  export {
    Relationships as Relationships,
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
