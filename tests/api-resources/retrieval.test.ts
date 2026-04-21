// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from 'nebula';

const client = new Nebula({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource retrieval', () => {
  // Mock server tests are disabled
  test.skip('engageAgent', async () => {
    const responsePromise = client.retrieval.engageAgent();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('engageAgent: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.retrieval.engageAgent(
        {
          conversation_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          include_title_if_available: true,
          max_tool_context_length: 0,
          message: {
            role: 'user',
            content: 'This is a test message.',
            function_call: { foo: 'bar' },
            image_data: { foo: 'string' },
            image_url: 'image_url',
            metadata: { foo: 'bar' },
            name: 'name',
            structured_content: [{ foo: 'bar' }],
            tool_call_id: 'tool_call_id',
            tool_calls: [{ foo: 'bar' }],
          },
          messages: [
            {
              role: 'user',
              content: 'This is a test message.',
              function_call: { foo: 'bar' },
              image_data: { foo: 'string' },
              image_url: 'image_url',
              metadata: { foo: 'bar' },
              name: 'name',
              structured_content: [{ foo: 'bar' }],
              tool_call_id: 'tool_call_id',
              tool_calls: [{ foo: 'bar' }],
            },
          ],
          mode: 'rag',
          needs_initial_conversation_name: true,
          rag_generation_config: {
            add_generation_kwargs: { foo: 'bar' },
            api_base: 'api_base',
            extended_thinking: true,
            functions: [{ foo: 'bar' }],
            max_tokens_to_sample: 4096,
            model: 'openai/gpt-4.1',
            reasoning_effort: 'reasoning_effort',
            response_format: { foo: 'bar' },
            stream: false,
            temperature: 0,
            thinking_budget: 0,
            tools: [{ foo: 'bar' }],
            top_p: 1,
            verbosity: 'verbosity',
          },
          rag_tools: ['web_search'],
          research_generation_config: {
            add_generation_kwargs: { foo: 'bar' },
            api_base: 'api_base',
            extended_thinking: true,
            functions: [{ foo: 'bar' }],
            max_tokens_to_sample: 4096,
            model: 'openai/gpt-4.1',
            reasoning_effort: 'reasoning_effort',
            response_format: { foo: 'bar' },
            stream: false,
            temperature: 0,
            thinking_budget: 0,
            tools: [{ foo: 'bar' }],
            top_p: 1,
            verbosity: 'verbosity',
          },
          research_tools: ['rag'],
          search_mode: 'fast',
          search_settings: {
            enable_conceptual_expansion: true,
            filters: { category: 'bar' },
            fulltext_weight: 1,
            include_metadatas: true,
            include_scores: true,
            limit: 20,
            search_mode: 'search_mode',
            semantic_weight: 5,
          },
          task_prompt: 'task_prompt',
          use_system_context: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('executeRagQuery: only required params', async () => {
    const responsePromise = client.retrieval.executeRagQuery({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('executeRagQuery: required and optional params', async () => {
    const response = await client.retrieval.executeRagQuery({
      query: 'query',
      include_title_if_available: true,
      include_web_search: true,
      rag_generation_config: {
        add_generation_kwargs: { foo: 'bar' },
        api_base: 'api_base',
        extended_thinking: true,
        functions: [{ foo: 'bar' }],
        max_tokens_to_sample: 4096,
        model: 'openai/gpt-4.1',
        reasoning_effort: 'reasoning_effort',
        response_format: { foo: 'bar' },
        stream: false,
        temperature: 0,
        thinking_budget: 0,
        tools: [{ foo: 'bar' }],
        top_p: 1,
        verbosity: 'verbosity',
      },
      search_mode: 'fast',
      search_settings: {
        enable_conceptual_expansion: true,
        filters: { category: 'bar' },
        fulltext_weight: 1,
        include_metadatas: true,
        include_scores: true,
        limit: 20,
        search_mode: 'search_mode',
        semantic_weight: 5,
      },
      task_prompt: 'task_prompt',
    });
  });

  // Mock server tests are disabled
  test.skip('generateCompletions: only required params', async () => {
    const responsePromise = client.retrieval.generateCompletions({ messages: [{ role: 'user' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('generateCompletions: required and optional params', async () => {
    const response = await client.retrieval.generateCompletions({
      messages: [
        {
          role: 'user',
          content: 'This is a test message.',
          function_call: { foo: 'bar' },
          image_data: { foo: 'string' },
          image_url: 'image_url',
          metadata: { foo: 'bar' },
          name: 'name',
          structured_content: [{ foo: 'bar' }],
          tool_call_id: 'tool_call_id',
          tool_calls: [{ foo: 'bar' }],
        },
      ],
      response_model: {},
      generation_config: {
        add_generation_kwargs: { foo: 'bar' },
        api_base: 'api_base',
        extended_thinking: true,
        functions: [{ foo: 'bar' }],
        max_tokens_to_sample: 4096,
        model: 'openai/gpt-4.1',
        reasoning_effort: 'reasoning_effort',
        response_format: { foo: 'bar' },
        stream: false,
        temperature: 0,
        thinking_budget: 0,
        tools: [{ foo: 'bar' }],
        top_p: 1,
        verbosity: 'verbosity',
      },
    });
  });

  // Mock server tests are disabled
  test.skip('generateEmbeddings: only required params', async () => {
    const responsePromise = client.retrieval.generateEmbeddings({ body: 'body' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('generateEmbeddings: required and optional params', async () => {
    const response = await client.retrieval.generateEmbeddings({ body: 'body' });
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.retrieval.search({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('search: required and optional params', async () => {
    const response = await client.retrieval.search({
      query: 'query',
      search_mode: 'fast',
      search_settings: {
        enable_conceptual_expansion: true,
        filters: { category: 'bar' },
        fulltext_weight: 1,
        include_metadatas: true,
        include_scores: true,
        limit: 20,
        search_mode: 'search_mode',
        semantic_weight: 5,
      },
    });
  });
});
