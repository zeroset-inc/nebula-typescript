// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TokensAPI from './tokens';
import {
  TokenRetrieveCurrentMonthResponse,
  TokenRetrieveHistoryParams,
  TokenRetrieveHistoryResponse,
  Tokens,
} from './tokens';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Usage extends APIResource {
  tokens: TokensAPI.Tokens = new TokensAPI.Tokens(this._client);

  /**
   * Get current user's usage statistics with token-based tracking
   */
  retrieve(options?: RequestOptions): APIPromise<unknown> {
    return this._client.get('/v1/usage', options);
  }
}

export type UsageRetrieveResponse = unknown;

Usage.Tokens = Tokens;

export declare namespace Usage {
  export { type UsageRetrieveResponse as UsageRetrieveResponse };

  export {
    Tokens as Tokens,
    type TokenRetrieveCurrentMonthResponse as TokenRetrieveCurrentMonthResponse,
    type TokenRetrieveHistoryResponse as TokenRetrieveHistoryResponse,
    type TokenRetrieveHistoryParams as TokenRetrieveHistoryParams,
  };
}
