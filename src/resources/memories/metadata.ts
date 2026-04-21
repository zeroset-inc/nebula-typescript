// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Metadata extends APIResource {
  /**
   * Appends metadata to an engram. This endpoint allows adding new metadata fields
   * or updating existing ones.
   *
   * @example
   * ```ts
   * const nebulaResultsEngramResponse =
   *   await client.memories.metadata.append(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { body: [{ foo: 'bar' }] },
   *   );
   * ```
   */
  append(
    id: string,
    params: MetadataAppendParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsEngramResponse> {
    const { body } = params;
    return this._client.patch(path`/v1/memories/${id}/metadata`, { body: body, ...options });
  }

  /**
   * Replaces metadata in an engram. This endpoint allows overwriting existing
   * metadata fields.
   *
   * @example
   * ```ts
   * const nebulaResultsEngramResponse =
   *   await client.memories.metadata.replace(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { body: [{ foo: 'bar' }] },
   *   );
   * ```
   */
  replace(
    id: string,
    params: MetadataReplaceParams,
    options?: RequestOptions,
  ): APIPromise<NebulaResultsEngramResponse> {
    const { body } = params;
    return this._client.put(path`/v1/memories/${id}/metadata`, { body: body, ...options });
  }
}

/**
 * Base class for engram information handling.
 */
export interface EngramResponse {
  id: string;

  collection_ids: Array<string>;

  /**
   * Types of file formats that can be stored as engrams.
   */
  document_type:
    | 'mp3'
    | 'csv'
    | 'eml'
    | 'msg'
    | 'p7s'
    | 'epub'
    | 'xls'
    | 'xlsx'
    | 'html'
    | 'htm'
    | 'bmp'
    | 'heic'
    | 'jpeg'
    | 'png'
    | 'tiff'
    | 'jpg'
    | 'svg'
    | 'md'
    | 'org'
    | 'odt'
    | 'pdf'
    | 'txt'
    | 'json'
    | 'ppt'
    | 'pptx'
    | 'rst'
    | 'rtf'
    | 'tsv'
    | 'gif'
    | 'doc'
    | 'docx'
    | 'py'
    | 'js'
    | 'ts'
    | 'css';

  /**
   * Types of engrams - broader categories that include documents and conversations.
   */
  engram_type: 'document' | 'conversation';

  metadata: { [key: string]: unknown };

  owner_id: string;

  size_in_bytes: number | null;

  version: string;

  chunks?: Array<unknown> | null;

  created_at?: string | null;

  /**
   * Status of graph creation per document.
   */
  extraction_status?: 'pending' | 'processing' | 'success' | 'enriched' | 'failed';

  ingestion_attempt_number?: number | null;

  /**
   * Status of document processing.
   */
  ingestion_status?:
    | 'pending'
    | 'parsing'
    | 'extracting'
    | 'chunking'
    | 'embedding'
    | 'augmenting'
    | 'storing'
    | 'enriching'
    | 'failed'
    | 'success';

  summary?: string | null;

  summary_embedding?: Array<number> | null;

  text?: string | null;

  title?: string | null;

  total_tokens?: number | null;

  updated_at?: string | null;
}

export interface NebulaResultsEngramResponse {
  /**
   * Base class for engram information handling.
   */
  results: EngramResponse;
}

export interface MetadataAppendParams {
  /**
   * Metadata to append to the engram.
   */
  body: Array<{ [key: string]: unknown }>;
}

export interface MetadataReplaceParams {
  /**
   * Metadata to append to the engram.
   */
  body: Array<{ [key: string]: unknown }>;
}

export declare namespace Metadata {
  export {
    type EngramResponse as EngramResponse,
    type NebulaResultsEngramResponse as NebulaResultsEngramResponse,
    type MetadataAppendParams as MetadataAppendParams,
    type MetadataReplaceParams as MetadataReplaceParams,
  };
}
