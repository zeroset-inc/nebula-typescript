// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from 'nebula-typescript';

const client = new Nebula({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource entities', () => {
  // Mock server tests are disabled
  test.skip('resolveDuplicate: only required params', async () => {
    const responsePromise = client.entities.resolveDuplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      action: 'action',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('resolveDuplicate: required and optional params', async () => {
    const response = await client.entities.resolveDuplicate('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      action: 'action',
      public: true,
      target_entity_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveDuplicates', async () => {
    const responsePromise = client.entities.retrieveDuplicates('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveDuplicates: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.entities.retrieveDuplicates(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { public: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });
});
