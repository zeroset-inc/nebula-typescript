// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ChunksAPI from './chunks';
import * as EngramsAPI from './collections/engrams';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Prompts extends APIResource {
  /**
   * Create a new prompt with the given configuration.
   *
   * This endpoint allows superusers to create a new prompt with a specified name,
   * template, and input types.
   */
  create(
    body: PromptCreateParams,
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.post('/v1/prompts', { body, ...options });
  }

  /**
   * Get a specific prompt by name, optionally with inputs and override.
   *
   * This endpoint retrieves a specific prompt and allows for optional inputs and
   * template override. Only superusers can access this endpoint.
   */
  retrieve(
    name: string,
    params: PromptRetrieveParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<PromptRetrieveResponse> {
    const { prompt_override, body } = params ?? {};
    return this._client.post(path`/v1/prompts/${name}`, {
      query: { prompt_override },
      body: body,
      ...options,
    });
  }

  /**
   * Update an existing prompt's template and/or input types.
   *
   * This endpoint allows superusers to update the template and input types of an
   * existing prompt.
   */
  update(
    name: string,
    body: PromptUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EngramsAPI.NebulaResultsGenericMessageResponse> {
    return this._client.put(path`/v1/prompts/${name}`, { body, ...options });
  }

  /**
   * List all available prompts.
   *
   * This endpoint retrieves a list of all prompts in the system. Only superusers can
   * access this endpoint.
   */
  list(options?: RequestOptions): APIPromise<PromptListResponse> {
    return this._client.get('/v1/prompts', options);
  }

  /**
   * Delete a prompt by name.
   *
   * This endpoint allows superusers to delete an existing prompt.
   */
  delete(name: string, options?: RequestOptions): APIPromise<ChunksAPI.NebulaResultsGenericBooleanResponse> {
    return this._client.delete(path`/v1/prompts/${name}`, options);
  }
}

export interface PromptResponse {
  id: string;

  created_at: string;

  input_types: { [key: string]: string };

  name: string;

  template: string;

  updated_at: string;
}

export interface PromptRetrieveResponse {
  results: PromptResponse;
}

export interface PromptListResponse {
  results: Array<PromptResponse>;

  total_entries: number;
}

export interface PromptCreateParams {
  /**
   * The name of the prompt
   */
  name: string;

  /**
   * The template string for the prompt
   */
  template: string;

  /**
   * A dictionary mapping input names to their types
   */
  input_types?: { [key: string]: string };
}

export interface PromptRetrieveParams {
  /**
   * Query param: Prompt override
   */
  prompt_override?: string | null;

  /**
   * Body param: Prompt inputs
   */
  body?: { [key: string]: string } | null;
}

export interface PromptUpdateParams {
  /**
   * A dictionary mapping input names to their types
   */
  input_types?: { [key: string]: string };

  /**
   * Updated prompt template
   */
  template?: string | null;
}

export declare namespace Prompts {
  export {
    type PromptResponse as PromptResponse,
    type PromptRetrieveResponse as PromptRetrieveResponse,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
  };
}
