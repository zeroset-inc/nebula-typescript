// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EngramsAPI from '../../collections/engrams';
import * as UsersAPI from '../users';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Google extends APIResource {
  /**
   * Redirect user to Google's OAuth 2.0 consent screen.
   */
  authorize(options?: RequestOptions): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.get('/v1/users/oauth/google/authorize', options);
  }

  /**
   * Google's callback that will receive the `code` and `state`.
   *
   * We then exchange code for tokens, verify, and log the user in.
   */
  callback(query: GoogleCallbackParams, options?: RequestOptions): APIPromise<LoginResponse> {
    return this._client.get('/v1/users/oauth/google/callback', { query, ...options });
  }
}

export interface LoginResponse {
  results: LoginResponse.Results;
}

export namespace LoginResponse {
  export interface Results {
    access_token: UsersAPI.Token;

    refresh_token: UsersAPI.Token;
  }
}

export interface GoogleCallbackParams {
  code: string;

  state: string;
}

export declare namespace Google {
  export { type LoginResponse as LoginResponse, type GoogleCallbackParams as GoogleCallbackParams };
}
