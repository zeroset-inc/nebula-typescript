// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ChunksAPI from '../chunks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';
import * as UsersAPI_ from '../users/users';

export class Users extends APIResource {
  /**
   * Get all users in a collection with pagination and sorting options.
   *
   * This endpoint retrieves a paginated list of users who have access to a specific
   * collection. It supports sorting options to customize the order of returned
   * users.
   */
  list(
    id: string,
    query: UserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaginatedNebulaResultListUser> {
    return this._client.get(path`/v1/collections/${id}/users`, { query, ...options });
  }

  /**
   * Add a user to a collection.
   *
   * This endpoint grants a user access to a specific collection. The authenticated
   * user must have admin permissions for the collection to add new users.
   */
  add(
    userID: string,
    params: UserAddParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.post(path`/v1/collections/${id}/users/${userID}`, options);
  }

  /**
   * Remove a user from a collection.
   *
   * This endpoint revokes a user's access to a specific collection. The
   * authenticated user must have admin permissions for the collection to remove
   * users.
   */
  remove(
    userID: string,
    params: UserRemoveParams,
    options?: RequestOptions,
  ): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/collections/${id}/users/${userID}`, options);
  }
}

export interface PaginatedNebulaResultListUser {
  results: Array<UsersAPI_.StandardUser>;

  total_entries: number;
}

export interface UserListParams {
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

export interface UserAddParams {
  /**
   * The unique identifier of the collection
   */
  id: string;
}

export interface UserRemoveParams {
  /**
   * The unique identifier of the collection
   */
  id: string;
}

export declare namespace Users {
  export {
    type PaginatedNebulaResultListUser as PaginatedNebulaResultListUser,
    type UserListParams as UserListParams,
    type UserAddParams as UserAddParams,
    type UserRemoveParams as UserRemoveParams,
  };
}
