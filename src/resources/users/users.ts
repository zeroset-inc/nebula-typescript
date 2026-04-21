// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsersAPI_ from './users';
import * as ChunksAPI from '../chunks';
import * as EngramsAPI from '../collections/engrams';
import * as UsersAPI from '../collections/users';
import * as APIKeysAPI from './api-keys';
import {
  APIKeyCreateParams,
  APIKeyCreateResponse,
  APIKeyDeleteParams,
  APIKeyListResponse,
  APIKeys,
} from './api-keys';
import * as CollectionsAPI from './collections';
import {
  CollectionAddParams,
  CollectionGetAllParams,
  CollectionRemoveParams,
  Collections,
} from './collections';
import * as OAuthAPI from './oauth/oauth';
import { OAuth } from './oauth/oauth';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Users extends APIResource {
  collections: CollectionsAPI.Collections = new CollectionsAPI.Collections(this._client);
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);
  oauth: OAuthAPI.OAuth = new OAuthAPI.OAuth(this._client);

  /**
   * Get detailed information about a specific user.
   *
   * Users can only access their own information unless they are superusers.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<NebulaResultsUser> {
    return this._client.get(path`/v1/users/${id}`, options);
  }

  /**
   * Update user information.
   *
   * Users can only update their own information unless they are superusers.
   * Superuser status can only be modified by existing superusers.
   */
  update(
    id: string,
    body: UserUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<NebulaResultsUser> {
    return this._client.post(path`/v1/users/${id}`, { body, ...options });
  }

  /**
   * List all users with pagination and filtering options.
   *
   * Only accessible by superusers.
   */
  list(
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<UsersAPI.PaginatedNebulaResultListUser> {
    return this._client.get('/v1/users', { query, ...options });
  }

  /**
   * Delete a specific user.
   *
   * Users can only delete their own account unless they are superusers.
   */
  delete(
    id: string,
    body: UserDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    return this._client.delete(path`/v1/users/${id}`, { body, ...options });
  }

  /**
   * Change the authenticated user's password.
   */
  changePassword(
    body: UserChangePasswordParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post('/v1/users/change-password', { body, ...options });
  }

  /**
   * Export users as a CSV file.
   */
  export(body: UserExportParams | null | undefined = {}, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/users/export', { body, ...options });
  }

  /**
   * Return the system default limits, user-level overrides, and final "effective"
   * limit settings for the specified user.
   *
   * Only superusers or the user themself may fetch these values.
   */
  fetchLimits(id: string, options?: RequestOptions): APIPromise<UserFetchLimitsResponse> {
    return this._client.get(path`/v1/users/${id}/limits`, options);
  }

  /**
   * Get detailed information about the currently authenticated user.
   */
  getCurrentUser(options?: RequestOptions): APIPromise<NebulaResultsUser> {
    return this._client.get('/v1/users/me', options);
  }

  /**
   * Authenticate a user and provide access tokens.
   */
  login(body: UserLoginParams, options?: RequestOptions): APIPromise<TokenResponse> {
    return this._client.post('/v1/users/login', {
      body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/x-www-form-urlencoded' }, options?.headers]),
    });
  }

  /**
   * Log out the current user.
   */
  logout(options?: RequestOptions): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post('/v1/users/logout', options);
  }

  /**
   * Refresh the access token using a refresh token.
   */
  refreshToken(params: UserRefreshTokenParams, options?: RequestOptions): APIPromise<TokenResponse> {
    const { body } = params;
    return this._client.post('/v1/users/refresh-token', { body: body, ...options });
  }

  /**
   * Register a new user with the given email and password.
   */
  register(body: UserRegisterParams, options?: RequestOptions): APIPromise<NebulaResultsUser> {
    return this._client.post('/v1/users', { body, ...options });
  }

  /**
   * Request a password reset for a user.
   */
  requestPasswordReset(
    params: UserRequestPasswordResetParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    const { body } = params;
    return this._client.post('/v1/users/request-password-reset', { body: body, ...options });
  }

  /**
   * Reset a user's password using a reset token.
   */
  resetPassword(
    body: UserResetPasswordParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post('/v1/users/reset-password', { body, ...options });
  }

  /**
   * Get aggregated metrics across all user collections
   */
  retrieveMetrics(
    query: UserRetrieveMetricsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/v1/user/metrics', { query, ...options });
  }

  /**
   * Send a user's email a verification code.
   */
  sendVerificationEmail(
    params: UserSendVerificationEmailParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    const { body } = params;
    return this._client.post('/v1/users/send-verification-email', { body: body, ...options });
  }

  /**
   * Verify a user's email address.
   */
  verifyEmail(
    body: UserVerifyEmailParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post('/v1/users/verify-email', { body, ...options });
  }
}

