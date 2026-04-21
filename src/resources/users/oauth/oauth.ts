// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as GitHubAPI from './github';
import { GitHub, GitHubCallbackParams } from './github';
import * as GoogleAPI from './google';
import { Google, GoogleCallbackParams, LoginResponse } from './google';

export class OAuth extends APIResource {
  google: GoogleAPI.Google = new GoogleAPI.Google(this._client);
  github: GitHubAPI.GitHub = new GitHubAPI.GitHub(this._client);
}

OAuth.Google = Google;
OAuth.GitHub = GitHub;

export declare namespace OAuth {
  export {
    Google as Google,
    type LoginResponse as LoginResponse,
    type GoogleCallbackParams as GoogleCallbackParams,
  };

  export { GitHub as GitHub, type GitHubCallbackParams as GitHubCallbackParams };
}
