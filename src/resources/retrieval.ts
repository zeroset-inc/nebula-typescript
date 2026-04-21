// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as RetrievalAPI from './retrieval';
import * as ChunksAPI from './chunks';
import * as MemoriesAPI from './memories/memories';
import * as MetadataAPI from './memories/metadata';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Retrieval extends APIResource {
  /**
   * Engage with an intelligent agent for information retrieval, analysis, and
   * research.
   *
   * This endpoint offers two operating modes:
   *
   * - **RAG mode**: Standard retrieval-augmented generation for answering questions
   *   based on knowledge base
   * - **Research mode**: Advanced capabilities for deep analysis, reasoning, and
   *   computation
   *
   * ### RAG Mode (Default)
   *
   * The RAG mode provides fast, knowledge-based responses using:
   *
   * - Semantic and hybrid search capabilities
   * - Engram-level and chunk-level content retrieval
   * - Optional web search integration
   * - Source citation and evidence-based responses
   *
   * ### Research Mode
   *
   * The Research mode builds on RAG capabilities and adds:
   *
   * - A dedicated reasoning system for complex problem-solving
   * - Critique capabilities to identify potential biases or logical fallacies
   * - Python execution for computational analysis
   * - Multi-step reasoning for deeper exploration of topics
   *
   * ### Available Tools
   *
   * **RAG Tools:**
   *
   * - `search_file_knowledge`: Semantic/hybrid search on your ingested engrams
   * - `search_file_descriptions`: Search over file-level metadata
   * - `content`: Fetch entire engrams or chunk structures
   * - `web_search`: Query external search APIs for up-to-date information
   * - `web_scrape`: Scrape and extract content from specific web pages
   *
   * **Research Tools:**
   *
   * - `rag`: Leverage the underlying RAG agent for information retrieval
   * - `reasoning`: Call a dedicated model for complex analytical thinking
   * - `critique`: Analyze conversation history to identify flaws and biases
   * - `python_executor`: Execute Python code for complex calculations and analysis
   *
   * ### Streaming Output
   *
   * When streaming is enabled, the agent produces different event types:
   *
   * - `thinking`: Shows the model's step-by-step reasoning (when
   *   extended_thinking=true)
   * - `tool_call`: Shows when the agent invokes a tool
   * - `tool_result`: Shows the result of a tool call
   * - `citation`: Indicates when a citation is added to the response
   * - `message`: Streams partial tokens of the response
   * - `final_answer`: Contains the complete generated answer and structured
   *   citations
   *
   * ### Conversations
   *
   * Maintain context across multiple turns by including `conversation_id` in each
   * request. After your first call, store the returned `conversation_id` and include
   * it in subsequent calls. If no conversation name has already been set for the
   * conversation, the system will automatically assign one.
   *
   * @example
   * ```ts
   * const response = await client.retrieval.engageAgent();
   * ```
   */
  engageAgent(
    body: RetrievalEngageAgentParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RetrievalEngageAgentResponse> {
    return this._client.post('/v1/retrieval/agent', { body, ...options });
  }

  /**
   * Execute a RAG (Retrieval-Augmented Generation) query.
   *
   * This endpoint combines search results with language model generation to produce
   * accurate, contextually-relevant responses based on your engram corpus.
   *
   * **Features:**
   *
   * - Combines vector search, optional knowledge graph integration, and LLM
   *   generation
   * - Automatically cites sources with unique citation identifiers
   * - Supports both streaming and non-streaming responses
   * - Compatible with various LLM providers (OpenAI, Anthropic, etc.)
   * - Web search integration for up-to-date information
   *
   * **Search Configuration:** All search parameters from the search endpoint apply
   * here, including filters, hybrid search, and graph-enhanced search.
   *
   * **Generation Configuration:** Fine-tune the language model's behavior with
   * `rag_generation_config`:
   *
   * ```json
   * {
   *   "model": "openai/gpt-4.1-mini", // Model to use
   *   "temperature": 0.7, // Control randomness (0-1)
   *   "max_tokens": 1500, // Maximum output length
   *   "stream": true // Enable token streaming
   * }
   * ```
   *
   * **Model Support:**
   *
   * - OpenAI models (default)
   * - Anthropic Claude models (requires ANTHROPIC_API_KEY)
   * - Local models via Ollama
   * - Any provider supported by LiteLLM
   *
   * **Streaming Responses:** When `stream: true` is set, the endpoint returns
   * Server-Sent Events with the following types:
   *
   * - `search_results`: Initial search results from your engrams
   * - `message`: Partial tokens as they're generated
   * - `citation`: Citation metadata when sources are referenced
   * - `final_answer`: Complete answer with structured citations
   *
   * **Example Response:**
   *
   * ```json
   * {
   * "generated_answer": "DeepSeek-R1 is a model that demonstrates impressive performance...[1]",
   * "search_results": { ... },
   * "citations": [
   *     {
   *         "id": "cit.123456",
   *         "object": "citation",
   *         "payload": { ... }
   *     }
   * ]
   * }
   * ```
   *
   * @example
   * ```ts
   * const response = await client.retrieval.executeRagQuery({
   *   query: 'query',
   * });
   * ```
   */
  executeRagQuery(body: RetrievalExecuteRagQueryParams, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/v1/retrieval/rag', { body, ...options });
  }

  /**
   * Generate completions for a list of messages.
   *
   * This endpoint uses the language model to generate completions for the provided
   * messages. The generation process can be customized using the generation_config
   * parameter.
   *
   * The messages list should contain alternating user and assistant messages, with
   * an optional system message at the start. Each message should have a 'role' and
   * 'content'.
   *
   * @example
   * ```ts
   * const response = await client.retrieval.generateCompletions(
   *   { messages: [{ role: 'user' }] },
   * );
   * ```
   */
  generateCompletions(
    params: RetrievalGenerateCompletionsParams,
    options?: RequestOptions,
  ): APIPromise<RetrievalGenerateCompletionsResponse> {
    const { response_model, ...body } = params;
    return this._client.post('/v1/retrieval/completion', { query: { response_model }, body, ...options });
  }

  /**
   * Generate embeddings for the provided text using the specified model.
   *
   * This endpoint uses the language model to generate embeddings for the provided
   * text. The model parameter specifies the model to use for generating embeddings.
   *
   * @example
   * ```ts
   * const response = await client.retrieval.generateEmbeddings({
   *   body: 'body',
   * });
   * ```
   */
  generateEmbeddings(
    params: RetrievalGenerateEmbeddingsParams,
    options?: RequestOptions,
  ): APIPromise<RetrievalGenerateEmbeddingsResponse> {
    const { body } = params;
    return this._client.post('/v1/retrieval/embedding', { body: body, ...options });
  }

  /**
   * Perform a search query against vector and/or graph-based databases.
   *
   * **Search Modes:**
   *
   * - `basic`: Smaller type limits for faster searches.
   * - `advanced`: Larger type limits for comprehensive results.
   * - `custom`: Complete control over search settings. Always uses hybrid search.
   *
   * **Hybrid Search (Always Enabled):** All searches use hybrid mode combining
   * semantic and full-text search. Control the balance with weights:
   *
   * ```json
   * {
   *   "semantic_weight": 5.0, // Weight for semantic search (default: 5.0)
   *   "fulltext_weight": 1.0 // Weight for full-text search (default: 1.0)
   * }
   * ```
   *
   * Set `semantic_weight: 0` for pure full-text search, or `fulltext_weight: 0` for
   * pure semantic search.
   *
   * **Filters:** Apply filters directly inside `search_settings.filters`. For
   * example:
   *
   * ```json
   * {
   *   "filters": { "engram_id": { "$eq": "e43864f5-a36f-548e-aacd-6f8d48b30c7f" } }
   * }
   * ```
   *
   * Supported operators: `$eq`, `$neq`, `$gt`, `$gte`, `$lt`, `$lte`, `$like`,
   * `$ilike`, `$in`, `$nin`.
   *
   * **Result Limits:** Control the total number of results returned:
   *
   * ```json
   * {
   *   "limit": 20
   * }
   * ```
   *
   * **Graph-Enhanced Search:** Knowledge graph integration is enabled automatically
   * and managed internally for optimal performance.
   *
   * **Advanced Filtering:** Use complex filters to narrow down results by metadata
   * fields or engram properties:
   *
   * ```json
   * {
   *   "filters": {
   *     "$and": [
   *       { "engram_type": { "$eq": "pdf" } },
   *       { "metadata.year": { "$gt": 2020 } }
   *     ]
   *   }
   * }
   * ```
   *
   * **Results:** The response includes vector search results and optional graph
   * search results. Each result contains the matched text, engram ID, and relevance
   * score.
   *
   * @example
   * ```ts
   * const response = await client.retrieval.search({
   *   query: 'query',
   * });
   * ```
   */
  search(body: RetrievalSearchParams, options?: RequestOptions): APIPromise<RetrievalSearchResponse> {
    return this._client.post('/v1/retrieval/search', { body, ...options });
  }
}

export interface GenerationConfig {
  add_generation_kwargs?: { [key: string]: unknown } | null;

  api_base?: string | null;

  /**
   * Flag to enable extended thinking mode (for Anthropic providers)
   */
  extended_thinking?: boolean;

  functions?: Array<{ [key: string]: unknown }> | null;

  max_tokens_to_sample?: number;

  model?: string | null;

  /**
   * Effort level for internal reasoning when extended thinking mode is enabled,
   * `low`, `medium`, or `high`.Only applicable to OpenAI providers.
   */
  reasoning_effort?: string | null;

  response_format?: { [key: string]: unknown } | unknown | null;

  stream?: boolean;

  temperature?: number;

  /**
   * Token budget for internal reasoning when extended thinking mode is enabled. Must
   * be less than max_tokens_to_sample.
   */
  thinking_budget?: number | null;

  tools?: Array<{ [key: string]: unknown }> | null;

  top_p?: number | null;

  /**
   * Verbosity level for GPT-5 models, controls output token count. Options: `low`,
   * `medium`, or `high`. Only applicable to GPT-5 models.
   */
  verbosity?: string | null;
}

export interface Message {
  role: 'system' | 'user' | 'assistant' | 'function' | 'tool' | (string & {});

  content?: unknown;

  function_call?: { [key: string]: unknown } | null;

  image_data?: { [key: string]: string } | null;

  image_url?: string | null;

  metadata?: { [key: string]: unknown } | null;

  name?: string | null;

  structured_content?: Array<{ [key: string]: unknown }> | null;

  tool_call_id?: string | null;

  tool_calls?: Array<{ [key: string]: unknown }> | null;
}

export interface WebPageSearchResult {
  id: string;

  position: number;

  date?: string | null;

  link?: string | null;

  sitelinks?: Array<{ [key: string]: unknown }> | null;

  snippet?: string | null;

  title?: string | null;

  type?: string;
}

export interface RetrievalEngageAgentResponse {
  results: RetrievalEngageAgentResponse.Results;
}

export namespace RetrievalEngageAgentResponse {
  export interface Results {
    /**
     * The conversation ID for the RAG agent response
     */
    conversation_id: string;

    /**
     * Agent response messages
     */
    messages: Array<RetrievalAPI.Message>;
  }
}

export type RetrievalExecuteRagQueryResponse = unknown;

export interface RetrievalGenerateCompletionsResponse {
  results: RetrievalGenerateCompletionsResponse.Results;
}

export namespace RetrievalGenerateCompletionsResponse {
  export interface Results {
    id: string;

    model: string;

    object: 'chat.completion' | 'response';

    choices?: Array<Results.Choice> | null;

    created?: number | null;

    created_at?: number | null;

    metadata?: { [key: string]: unknown } | null;

    output?: Array<unknown> | null;

    reasoning?: { [key: string]: unknown } | null;

    service_tier?: 'auto' | 'default' | 'scale' | 'flex' | 'priority' | null;

    status?: string | null;

    system_fingerprint?: string | null;

    usage?: unknown;
  }

  export namespace Results {
    export interface Choice {
      index: number;

      message: Choice.Message;

      finish_reason?:
        | 'stop'
        | 'length'
        | 'tool_calls'
        | 'content_filter'
        | 'function_call'
        | 'max_tokens'
        | null;
    }

    export namespace Choice {
      export interface Message {
        role: 'assistant';

        content?: string | null;

        function_call?: Message.FunctionCall | null;

        refusal?: string | null;

        structured_content?: Array<{ [key: string]: unknown }> | null;

        tool_calls?: Array<Message.ToolCall> | null;
      }

      export namespace Message {
        export interface FunctionCall {
          arguments: string;

          name: string;
        }

        export interface ToolCall {
          id: string;

          function: ToolCall.Function;

          type: 'function';
        }

        export namespace ToolCall {
          export interface Function {
            arguments: string;

            name: string;
          }
        }
      }
    }
  }
}

export interface RetrievalGenerateEmbeddingsResponse {
  results: Array<number>;
}

export interface RetrievalSearchResponse {
  /**
   * Result of an aggregate search operation.
   */
  results: RetrievalSearchResponse.Results;
}

export namespace RetrievalSearchResponse {
  /**
   * Result of an aggregate search operation.
   */
  export interface Results {
    chunk_search_results?: Array<ChunksAPI.ChunkSearchResult> | null;

    document_search_results?: Array<MetadataAPI.EngramResponse> | null;

    generic_tool_result?: unknown;

    graph_search_results?: Array<Results.GraphSearchResult> | null;

    web_page_search_results?: Array<RetrievalAPI.WebPageSearchResult> | null;

    web_search_results?: Array<Results.WebSearchResult> | null;
  }

  export namespace Results {
    export interface GraphSearchResult {
      id: string;

      content:
        | GraphSearchResult.GraphEntityResult
        | GraphSearchResult.GraphRelationshipResult
        | GraphSearchResult.GraphCommunityResult
        | GraphSearchResult.GraphSpeakerResult;

      chunk_ids?: Array<string> | null;

      display_name?: string | null;

      engram_id?: string | null;

      metadata?: { [key: string]: unknown };

      owner_id?: string | null;

      result_type?: 'entity' | 'relationship' | 'community' | 'speaker' | null;

      score?: number | null;

      source_role?: string | null;

      timestamp?: string | null;
    }

    export namespace GraphSearchResult {
      export interface GraphEntityResult {
        description: string;

        name: string;

        id?: string | null;

        metadata?: { [key: string]: unknown } | null;
      }

      export interface GraphRelationshipResult {
        object: string;

        predicate: string;

        subject: string;

        id?: string | null;

        description?: string | null;

        metadata?: { [key: string]: unknown } | null;

        object_id?: string | null;

        score?: number | null;

        subject_id?: string | null;
      }

      export interface GraphCommunityResult {
        name: string;

        summary: string;

        id?: string | null;

        metadata?: { [key: string]: unknown } | null;
      }

      export interface GraphSpeakerResult {
        name: string;

        id?: string | null;

        authority_score?: number | null;

        description?: string | null;

        metadata?: { [key: string]: unknown } | null;
      }
    }

    export interface WebSearchResult {
      organic_results?: Array<RetrievalAPI.WebPageSearchResult>;

      people_also_ask?: Array<WebSearchResult.PeopleAlsoAsk>;

      related_searches?: Array<WebSearchResult.RelatedSearch>;
    }

    export namespace WebSearchResult {
      export interface PeopleAlsoAsk {
        id: string;

        link: string;

        question: string;

        snippet: string;

        title: string;

        type?: string;
      }

      export interface RelatedSearch {
        id: string;

        query: string;

        type?: string;
      }
    }
  }
}

export interface RetrievalEngageAgentParams {
  /**
   * ID of the conversation
   */
  conversation_id?: string | null;

  /**
   * Pass engram titles from search results into the LLM context window.
   */
  include_title_if_available?: boolean;

  /**
   * Maximum length of returned tool context
   */
  max_tool_context_length?: number | null;

  /**
   * Current message to process
   */
  message?: Message | null;

  /**
   * @deprecated List of messages (deprecated, use message instead)
   */
  messages?: Array<Message> | null;

  /**
   * Mode to use for generation: 'rag' for standard retrieval or 'research' for deep
   * analysis with reasoning capabilities
   */
  mode?: 'rag' | 'research' | null;

  /**
   * If true, the system will automatically assign a conversation name if not already
   * specified previously.
   */
  needs_initial_conversation_name?: boolean | null;

  /**
   * Configuration for RAG generation in 'rag' mode
   */
  rag_generation_config?: GenerationConfig;

  /**
   * List of tools to enable for RAG mode. Available tools: search_file_knowledge,
   * get_file_content, web_search, web_scrape, search_file_descriptions
   */
  rag_tools?: Array<
    'web_search' | 'web_scrape' | 'search_file_descriptions' | 'search_file_knowledge' | 'get_file_content'
  > | null;

  /**
   * Configuration for generation in 'research' mode. If not provided but
   * mode='research', rag_generation_config will be used with appropriate model
   * overrides.
   */
  research_generation_config?: GenerationConfig | null;

  /**
   * List of tools to enable for Research mode. Available tools: rag, reasoning,
   * critique, python_executor
   */
  research_tools?: Array<'rag' | 'reasoning' | 'critique' | 'python_executor'> | null;

  /**
   * Graph search algorithm: 'fast' (simple BFS) or 'super' (SuperBFS with
   * contextualization, default).
   */
  search_mode?: MemoriesAPI.SearchMode;

  /**
   * Simplified search settings with automatic hybrid search and type-specific
   * limits.
   */
  search_settings?: ChunksAPI.SearchSettings | null;

  /**
   * Optional custom prompt to override default
   */
  task_prompt?: string | null;

  /**
   * Use extended prompt for generation
   */
  use_system_context?: boolean | null;
}

export interface RetrievalExecuteRagQueryParams {
  query: string;

  /**
   * Include engram titles in responses when available
   */
  include_title_if_available?: boolean;

  /**
   * Include web search results provided to the LLM.
   */
  include_web_search?: boolean;

  /**
   * Configuration for RAG generation
   */
  rag_generation_config?: GenerationConfig;

  /**
   * Graph search algorithm selection:
   *
   * `fast`: Fast BFS graph traversal (max_depth=3, simple scoring) `super`: SuperBFS
   * with set transformers (max_depth=3, contextualized scoring, default)
   *
   * All modes now use depth=3 for optimal speed + relevance balance. All search
   * settings can be controlled via `search_settings` regardless of mode.
   */
  search_mode?: MemoriesAPI.SearchMode;

  /**
   * Simplified search settings with automatic hybrid search and type-specific
   * limits.
   */
  search_settings?: ChunksAPI.SearchSettings | null;

  /**
   * Optional custom prompt to override default
   */
  task_prompt?: string | null;
}

export interface RetrievalGenerateCompletionsParams {
  /**
   * Body param: List of messages to generate completion for
   */
  messages: Array<Message>;

  /**
   * Query param
   */
  response_model?: unknown;

  /**
   * Body param: Configuration for text generation
   */
  generation_config?: GenerationConfig;
}

export interface RetrievalGenerateEmbeddingsParams {
  /**
   * Text to generate embeddings for
   */
  body: string;
}

export interface RetrievalSearchParams {
  /**
   * Search query to find relevant engrams
   */
  query: string;

  /**
   * Graph search algorithm selection:
   *
   * `fast`: Fast BFS graph traversal (max_depth=3, simple scoring) `super`: SuperBFS
   * with set transformers (max_depth=3, contextualized scoring, default)
   *
   * All modes now use depth=3 for optimal speed + relevance balance. All search
   * settings can be controlled via `search_settings` regardless of mode.
   */
  search_mode?: MemoriesAPI.SearchMode;

  /**
   * Simplified search settings with automatic hybrid search and type-specific
   * limits.
   */
  search_settings?: ChunksAPI.SearchSettings | null;
}

export declare namespace Retrieval {
  export {
    type GenerationConfig as GenerationConfig,
    type Message as Message,
    type WebPageSearchResult as WebPageSearchResult,
    type RetrievalEngageAgentResponse as RetrievalEngageAgentResponse,
    type RetrievalExecuteRagQueryResponse as RetrievalExecuteRagQueryResponse,
    type RetrievalGenerateCompletionsResponse as RetrievalGenerateCompletionsResponse,
    type RetrievalGenerateEmbeddingsResponse as RetrievalGenerateEmbeddingsResponse,
    type RetrievalSearchResponse as RetrievalSearchResponse,
    type RetrievalEngageAgentParams as RetrievalEngageAgentParams,
    type RetrievalExecuteRagQueryParams as RetrievalExecuteRagQueryParams,
    type RetrievalGenerateCompletionsParams as RetrievalGenerateCompletionsParams,
    type RetrievalGenerateEmbeddingsParams as RetrievalGenerateEmbeddingsParams,
    type RetrievalSearchParams as RetrievalSearchParams,
  };
}