export interface NebulaResultsUser {
  results: StandardUser;
}

export interface StandardUser {
  id: string;

  email: string;

  account_type?: string;

  bio?: string | null;

  collection_ids?: Array<string>;

  created_at?: string;

  current_plan_id?: string | null;

  engram_ids?: Array<string>;

  github_id?: string | null;

  google_id?: string | null;

  graph_ids?: Array<string>;

  hashed_password?: string | null;

  is_active?: boolean;

  is_superuser?: boolean;

  is_verified?: boolean;

  limits_overrides?: { [key: string]: unknown } | null;

  metadata?: { [key: string]: unknown } | null;

  name?: string | null;

  num_files?: number | null;

  profile_picture?: string | null;

  stripe_customer_id?: string | null;

  subscription_end_date?: string | null;

  subscription_start_date?: string | null;

  subscription_status?: string | null;

  total_size_in_bytes?: number | null;

  updated_at?: string;

  verification_code_expiry?: string | null;

  wallet_address?: string | null;

  wallet_type?: string | null;
}

export interface StorageTypeLimit {
  limit: number;

  remaining: number;

  used: number;
}

export interface SystemDefaults {
  global_per_min: number;

  monthly_limit: number;

  route_per_min: number | null;
}

export interface Token {
  token: string;

  token_type: string;
}

export interface TokenResponse {
  results: TokenResponse.Results;
}

export namespace TokenResponse {
  export interface Results {
    access_token: UsersAPI_.Token;

    refresh_token: UsersAPI_.Token;
  }
}

export interface UsageLimit {
  limit: number;

  remaining: number;

  used: number;
}

export type UserExportResponse = unknown;

export interface UserFetchLimitsResponse {
  results: UserFetchLimitsResponse.Results;
}

export namespace UserFetchLimitsResponse {
  export interface Results {
    effective_limits: UsersAPI_.SystemDefaults;

    storage_limits: Results.StorageLimits;

    system_defaults: UsersAPI_.SystemDefaults;

    usage: Results.Usage;

    user_overrides: { [key: string]: unknown };
  }

  export namespace Results {
    export interface StorageLimits {
      chunks: UsersAPI_.StorageTypeLimit;

      collections: UsersAPI_.StorageTypeLimit;

      engrams: UsersAPI_.StorageTypeLimit;
    }

    export interface Usage {
      global_per_min: UsersAPI_.UsageLimit;

      monthly_limit: UsersAPI_.UsageLimit;

      routes: { [key: string]: Usage.Routes };
    }

    export namespace Usage {
      export interface Routes {
        monthly_limit: UsersAPI_.UsageLimit;

        route_per_min: UsersAPI_.UsageLimit;
      }
    }
  }
}

export type UserRetrieveMetricsResponse = unknown;

export interface UserUpdateParams {
  /**
   * Updated user bio
   */
  bio?: string | null;

  /**
   * Updated email address
   */
  email?: string | null;

  /**
   * Updated superuser status
   */
  is_superuser?: boolean | null;

  /**
   * Updated limits overrides
   */
  limits_overrides?: { [key: string]: unknown };

  metadata?: { [key: string]: string | null } | null;

  /**
   * Updated user name
   */
  name?: string | null;

  /**
   * Updated profile picture URL
   */
  profile_picture?: string | null;
}

