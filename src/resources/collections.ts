// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Collections extends APIResource {
  /**
   * Create a new collection and automatically add the creating user to it.
   *
   * This endpoint allows authenticated users to create a new collection with a
   * specified name and optional description. The user creating the collection is
   * automatically added as a member.
   */
  create(body: CollectionCreateParams, options?: RequestOptions): APIPromise<CollectionCreateResponse> {
    return this._client.post('/v1/collections', { body, ...options });
  }

  /**
   * Get details of a specific collection.
   *
   * This endpoint retrieves detailed information about a single collection
   * identified by its UUID. The user must have access to the collection to view its
   * details.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<CollectionRetrieveResponse> {
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
    body: CollectionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CollectionUpdateResponse> {
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
  ): APIPromise<CollectionListResponse> {
    return this._client.get('/v1/collections', { query, ...options });
  }

  /**
   * Delete an existing collection.
   *
   * This endpoint allows deletion of a collection identified by its UUID. The user
   * must have appropriate permissions to delete the collection. Deleting a
   * collection removes all associations but does not delete the engrams within it.
   */
  delete(id: string, options?: RequestOptions): APIPromise<CollectionDeleteResponse> {
    return this._client.delete(path`/v1/collections/${id}`, options);
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
  ): APIPromise<CollectionRetrieveByNameResponse> {
    return this._client.get(path`/v1/collections/name/${collectionName}`, { query, ...options });
  }
}

export interface CollectionCreateResponse {
  results: CollectionCreateResponse.Results;
}

export namespace CollectionCreateResponse {
  export interface Results {
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

    cache_policy?: string | null;

    chain_type?: string | null;

    contract_address?: string | null;

    creator_royalty_bps?: number | null;

    has_preview_access?: boolean | null;

    is_forked?: boolean | null;

    marketplace_metadata?: { [key: string]: unknown } | null;

    memory_count?: number | null;

    nft_collection_address?: string | null;

    owner_email?: string | null;

    owner_name?: string | null;

    preview_query_limit?: number | null;

    purchase_price_usd?: string | null;

    rental_price_monthly_usd?: string | null;

    workspace_id?: string | null;
  }
}

export interface CollectionRetrieveResponse {
  results: CollectionRetrieveResponse.Results;
}

export namespace CollectionRetrieveResponse {
  export interface Results {
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

    cache_policy?: string | null;

    chain_type?: string | null;

    contract_address?: string | null;

    creator_royalty_bps?: number | null;

    has_preview_access?: boolean | null;

    is_forked?: boolean | null;

    marketplace_metadata?: { [key: string]: unknown } | null;

    memory_count?: number | null;

    nft_collection_address?: string | null;

    owner_email?: string | null;

    owner_name?: string | null;

    preview_query_limit?: number | null;

    purchase_price_usd?: string | null;

    rental_price_monthly_usd?: string | null;

    workspace_id?: string | null;
  }
}

export interface CollectionUpdateResponse {
  results: CollectionUpdateResponse.Results;
}

export namespace CollectionUpdateResponse {
  export interface Results {
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

    cache_policy?: string | null;

    chain_type?: string | null;

    contract_address?: string | null;

    creator_royalty_bps?: number | null;

    has_preview_access?: boolean | null;

    is_forked?: boolean | null;

    marketplace_metadata?: { [key: string]: unknown } | null;

    memory_count?: number | null;

    nft_collection_address?: string | null;

    owner_email?: string | null;

    owner_name?: string | null;

    preview_query_limit?: number | null;

    purchase_price_usd?: string | null;

    rental_price_monthly_usd?: string | null;

    workspace_id?: string | null;
  }
}

export interface CollectionListResponse {
  results: Array<CollectionListResponse.Result>;

  total_entries: number;
}

export namespace CollectionListResponse {
  export interface Result {
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

    cache_policy?: string | null;

    chain_type?: string | null;

    contract_address?: string | null;

    creator_royalty_bps?: number | null;

    has_preview_access?: boolean | null;

    is_forked?: boolean | null;

    marketplace_metadata?: { [key: string]: unknown } | null;

    memory_count?: number | null;

    nft_collection_address?: string | null;

    owner_email?: string | null;

    owner_name?: string | null;

    preview_query_limit?: number | null;

    purchase_price_usd?: string | null;

    rental_price_monthly_usd?: string | null;

    workspace_id?: string | null;
  }
}

export interface CollectionDeleteResponse {
  results: CollectionDeleteResponse.Results;
}

export namespace CollectionDeleteResponse {
  export interface Results {
    success: boolean;
  }
}

export interface CollectionRetrieveByNameResponse {
  results: CollectionRetrieveByNameResponse.Results;
}

export namespace CollectionRetrieveByNameResponse {
  export interface Results {
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

    cache_policy?: string | null;

    chain_type?: string | null;

    contract_address?: string | null;

    creator_royalty_bps?: number | null;

    has_preview_access?: boolean | null;

    is_forked?: boolean | null;

    marketplace_metadata?: { [key: string]: unknown } | null;

    memory_count?: number | null;

    nft_collection_address?: string | null;

    owner_email?: string | null;

    owner_name?: string | null;

    preview_query_limit?: number | null;

    purchase_price_usd?: string | null;

    rental_price_monthly_usd?: string | null;

    workspace_id?: string | null;
  }
}

export interface CollectionCreateParams {
  name: string;

  description?: string | null;

  workspace_id?: string | null;
}

export interface CollectionUpdateParams {
  access_tier?: string | null;

  description?: string | null;

  generate_description?: boolean;

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
   * Filter collections by name (case-insensitive exact match).
   */
  name?: string | null;

  /**
   * Specifies the number of objects to skip. Defaults to 0.
   */
  offset?: number;

  /**
   * If true, only returns collections owned by the user, not all accessible
   * collections.
   */
  owner_only?: boolean;

  /**
   * Filter by workspace ID. Pass a UUID to scope to a workspace, or omit for all.
   */
  workspace_id?: string | null;
}

export interface CollectionRetrieveByNameParams {
  /**
   * (Superuser only) Specify the owner_id to retrieve a collection by name
   */
  owner_id?: string | null;
}

export declare namespace Collections {
  export {
    type CollectionCreateResponse as CollectionCreateResponse,
    type CollectionRetrieveResponse as CollectionRetrieveResponse,
    type CollectionUpdateResponse as CollectionUpdateResponse,
    type CollectionListResponse as CollectionListResponse,
    type CollectionDeleteResponse as CollectionDeleteResponse,
    type CollectionRetrieveByNameResponse as CollectionRetrieveByNameResponse,
    type CollectionCreateParams as CollectionCreateParams,
    type CollectionUpdateParams as CollectionUpdateParams,
    type CollectionListParams as CollectionListParams,
    type CollectionRetrieveByNameParams as CollectionRetrieveByNameParams,
  };
}
