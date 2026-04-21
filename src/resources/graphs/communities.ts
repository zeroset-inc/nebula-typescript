// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as EngramsAPI from '../collections/engrams';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Communities extends APIResource {
  /**
   * Creates a new community in the graph.
   *
   * While communities are typically built automatically via the
   * /graphs/{id}/communities/build endpoint, this endpoint allows you to manually
   * create your own communities.
   *
   * This can be useful when you want to:
   *
   * - Define custom groupings of entities based on domain knowledge
   * - Add communities that weren't detected by the automatic process
   * - Create hierarchical organization structures
   * - Tag groups of entities with specific metadata
   *
   * The created communities will be integrated with any existing automatically
   * detected communities in the graph's community structure.
   */
  create(
    collectionID: string,
    body: CommunityCreateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCommunity> {
    return this._client.post(path`/v1/graphs/${collectionID}/communities`, { body, ...options });
  }

  /**
   * Retrieves a specific community by its ID.
   */
  retrieve(
    communityID: string,
    params: CommunityRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCommunity> {
    const { collection_id } = params;
    return this._client.get(path`/v1/graphs/${collection_id}/communities/${communityID}`, options);
  }

  /**
   * Updates an existing community in the graph.
   */
  update(
    communityID: string,
    params: CommunityUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsCommunity> {
    const { collection_id, ...body } = params;
    return this._client.post(path`/v1/graphs/${collection_id}/communities/${communityID}`, {
      body,
      ...options,
    });
  }

  /**
   * Lists all communities in the graph with pagination support.
   */
  list(
    collectionID: string,
    query: CommunityListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CommunityListResponse> {
    return this._client.get(path`/v1/graphs/${collectionID}/communities`, { query, ...options });
  }

  /**
   * Delete a community
   */
  delete(
    communityID: string,
    params: CommunityDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { collection_id } = params;
    return this._client.delete(path`/v1/graphs/${collection_id}/communities/${communityID}`, options);
  }

  /**
   * Creates communities in the graph by analyzing entity relationships and
   * similarities.
   *
   * Communities are created through the following process:
   *
   * 1. Analyzes entity relationships and metadata to build a similarity graph
   * 2. Applies advanced community detection algorithms (e.g. Leiden) to identify
   *    densely connected groups
   * 3. Creates hierarchical community structure with multiple granularity levels
   * 4. Generates natural language summaries and statistical insights for each
   *    community
   *
   * The resulting communities can be used to:
   *
   * - Understand high-level graph structure and organization
   * - Identify key entity groupings and their relationships
   * - Navigate and explore the graph at different levels of detail
   * - Generate insights about entity clusters and their characteristics
   *
   * The community detection process is configurable through settings like: -
   * Community detection algorithm parameters - Summary generation prompt
   */
  build(
    collectionID: string,
    params: CommunityBuildParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    const { body } = params ?? {};
    return this._client.post(path`/v1/graphs/${collectionID}/communities/build`, { body: body, ...options });
  }

  /**
   * Export engrams as a downloadable CSV file.
   */
  export(
    collectionID: string,
    body: CommunityExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.post(path`/v1/graphs/${collectionID}/communities/export`, { body, ...options });
  }
}

export interface Community {
  id?: number | string | null;

  attributes?: { [key: string]: unknown } | null;

  collection_id?: string | null;

  community_id?: string | null;

  created_at?: string;

  description_embedding?: Array<number> | null;

  findings?: Array<string>;

  graph_snapshot_id?: string | null;

  level?: number | null;

  name?: string;

  rating?: number | null;

  rating_explanation?: string | null;

  summary?: string;

  updated_at?: string;
}

export interface NebulaResultsCommunity {
  results: Community;
}

export interface CommunityListResponse {
  results: Array<Community>;

  total_entries: number;
}

export type CommunityExportResponse = unknown;

export interface CommunityCreateParams {
  /**
   * The name of the community
   */
  name: string;

  /**
   * A summary of the community
   */
  summary: string;

  /**
   * Findings about the community
   */
  findings?: Array<string> | null;

  /**
   * Rating between 1 and 10
   */
  rating?: number | null;

  /**
   * Explanation for the rating
   */
  rating_explanation?: string | null;
}

export interface CommunityRetrieveParams {
  /**
   * The ID of the collection to get communities for.
   */
  collection_id: string;
}

export interface CommunityUpdateParams {
  /**
   * Path param
   */
  collection_id: string;

  /**
   * Body param
   */
  findings?: Array<string> | null;

  /**
   * Body param
   */
  name?: string | null;

  /**
   * Body param
   */
  rating?: number | null;

  /**
   * Body param
   */
  rating_explanation?: string | null;

  /**
   * Body param
   */
  summary?: string | null;
}

export interface CommunityListParams {
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

export interface CommunityDeleteParams {
  /**
   * The collection ID corresponding to the graph to delete the community from.
   */
  collection_id: string;
}

export interface CommunityBuildParams {
  /**
   * Settings for the graph enrichment process.
   */
  body?: { [key: string]: unknown } | null;
}

export interface CommunityExportParams {
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

export declare namespace Communities {
  export {
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
}