export interface UserListParams {
  /**
   * List of user IDs to filter by
   */
  ids?: Array<string>;

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

export interface UserDeleteParams {
  /**
   * Whether to delete the user's vector data
   */
  delete_vector_data?: boolean | null;

  /**
   * User's current password
   */
  password?: string | null;
}

export interface UserChangePasswordParams {
  /**
   * Current password
   */
  current_password: string;

  /**
   * New password
   */
  new_password: string;
}

export interface UserExportParams {
  /**
   * Specific columns to export
   */
  columns?: Array<string> | null;

  /**
   * Filters to apply to the export
   */
  filters?: { [key: string]: unknown } | null;

  /**
   * Whether to include column headers
   */
  include_header?: boolean | null;
}

export interface UserLoginParams {
  password: string;

  username: string;

  client_id?: string | null;

  client_secret?: string | null;

  grant_type?: string | null;

  scope?: string;
}

export interface UserRefreshTokenParams {
  /**
   * Refresh token
   */
  body: string;
}

export interface UserRegisterParams {
  /**
   * User's email address
   */
  email: string;

  /**
   * User's password
   */
  password: string;

  /**
   * The bio for the new user
   */
  bio?: string | null;

  /**
   * Whether to verify the user immediately
   */
  is_verified?: boolean;

  /**
   * The name for the new user
   */
  name?: string | null;

  /**
   * Updated user profile picture
   */
  profile_picture?: string | null;
}

export interface UserRequestPasswordResetParams {
  /**
   * User's email address
   */
  body: string;
}

export interface UserResetPasswordParams {
  /**
   * New password
   */
  new_password: string;

  /**
   * Password reset token
   */
  reset_token: string;
}

export interface UserRetrieveMetricsParams {
  days?: number;
}

export interface UserSendVerificationEmailParams {
  /**
   * User's email address
   */
  body: string;
}

export interface UserVerifyEmailParams {
  /**
   * User's email address
   */
  email: string;

  /**
   * Email verification code
   */
  verification_code: string;
}

Users.Collections = Collections;
Users.APIKeys = APIKeys;
Users.OAuth = OAuth;

export declare namespace Users {
  export {
    type NebulaResultsUser as NebulaResultsUser,
    type StandardUser as StandardUser,
    type StorageTypeLimit as StorageTypeLimit,
    type SystemDefaults as SystemDefaults,
    type Token as Token,
    type TokenResponse as TokenResponse,
    type UsageLimit as UsageLimit,
    type UserExportResponse as UserExportResponse,
    type UserFetchLimitsResponse as UserFetchLimitsResponse,
    type UserRetrieveMetricsResponse as UserRetrieveMetricsResponse,
    type UserUpdateParams as UserUpdateParams,
    type UserListParams as UserListParams,
    type UserDeleteParams as UserDeleteParams,
    type UserChangePasswordParams as UserChangePasswordParams,
    type UserExportParams as UserExportParams,
    type UserLoginParams as UserLoginParams,
    type UserRefreshTokenParams as UserRefreshTokenParams,
    type UserRegisterParams as UserRegisterParams,
    type UserRequestPasswordResetParams as UserRequestPasswordResetParams,
    type UserResetPasswordParams as UserResetPasswordParams,
    type UserRetrieveMetricsParams as UserRetrieveMetricsParams,
    type UserSendVerificationEmailParams as UserSendVerificationEmailParams,
    type UserVerifyEmailParams as UserVerifyEmailParams,
  };

  export {
    Collections as Collections,
    type CollectionAddParams as CollectionAddParams,
    type CollectionGetAllParams as CollectionGetAllParams,
    type CollectionRemoveParams as CollectionRemoveParams,
  };

  export {
    APIKeys as APIKeys,
    type APIKeyCreateResponse as APIKeyCreateResponse,
    type APIKeyListResponse as APIKeyListResponse,
    type APIKeyCreateParams as APIKeyCreateParams,
    type APIKeyDeleteParams as APIKeyDeleteParams,
  };

  export { OAuth as OAuth };
}
