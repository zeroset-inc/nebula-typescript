// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from '@nebula-ai/sdk';

const client = new Nebula({
  apiKey: 'My API Key',
  accessToken: 'My Access Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource snapshots', () => {
  test('export: only required params', async () => {
    const responsePromise = client.snapshots.export({
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

  test('export: required and optional params', async () => {
    const response = await client.snapshots.export({ collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
  });

  test('import: only required params', async () => {
    const responsePromise = client.snapshots.import({
      snapshot: { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', root_hash: 'root_hash' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('import: required and optional params', async () => {
    const response = await client.snapshots.import({
      snapshot: {
        collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        root_hash: 'root_hash',
        created_at: '2019-12-27T18:11:19.117Z',
        format_version: 0,
        generation: 0,
        graph: {
          entities: [
            {
              id: 'id',
              created_at: '2019-12-27T18:11:19.117Z',
              engram_id: 'engram_id',
              name: 'name',
              updated_at: '2019-12-27T18:11:19.117Z',
              category: 'category',
              chunk_ids: ['string'],
              collection_id: 'collection_id',
              description: 'description',
              fts_terms: { foo: 0 },
              metadata: { foo: 'bar' },
              relationship_count: 0,
            },
          ],
          entity_description_embeddings: {
            dim: 0,
            encoding: 'npy-base64',
            mask_b64: 'mask_b64',
            values_b64: 'values_b64',
          },
          relationship_description_embeddings: {
            dim: 0,
            encoding: 'npy-base64',
            mask_b64: 'mask_b64',
            values_b64: 'values_b64',
          },
          relationship_relation_embeddings: {
            dim: 0,
            encoding: 'npy-base64',
            mask_b64: 'mask_b64',
            values_b64: 'values_b64',
          },
          relationships: [
            {
              id: 'id',
              created_at: '2019-12-27T18:11:19.117Z',
              object_id: 'object_id',
              subject_id: 'subject_id',
              updated_at: '2019-12-27T18:11:19.117Z',
              category: 'category',
              chunk_ids: ['string'],
              collection_id: 'collection_id',
              description: 'description',
              engram_id: 'engram_id',
              inference_metadata: { foo: 'bar' },
              metadata: { foo: 'bar' },
              object: 'object',
              predicate: 'predicate',
              relationship_type: 'relationship_type',
              subject: 'subject',
              temporal_precision: 'temporal_precision',
              valid_span: { foo: 'bar' },
              weight: 0,
            },
          ],
        },
      },
    });
  });
});
