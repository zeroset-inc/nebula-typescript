// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Nebula from 'nebula-typescript';

const client = new Nebula({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource memories', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.memories.create({
      collection_ref: 'collection_ref',
      engram_type: 'conversation',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.memories.create({
      collection_ref: 'collection_ref',
      engram_type: 'conversation',
      chunks: ['string'],
      ingestion_config: {
        app: {
          allowed_webhook_ips: ['string'],
          app_base_url: 'app_base_url',
          audio_lm: 'audio_lm',
          default_max_chunks_per_user: 0,
          default_max_collections_per_user: 0,
          default_max_documents_per_user: 0,
          default_max_upload_size: 0,
          extra_fields: { foo: 'bar' },
          fast_llm: 'fast_llm',
          max_upload_size_by_type: { foo: 0 },
          planning_llm: 'planning_llm',
          project_name: 'project_name',
          quality_llm: 'quality_llm',
          reasoning_llm: 'reasoning_llm',
          require_service_api_key: true,
          service_api_key: 'service_api_key',
          stripe_secret_key: 'stripe_secret_key',
          stripe_webhook_secret: 'stripe_webhook_secret',
          user_tools_path: 'user_tools_path',
          vlm: 'vlm',
          webhook_hmac_secret: 'webhook_hmac_secret',
          webhook_hmac_secret_previous: 'webhook_hmac_secret_previous',
          webhook_ip_validation_enabled: true,
          webhook_rate_limit_max_requests: 0,
          webhook_rate_limit_window_seconds: 0,
          webhook_signature_validation_enabled: true,
        },
        audio_transcription_model: 'audio_transcription_model',
        automatic_extraction: true,
        chunk_enrichment_settings: {
          chunk_enrichment_prompt: 'chunk_enrichment_prompt',
          enable_chunk_enrichment: true,
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
          n_chunks: 0,
        },
        chunk_overlap: 0,
        chunk_size: 0,
        chunking_strategy: 'recursive',
        chunks_for_document_summary: 0,
        document_summary_max_length: 0,
        document_summary_model: 'document_summary_model',
        document_summary_system_prompt: 'document_summary_system_prompt',
        document_summary_task_prompt: 'document_summary_task_prompt',
        excluded_parsers: ['string'],
        extra_fields: { foo: 'bar' },
        extra_parsers: { foo: 'bar' },
        max_concurrent_vlm_tasks: 0,
        parser_overrides: { foo: 'string' },
        provider: 'provider',
        skip_document_summary: true,
        vlm: 'vlm',
        vlm_batch_size: 0,
        vlm_max_tokens_to_sample: 0,
        vlm_ocr_one_page_per_chunk: true,
      },
      ingestion_mode: 'hi-res',
      messages: [
        {
          content: 'content',
          role: 'role',
          authority: 0,
          metadata: { foo: 'bar' },
        },
      ],
      metadata: { foo: 'bar' },
      name: 'name',
      raw_text: 'raw_text',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.memories.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
    const responsePromise = client.memories.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.memories.update(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          collection_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          merge_metadata: true,
          metadata: { foo: 'bar' },
          name: 'name',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.memories.list();
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
      client.memories.list(
        {
          collection_ids: ['string'],
          ids: ['string'],
          include_summary_embeddings: true,
          limit: 1,
          metadata_filters: 'metadata_filters',
          offset: 0,
          owner_only: true,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.memories.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('append: only required params', async () => {
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

  // Mock server tests are disabled
  test.skip('append: required and optional params', async () => {
    const response = await client.memories.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      chunks: ['string'],
      ingestion_config: {
        app: {
          allowed_webhook_ips: ['string'],
          app_base_url: 'app_base_url',
          audio_lm: 'audio_lm',
          default_max_chunks_per_user: 0,
          default_max_collections_per_user: 0,
          default_max_documents_per_user: 0,
          default_max_upload_size: 0,
          extra_fields: { foo: 'bar' },
          fast_llm: 'fast_llm',
          max_upload_size_by_type: { foo: 0 },
          planning_llm: 'planning_llm',
          project_name: 'project_name',
          quality_llm: 'quality_llm',
          reasoning_llm: 'reasoning_llm',
          require_service_api_key: true,
          service_api_key: 'service_api_key',
          stripe_secret_key: 'stripe_secret_key',
          stripe_webhook_secret: 'stripe_webhook_secret',
          user_tools_path: 'user_tools_path',
          vlm: 'vlm',
          webhook_hmac_secret: 'webhook_hmac_secret',
          webhook_hmac_secret_previous: 'webhook_hmac_secret_previous',
          webhook_ip_validation_enabled: true,
          webhook_rate_limit_max_requests: 0,
          webhook_rate_limit_window_seconds: 0,
          webhook_signature_validation_enabled: true,
        },
        audio_transcription_model: 'audio_transcription_model',
        automatic_extraction: true,
        chunk_enrichment_settings: {
          chunk_enrichment_prompt: 'chunk_enrichment_prompt',
          enable_chunk_enrichment: true,
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
          n_chunks: 0,
        },
        chunk_overlap: 0,
        chunk_size: 0,
        chunking_strategy: 'recursive',
        chunks_for_document_summary: 0,
        document_summary_max_length: 0,
        document_summary_model: 'document_summary_model',
        document_summary_system_prompt: 'document_summary_system_prompt',
        document_summary_task_prompt: 'document_summary_task_prompt',
        excluded_parsers: ['string'],
        extra_fields: { foo: 'bar' },
        extra_parsers: { foo: 'bar' },
        max_concurrent_vlm_tasks: 0,
        parser_overrides: { foo: 'string' },
        provider: 'provider',
        skip_document_summary: true,
        vlm: 'vlm',
        vlm_batch_size: 0,
        vlm_max_tokens_to_sample: 0,
        vlm_ocr_one_page_per_chunk: true,
      },
      ingestion_mode: 'hi-res',
      messages: [{ foo: 'bar' }],
      metadata: { foo: 'bar' },
      raw_text: 'raw_text',
    });
  });

  // Mock server tests are disabled
  test.skip('deduplicateEntities', async () => {
    const responsePromise = client.memories.deduplicateEntities('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deduplicateEntities: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.deduplicateEntities(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          automatic_clustering: true,
          automatic_deduplication: true,
          chunk_merge_count: 0,
          conversation_context_enabled: true,
          conversation_context_window_size: 0,
          conversation_summary_update_frequency: 0,
          entity_deduplication: {
            auto_merge_threshold: 0,
            candidate_pool_limit: 0,
            collection_scope: true,
            create_audit_relationships: true,
            cross_engram_deduplication: true,
            dedup_candidate_search_limit: 0,
            dedup_llm_per_chunk_limit: 0,
            dedup_max_concurrent_chunks: 0,
            dedup_timeout_seconds: 0,
            embedding_cache_enabled: true,
            enabled: true,
            link_threshold: 0,
            max_candidate_entities: 0,
            max_concurrent_llm_calls: 0,
            max_recursive_iterations: 0,
            merge_prompt_template: 'merge_prompt_template',
            preserve_entities: true,
            query_time_resolution: true,
            recursive_deduplication: true,
            retrieval_top_k: 0,
            semantic_similarity_threshold: 0,
            show_duplicate_relationships: true,
            strategy: 'strategy',
            use_engram_context: true,
            use_llm_for_merging: true,
            vector_doc_chunk_size: 0,
            vector_query_chunk_size: 0,
          },
          entity_types: ['string'],
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
          graph_entity_description_prompt: 'graph_entity_description_prompt',
          graph_extraction_prompt: 'graph_extraction_prompt',
          idle_check_interval_minutes: 0,
          idle_full_clustering: true,
          incremental_clustering: true,
          incremental_jaccard_filter: 0,
          incremental_jaccard_reuse_threshold: 0,
          incremental_min_cluster_size: 1,
          incremental_neighbor_hops: 0,
          incremental_structural_affinity_threshold: 0,
          max_concurrent_entities_per_extraction: 0,
          max_concurrent_relationships_per_extraction: 0,
          max_description_input_length: 0,
          max_knowledge_relationships: 0,
          relation_types: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('deleteByFilter: only required params', async () => {
    const responsePromise = client.memories.deleteByFilter({ body: { foo: 'bar' } });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteByFilter: required and optional params', async () => {
    const response = await client.memories.deleteByFilter({ body: { foo: 'bar' } });
  });

  // Mock server tests are disabled
  test.skip('deleteMultiple: only required params', async () => {
    const responsePromise = client.memories.deleteMultiple({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('deleteMultiple: required and optional params', async () => {
    const response = await client.memories.deleteMultiple({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });
  });

  // Mock server tests are disabled
  test.skip('downloadContent', async () => {
    const responsePromise = client.memories.downloadContent('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('downloadZip', async () => {
    const responsePromise = client.memories.downloadZip();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('downloadZip: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.downloadZip(
        {
          end_date: '2019-12-27T18:11:19.117Z',
          engram_ids: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          start_date: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('export', async () => {
    const responsePromise = client.memories.export();
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
      client.memories.export(
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
  test.skip('extractEntities', async () => {
    const responsePromise = client.memories.extractEntities('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('extractEntities: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.extractEntities(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          automatic_clustering: true,
          automatic_deduplication: true,
          chunk_merge_count: 0,
          conversation_context_enabled: true,
          conversation_context_window_size: 0,
          conversation_summary_update_frequency: 0,
          entity_deduplication: {
            auto_merge_threshold: 0,
            candidate_pool_limit: 0,
            collection_scope: true,
            create_audit_relationships: true,
            cross_engram_deduplication: true,
            dedup_candidate_search_limit: 0,
            dedup_llm_per_chunk_limit: 0,
            dedup_max_concurrent_chunks: 0,
            dedup_timeout_seconds: 0,
            embedding_cache_enabled: true,
            enabled: true,
            link_threshold: 0,
            max_candidate_entities: 0,
            max_concurrent_llm_calls: 0,
            max_recursive_iterations: 0,
            merge_prompt_template: 'merge_prompt_template',
            preserve_entities: true,
            query_time_resolution: true,
            recursive_deduplication: true,
            retrieval_top_k: 0,
            semantic_similarity_threshold: 0,
            show_duplicate_relationships: true,
            strategy: 'strategy',
            use_engram_context: true,
            use_llm_for_merging: true,
            vector_doc_chunk_size: 0,
            vector_query_chunk_size: 0,
          },
          entity_types: ['string'],
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
          graph_entity_description_prompt: 'graph_entity_description_prompt',
          graph_extraction_prompt: 'graph_extraction_prompt',
          idle_check_interval_minutes: 0,
          idle_full_clustering: true,
          incremental_clustering: true,
          incremental_jaccard_filter: 0,
          incremental_jaccard_reuse_threshold: 0,
          incremental_min_cluster_size: 1,
          incremental_neighbor_hops: 0,
          incremental_structural_affinity_threshold: 0,
          max_concurrent_entities_per_extraction: 0,
          max_concurrent_relationships_per_extraction: 0,
          max_description_input_length: 0,
          max_knowledge_relationships: 0,
          relation_types: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listChunks', async () => {
    const responsePromise = client.memories.listChunks('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listChunks: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.listChunks(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          include_vectors: true,
          limit: 1,
          offset: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('listCollections', async () => {
    const responsePromise = client.memories.listCollections('id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listCollections: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.memories.listCollections('id', { limit: 1, offset: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Nebula.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('search: only required params', async () => {
    const responsePromise = client.memories.search({ query: 'query' });
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
    const response = await client.memories.search({
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
