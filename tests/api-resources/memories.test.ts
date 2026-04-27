// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from '@nebula-ai/sdk';

const client = new Nebula({
  apiKey: 'My API Key',
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memories', () => {
  test('create', async () => {
    const responsePromise = client.memories.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve', async () => {
    const responsePromise = client.memories.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update', async () => {
    const responsePromise = client.memories.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list', async () => {
    const responsePromise = client.memories.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.list(
        {
          chunks_limit: 0,
          collection_ids: ['string', 'string'],
          ids: ['string'],
          limit: 1,
          metadata_filters: 'metadata_filters',
          offset: 0,
          owner_only: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.memories.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('append: only required params', async () => {
    const responsePromise = client.memories.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('append: required and optional params', async () => {
    const response = await client.memories.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      chunks: ['S0'],
      ingestion_config: {
        audio_transcription_model: 'audio_transcription_model',
        automatic_extraction: true,
        chunk_enrichment_settings: {
          chunk_enrichment_prompt: 'chunk_enrichment_prompt',
          enable_chunk_enrichment: true,
          n_chunks: 0,
        },
        chunk_overlap: 0,
        chunk_size: 0,
        chunking_strategy: 'chunking_strategy',
        excluded_parsers: ['string'],
        extra_parsers: { foo: 'bar' },
        max_concurrent_vlm_tasks: 0,
        parser_overrides: { foo: 'string' },
        provider: 'provider',
        vlm: 'vlm',
        vlm_batch_size: 0,
        vlm_max_tokens_to_sample: 0,
        vlm_ocr_one_page_per_chunk: true,
      },
      ingestion_mode: 'hi-res',
      messages: [
        {
          content: 'S0',
          role: 'user',
          authority: 0,
          metadata: { foo: 'bar' },
          parent_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          source_role_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          timestamp: '2019-12-27T18:11:19.117Z',
        },
      ],
      metadata: { foo: 'bar' },
      raw_text: 'raw_text',
    });
  });

  test('createUpload: only required params', async () => {
    const responsePromise = client.memories.createUpload({
      content_type: 'content_type',
      file_size: 0,
      filename: 'filename',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createUpload: required and optional params', async () => {
    const response = await client.memories.createUpload({
      content_type: 'content_type',
      file_size: 0,
      filename: 'filename',
    });
  });

  test('deleteMany: only required params', async () => {
    const responsePromise = client.memories.deleteMany({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteMany: required and optional params', async () => {
    const response = await client.memories.deleteMany({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
  });

  test('deleteUpload: only required params', async () => {
    const responsePromise = client.memories.deleteUpload({ s3_key: 's3_key' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteUpload: required and optional params', async () => {
    const response = await client.memories.deleteUpload({ s3_key: 's3_key' });
  });

  test('search', async () => {
    const responsePromise = client.memories.search({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
