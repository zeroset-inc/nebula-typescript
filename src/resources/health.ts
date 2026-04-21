// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as EngramsAPI from './collections/engrams';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  /**
   * Health Check
   */
  check(options?: RequestOptions): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.get('/v1/health', options);
  }
}
