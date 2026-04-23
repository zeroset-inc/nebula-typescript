// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from '@nebula-ai/sdk';

const client = new Nebula({
  apiKey: 'My API Key',
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sources', () => {
  test('update: only required params', async () => {
    const responsePromise = client.sources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      content: 'content',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.sources.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      content: 'content',
      collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      metadata: { foo: 'bar' },
    });
  });

  test('list', async () => {
    const responsePromise = client.sources.list();
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
      client.sources.list(
        {
          include_vectors: true,
          limit: 1,
          metadata_filter: 'metadata_filter',
          offset: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.sources.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sources.delete(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  test('search: only required params', async () => {
    const responsePromise = client.sources.search({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('search: required and optional params', async () => {
    const response = await client.sources.search({
      query: 'query',
      search_settings: {
        effort: 'auto',
        enable_conceptual_expansion: true,
        filters: { foo: 'bar' },
        fulltext_weight: 0.2,
        graph_settings: { foo: 'bar' },
        has_pruning_gate: true,
        include_scores: true,
        semantic_weight: 0.8,
        verbose: false,
      },
    });
  });
});
