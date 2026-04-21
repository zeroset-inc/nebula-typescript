// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from './collections';
import { CollectionAddResponse, CollectionListParams, Collections } from './collections';

export class Marketplace extends APIResource {
  collections: CollectionsAPI.Collections = new CollectionsAPI.Collections(this._client);
}

Marketplace.Collections = Collections;

export declare namespace Marketplace {
  export {
    Collections as Collections,
    type CollectionAddResponse as CollectionAddResponse,
    type CollectionListParams as CollectionListParams,
  };
}
