// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CollectionsAPI from './collections/collections';
import { Collections } from './collections/collections';

export class Analytics extends APIResource {
  collections: CollectionsAPI.Collections = new CollectionsAPI.Collections(this._client);
}

Analytics.Collections = Collections;

export declare namespace Analytics {
  export { Collections as Collections };
}
