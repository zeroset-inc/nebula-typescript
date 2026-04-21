// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from 'nebula';

const client = new Nebula({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metadata', () => {
  // Mock server tests are disabled
  test.skip('append: only required params', async () => {
    const responsePromise = client.memories.metadata.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [{ foo: 'bar' }],
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
  test.skip('append: required and optional params', async () => {
    const response = await client.memories.metadata.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [{ foo: 'bar' }],
    });
  });

  // Mock server tests are disabled
  test.skip('replace: only required params', async () => {
    const responsePromise = client.memories.metadata.replace('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [{ foo: 'bar' }],
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
  test.skip('replace: required and optional params', async () => {
    const response = await client.memories.metadata.replace('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      body: [{ foo: 'bar' }],
    });
  });
});
