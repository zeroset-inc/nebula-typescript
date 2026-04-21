// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Version extends APIResource {
  /**
   * Get API version and service information.
   */
  retrieve(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/version', options);
  }
}

export type VersionRetrieveResponse = unknown;

export declare namespace Version {
  export { type VersionRetrieveResponse as VersionRetrieveResponse };
}
