// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from 'nebula-typescript';

const client = new Nebula({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource users', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.users.retrieve('550e8400-e29b-41d4-a716-446655440000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update', async () => {
    const responsePromise = client.users.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.update(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          bio: 'bio',
          email: 'dev@stainless.com',
          is_superuser: true,
          limits_overrides: { foo: 'bar' },
          metadata: { foo: 'string' },
          name: 'name',
          profile_picture: 'profile_picture',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.users.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.list(
        {
          ids: ['string'],
          limit: 1,
          offset: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.users.delete('550e8400-e29b-41d4-a716-446655440000');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.delete(
        '550e8400-e29b-41d4-a716-446655440000',
        { delete_vector_data: true, password: 'password' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('changePassword: only required params', async () => {
    const responsePromise = client.users.changePassword({
      current_password: 'current_password',
      new_password: 'new_password',
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
  test.skip('changePassword: required and optional params', async () => {
    const response = await client.users.changePassword({
      current_password: 'current_password',
      new_password: 'new_password',
    });
  });

  // Mock server tests are disabled
  test.skip('export', async () => {
    const responsePromise = client.users.export();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('export: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.export(
        {
          columns: ['string'],
          filters: { foo: 'bar' },
          include_header: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('fetchLimits', async () => {
    const responsePromise = client.users.fetchLimits('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getCurrentUser', async () => {
    const responsePromise = client.users.getCurrentUser();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('login: only required params', async () => {
    const responsePromise = client.users.login({ password: 'password', username: 'username' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('login: required and optional params', async () => {
    const response = await client.users.login({
      password: 'password',
      username: 'username',
      client_id: 'client_id',
      client_secret: 'client_secret',
      grant_type: 'password',
      scope: 'scope',
    });
  });

  // Mock server tests are disabled
  test.skip('logout', async () => {
    const responsePromise = client.users.logout();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('refreshToken: only required params', async () => {
    const responsePromise = client.users.refreshToken({ body: 'body' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('refreshToken: required and optional params', async () => {
    const response = await client.users.refreshToken({ body: 'body' });
  });

  // Mock server tests are disabled
  test.skip('register: only required params', async () => {
    const responsePromise = client.users.register({ email: 'dev@stainless.com', password: 'password' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('register: required and optional params', async () => {
    const response = await client.users.register({
      email: 'dev@stainless.com',
      password: 'password',
      bio: 'bio',
      is_verified: true,
      name: 'name',
      profile_picture: 'profile_picture',
    });
  });

  // Mock server tests are disabled
  test.skip('requestPasswordReset: only required params', async () => {
    const responsePromise = client.users.requestPasswordReset({ body: 'dev@stainless.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('requestPasswordReset: required and optional params', async () => {
    const response = await client.users.requestPasswordReset({ body: 'dev@stainless.com' });
  });

  // Mock server tests are disabled
  test.skip('resetPassword: only required params', async () => {
    const responsePromise = client.users.resetPassword({
      new_password: 'new_password',
      reset_token: 'reset_token',
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
  test.skip('resetPassword: required and optional params', async () => {
    const response = await client.users.resetPassword({
      new_password: 'new_password',
      reset_token: 'reset_token',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveMetrics', async () => {
    const responsePromise = client.users.retrieveMetrics();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieveMetrics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.users.retrieveMetrics({ days: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('sendVerificationEmail: only required params', async () => {
    const responsePromise = client.users.sendVerificationEmail({ body: 'dev@stainless.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('sendVerificationEmail: required and optional params', async () => {
    const response = await client.users.sendVerificationEmail({ body: 'dev@stainless.com' });
  });

  // Mock server tests are disabled
  test.skip('verifyEmail: only required params', async () => {
    const responsePromise = client.users.verifyEmail({
      email: 'dev@stainless.com',
      verification_code: 'verification_code',
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
  test.skip('verifyEmail: required and optional params', async () => {
    const response = await client.users.verifyEmail({
      email: 'dev@stainless.com',
      verification_code: 'verification_code',
    });
  });
});
