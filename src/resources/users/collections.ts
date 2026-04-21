// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import * as CollectionsAPI from '../collections/collections';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  /**
   * Add User to Collection
   */
  add(
    collectionID: string,
    params: CollectionAddParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.post(path`/v1/users/${id}/collections/${collectionID}`, options);
  }

  /**
   * Get all collections associated with a specific user.
   *
   * Users can only access their own collections unless they are superusers.
   */
  getAll(
    id: string,
    query: CollectionGetAllParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.PaginatedNebulaResultListCollectionResponse> {
    return this._client.get(path`/v1/users/${id}/collections`, { query, ...options });
  }

  /**
   * Remove a user from a collection.
   *
   * Requires either superuser status or access to the collection.
   */
  remove(
    collectionID: string,
    params: CollectionRemoveParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/users/${id}/collections/${collectionID}`, options);
  }
}

export interface CollectionAddParams {
  id: string;
}

export interface CollectionGetAllParams {
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

export interface CollectionRemoveParams {
  id: string;
}

export declare namespace Collections {
  export {
    type CollectionAddParams as CollectionAddParams,
    type CollectionGetAllParams as CollectionGetAllParams,
    type CollectionRemoveParams as CollectionRemoveParams,
  };
}
