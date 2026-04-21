// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EngramsAPI from '../../collections/engrams';
import * as GoogleAPI from './google';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class GitHub extends APIResource {
  /**
   * Redirect user to GitHub's OAuth consent screen.
   */
  authorize(options?: RequestOptions): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.get('/v1/users/oauth/github/authorize', options);
  }

  /**
   * GitHub callback route to exchange code for an access_token, then fetch user info
   * from GitHub's API, then do the same 'oauth-based' login or registration.
   */
  callback(query: GitHubCallbackParams, options?: RequestOptions): APIPromise<GoogleAPI.LoginResponse> {
    return this._client.get('/v1/users/oauth/github/callback', { query, ...options });
  }
}

export interface GitHubCallbackParams {
  code: string;

  state: string;
}

export declare namespace GitHub {
  export { type GitHubCallbackParams as GitHubCallbackParams };
}
