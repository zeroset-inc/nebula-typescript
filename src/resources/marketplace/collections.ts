// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from '../collections/collections';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Collections extends APIResource {
  /**
   * Get details of a public collection from the marketplace. Returns collection
   * metadata including pricing, preview limits, etc.
   */
  retrieve(
    collectionID: string,
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.NebulaResultsCollectionResponse> {
    return this._client.get(path`/v1/marketplace/collections/${collectionID}`, options);
  }

  /**
   * Browse publicly available collections in the marketplace. These collections have
   * 'public_preview' or 'marketplace' access tier.
   *
   * No authentication required, but authenticated users may see more details.
   */
  list(
    query: CollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CollectionsAPI.PaginatedNebulaResultListCollectionResponse> {
    return this._client.get('/v1/marketplace/collections', { query, ...options });
  }

  /**
   * Add a public collection to your account. Creates an access grant allowing you to
   * search and retrieve from this collection.
   *
   * Authentication is required. Usage counts toward your plan limits.
   */
  add(collectionID: string, options?: RequestOptions): APIPromise<CollectionAddResponse> {
    return this._client.post(path`/v1/marketplace/collections/${collectionID}/add`, options);
  }
}

export type CollectionAddResponse = { [key: string]: unknown };

export interface CollectionListParams {
  /**
   * The maximum number of collections to return
   */
  limit?: number;

  /**
   * The number of collections to skip
   */
  offset?: number;

  /**
   * Search query to filter collections by name
   */
  search?: string | null;
}

export declare namespace Collections {
  export {
    type CollectionAddResponse as CollectionAddResponse,
    type CollectionListParams as CollectionListParams,
  };
}
