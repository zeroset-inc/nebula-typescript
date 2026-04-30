// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'health',
    endpoint: '/v1/health',
    httpMethod: 'get',
    summary: 'Health Check',
    description: 'Health Check',
    stainlessPath: '(resource) $client > (method) health',
    qualified: 'client.health',
    response: '{ results: { message: string; id?: string; memory_id?: string; }; }',
    markdown:
      "## health\n\n`client.health(): { results: object; }`\n\n**get** `/v1/health`\n\nHealth Check\n\n### Returns\n\n- `{ results: { message: string; id?: string; memory_id?: string; }; }`\n\n  - `results: { message: string; id?: string; memory_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.health();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.health',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.health();\n\nconsole.log(response.results);",
      },
      python: {
        method: 'health',
        example:
          'from nebula import Nebula\n\nclient = Nebula()\nresponse = client.health()\nprint(response.results)',
      },
      http: {
        example: 'curl https://api.trynebula.ai/v1/health',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/collections',
    httpMethod: 'post',
    summary: 'Create a new collection',
    description:
      'Create a new collection and automatically add the creating user\nto it.\n\nThis endpoint allows authenticated users to create a new collection\nwith a specified name and optional description. The user creating\nthe collection is automatically added as a member.',
    stainlessPath: '(resource) collections > (method) create',
    qualified: 'client.collections.create',
    params: ['name: string;', 'description?: string;', 'workspace_id?: string;'],
    response:
      '{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }',
    markdown:
      "## create\n\n`client.collections.create(name: string, description?: string, workspace_id?: string): { results: object; }`\n\n**post** `/v1/collections`\n\nCreate a new collection and automatically add the creating user\nto it.\n\nThis endpoint allows authenticated users to create a new collection\nwith a specified name and optional description. The user creating\nthe collection is automatically added as a member.\n\n### Parameters\n\n- `name: string`\n\n- `description?: string`\n\n- `workspace_id?: string`\n\n### Returns\n\n- `{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }`\n\n  - `results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst collection = await client.collections.create({ name: 'name' });\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.create',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.create({ name: 'name' });\n\nconsole.log(collection.results);",
      },
      python: {
        method: 'collections.create',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\ncollection = client.collections.create(\n    name="name",\n)\nprint(collection.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/collections \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "name": "name"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/collections',
    httpMethod: 'get',
    summary: 'List collections',
    description:
      'Returns a paginated list of collections the authenticated user\nhas access to.\n\nResults can be filtered by providing specific collection IDs.\nRegular users will only see collections they own or have access to.\nSuperusers can see all collections.\n\nThe collections are returned in order of last modification, with\nmost recent first.',
    stainlessPath: '(resource) collections > (method) list',
    qualified: 'client.collections.list',
    params: [
      'ids?: string[];',
      'limit?: number;',
      'name?: string;',
      'offset?: number;',
      'owner_only?: boolean;',
      'workspace_id?: string;',
    ],
    response:
      '{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }[]; total_entries: number; }',
    markdown:
      "## list\n\n`client.collections.list(ids?: string[], limit?: number, name?: string, offset?: number, owner_only?: boolean, workspace_id?: string): { results: object[]; total_entries: number; }`\n\n**get** `/v1/collections`\n\nReturns a paginated list of collections the authenticated user\nhas access to.\n\nResults can be filtered by providing specific collection IDs.\nRegular users will only see collections they own or have access to.\nSuperusers can see all collections.\n\nThe collections are returned in order of last modification, with\nmost recent first.\n\n### Parameters\n\n- `ids?: string[]`\n  A list of collection IDs to retrieve. If not provided, all collections will be returned.\n\n- `limit?: number`\n  Specifies a limit on the number of objects to return, ranging between 1 and 100. Defaults to 100.\n\n- `name?: string`\n  Filter collections by name (case-insensitive exact match).\n\n- `offset?: number`\n  Specifies the number of objects to skip. Defaults to 0.\n\n- `owner_only?: boolean`\n  If true, only returns collections owned by the user, not all accessible collections.\n\n- `workspace_id?: string`\n  Filter by workspace ID. Pass a UUID to scope to a workspace, or omit for all.\n\n### Returns\n\n- `{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }[]; total_entries: number; }`\n\n  - `results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }[]`\n  - `total_entries: number`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst collections = await client.collections.list();\n\nconsole.log(collections);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.list',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collections = await client.collections.list();\n\nconsole.log(collections.results);",
      },
      python: {
        method: 'collections.list',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\ncollections = client.collections.list()\nprint(collections.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/collections \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/collections/{id}',
    httpMethod: 'get',
    summary: 'Get collection details',
    description:
      'Get details of a specific collection.\n\nThis endpoint retrieves detailed information about a single\ncollection identified by its UUID. The user must have access to the\ncollection to view its details.',
    stainlessPath: '(resource) collections > (method) retrieve',
    qualified: 'client.collections.retrieve',
    params: ['id: string;'],
    response:
      '{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }',
    markdown:
      "## retrieve\n\n`client.collections.retrieve(id: string): { results: object; }`\n\n**get** `/v1/collections/{id}`\n\nGet details of a specific collection.\n\nThis endpoint retrieves detailed information about a single\ncollection identified by its UUID. The user must have access to the\ncollection to view its details.\n\n### Parameters\n\n- `id: string`\n  The unique identifier of the collection\n\n### Returns\n\n- `{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }`\n\n  - `results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst collection = await client.collections.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.retrieve',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection.results);",
      },
      python: {
        method: 'collections.retrieve',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\ncollection = client.collections.retrieve(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(collection.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/collections/$ID \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/collections/{id}',
    httpMethod: 'post',
    summary: 'Update collection',
    description:
      "Update an existing collection's configuration.\n\nThis endpoint allows updating the name, description, and access settings of an\nexisting collection. The user must have appropriate permissions to\nmodify the collection.",
    stainlessPath: '(resource) collections > (method) update',
    qualified: 'client.collections.update',
    params: [
      'id: string;',
      'access_tier?: string;',
      'description?: string;',
      'generate_description?: boolean;',
      'name?: string;',
    ],
    response:
      '{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }',
    markdown:
      "## update\n\n`client.collections.update(id: string, access_tier?: string, description?: string, generate_description?: boolean, name?: string): { results: object; }`\n\n**post** `/v1/collections/{id}`\n\nUpdate an existing collection's configuration.\n\nThis endpoint allows updating the name, description, and access settings of an\nexisting collection. The user must have appropriate permissions to\nmodify the collection.\n\n### Parameters\n\n- `id: string`\n  The unique identifier of the collection to update\n\n- `access_tier?: string`\n\n- `description?: string`\n\n- `generate_description?: boolean`\n\n- `name?: string`\n\n### Returns\n\n- `{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }`\n\n  - `results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst collection = await client.collections.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.update',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection.results);",
      },
      python: {
        method: 'collections.update',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\ncollection = client.collections.update(\n    id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(collection.results)',
      },
      http: {
        example:
          "curl https://api.trynebula.ai/v1/collections/$ID \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $NEBULA_BEARER_TOKEN\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/collections/{id}',
    httpMethod: 'delete',
    summary: 'Delete collection',
    description:
      'Delete an existing collection.\n\nThis endpoint allows deletion of a collection identified by its\nUUID. The user must have appropriate permissions to delete the\ncollection. Deleting a collection removes all associations but does\nnot delete the engrams within it.',
    stainlessPath: '(resource) collections > (method) delete',
    qualified: 'client.collections.delete',
    params: ['id: string;'],
    response: '{ results: { success: boolean; }; }',
    markdown:
      "## delete\n\n`client.collections.delete(id: string): { results: object; }`\n\n**delete** `/v1/collections/{id}`\n\nDelete an existing collection.\n\nThis endpoint allows deletion of a collection identified by its\nUUID. The user must have appropriate permissions to delete the\ncollection. Deleting a collection removes all associations but does\nnot delete the engrams within it.\n\n### Parameters\n\n- `id: string`\n  The unique identifier of the collection to delete\n\n### Returns\n\n- `{ results: { success: boolean; }; }`\n\n  - `results: { success: boolean; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst collection = await client.collections.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.delete',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(collection.results);",
      },
      python: {
        method: 'collections.delete',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\ncollection = client.collections.delete(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(collection.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/collections/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve_by_name',
    endpoint: '/v1/collections/name/{collection_name}',
    httpMethod: 'get',
    summary: 'Get a collection by name',
    description:
      'Retrieve a collection by its (owner_id, name) combination.\n\nThe authenticated user can only fetch collections they own, or, if\nsuperuser, from anyone.',
    stainlessPath: '(resource) collections > (method) retrieve_by_name',
    qualified: 'client.collections.retrieveByName',
    params: ['collection_name: string;', 'owner_id?: string;'],
    response:
      '{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }',
    markdown:
      "## retrieve_by_name\n\n`client.collections.retrieveByName(collection_name: string, owner_id?: string): { results: object; }`\n\n**get** `/v1/collections/name/{collection_name}`\n\nRetrieve a collection by its (owner_id, name) combination.\n\nThe authenticated user can only fetch collections they own, or, if\nsuperuser, from anyone.\n\n### Parameters\n\n- `collection_name: string`\n  The name of the collection\n\n- `owner_id?: string`\n  (Superuser only) Specify the owner_id to retrieve a collection by name\n\n### Returns\n\n- `{ results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }; }`\n\n  - `results: { id: string; created_at: string; description: string; engram_count: number; graph_collection_status: string; graph_sync_status: string; name: string; owner_id: string; updated_at: string; user_count: number; access_tier?: string; cache_policy?: string; chain_type?: string; contract_address?: string; creator_royalty_bps?: number; has_preview_access?: boolean; is_forked?: boolean; marketplace_metadata?: object; memory_count?: number; nft_collection_address?: string; owner_email?: string; owner_name?: string; preview_query_limit?: number; purchase_price_usd?: string; rental_price_monthly_usd?: string; workspace_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.collections.retrieveByName('collection_name');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.collections.retrieveByName',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.collections.retrieveByName('collection_name');\n\nconsole.log(response.results);",
      },
      python: {
        method: 'collections.retrieve_by_name',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.collections.retrieve_by_name(\n    collection_name="collection_name",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/collections/name/$COLLECTION_NAME \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1/memories',
    httpMethod: 'post',
    summary: 'Create a new memory (conversation or document)',
    description:
      'Create a new memory (conversation or document) using clean JSON body.\n\n- Use `collection_id` (UUID)\n- `engram_type` is optional and inferred from payload shape:\n  - If `messages` present -> conversation\n  - Otherwise -> document\n- For conversations: provide `messages` array\n- For documents: provide `raw_text` or `chunks`\n- Use `snapshot` for device-memory mode (mutually exclusive with collection_id)',
    stainlessPath: '(resource) memories > (method) create',
    qualified: 'client.memories.create',
    params: [
      'chunks?: string[];',
      'collection_id?: string;',
      "content_parts?: { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[];",
      'contents?: string[];',
      "engram_type?: 'document' | 'conversation';",
      'ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; };',
      "ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom';",
      "messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; timestamp?: string; }[];",
      'metadata?: object;',
      'name?: string;',
      'raw_text?: string;',
      "snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; };",
      'speaker_id?: string;',
      'speaker_name?: string;',
    ],
    response:
      "{ results: { id: string; message: string; engram_id?: string; memory_id?: string; status?: 'parsing' | 'processing' | 'queued'; task_id?: string; }; } | { results: { snapshot: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: object; }; }; }",
    markdown:
      "## create\n\n`client.memories.create(chunks?: string[], collection_id?: string, content_parts?: { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[], contents?: string[], engram_type?: 'document' | 'conversation', ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; }, ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom', messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; timestamp?: string; }[], metadata?: object, name?: string, raw_text?: string, snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: object[]; entity_description_embeddings?: object; relationship_description_embeddings?: object; relationship_relation_embeddings?: object; relationships?: object[]; }; }, speaker_id?: string, speaker_name?: string): { results: object; } | { results: object; }`\n\n**post** `/v1/memories`\n\nCreate a new memory (conversation or document) using clean JSON body.\n\n- Use `collection_id` (UUID)\n- `engram_type` is optional and inferred from payload shape:\n  - If `messages` present -> conversation\n  - Otherwise -> document\n- For conversations: provide `messages` array\n- For documents: provide `raw_text` or `chunks`\n- Use `snapshot` for device-memory mode (mutually exclusive with collection_id)\n\n### Parameters\n\n- `chunks?: string[]`\n  Pre-chunked text for document type\n\n- `collection_id?: string`\n  Collection UUID (mutually exclusive with snapshot)\n\n- `content_parts?: { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]`\n  Multimodal content parts (text, images, audio, documents) for document type.\n\n- `contents?: string[]`\n  Batch content strings for snapshot mode\n\n- `engram_type?: 'document' | 'conversation'`\n  Type of memory to create\n\n- `ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; }`\n  Public ingestion config accepted by memory-ingestion endpoints.\n\nThis mirrors the supported request payload shape while staying independent\nfrom the runtime provider config, which also carries internal-only fields\nsuch as ``app`` and ``extra_fields``.\n  - `audio_transcription_model?: string`\n  - `automatic_extraction?: boolean`\n  - `chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }`\n    Settings for chunk enrichment.\n\nModel selection for the enrichment LLM call lives in\n``app.task_llms.chunk_enrichment``; the legacy ``generation_config``\nfield was removed in the per-task LLM cleanup pass.\n  - `chunk_overlap?: number`\n  - `chunk_size?: number`\n  - `chunking_strategy?: string`\n  - `excluded_parsers?: string[]`\n  - `extra_parsers?: object`\n  - `max_concurrent_vlm_tasks?: number`\n  - `parser_overrides?: object`\n  - `provider?: string`\n  - `vlm?: string`\n  - `vlm_batch_size?: number`\n  - `vlm_max_tokens_to_sample?: number`\n  - `vlm_ocr_one_page_per_chunk?: boolean`\n\n- `ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom'`\n  Ingestion mode for documents\n\n- `messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; timestamp?: string; }[]`\n  Messages for conversation type\n\n- `metadata?: object`\n  Metadata for the memory\n\n- `name?: string`\n  Optional name for the memory\n\n- `raw_text?: string`\n  Raw text content for document type\n\n- `snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; }`\n  Portable full snapshot owned by the client.\n  - `collection_id: string`\n  - `root_hash: string`\n  - `created_at?: string`\n  - `format_version?: number`\n  - `generation?: number`\n  - `graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }`\n    A complete graph payload or a context subgraph payload.\n\n- `speaker_id?: string`\n  UUID of the SourceRole entity creating this memory\n\n- `speaker_name?: string`\n  Display name of the speaker/agent creating this memory\n\n### Returns\n\n- `{ results: { id: string; message: string; engram_id?: string; memory_id?: string; status?: 'parsing' | 'processing' | 'queued'; task_id?: string; }; } | { results: { snapshot: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: object; }; }; }`\n  Create-memory success response. Standard memory ingestion returns an accepted async-ingestion envelope; snapshot mode returns the updated snapshot synchronously.\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst memory = await client.memories.create();\n\nconsole.log(memory);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.create',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst memory = await client.memories.create();\n\nconsole.log(memory);",
      },
      python: {
        method: 'memories.create',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nmemory = client.memories.create()\nprint(memory)',
      },
      http: {
        example:
          "curl https://api.trynebula.ai/v1/memories \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $NEBULA_BEARER_TOKEN\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/memories',
    httpMethod: 'get',
    summary: 'List engrams',
    description:
      "Returns a paginated list of engrams the authenticated user has\naccess to.\n\nResults can be filtered by providing specific engram IDs or collection IDs.\nRegular users will only see engrams they own or have access to through\ncollections. Superusers can see all engrams.\n\nThe engrams are returned in order of last modification, with most\nrecent first. The response includes the engram's text field if available.",
    stainlessPath: '(resource) memories > (method) list',
    qualified: 'client.memories.list',
    params: [
      'chunks_limit?: number;',
      'collection_ids?: string[];',
      'ids?: string[];',
      'limit?: number;',
      'metadata_filters?: string;',
      'offset?: number;',
      'owner_only?: boolean;',
    ],
    response:
      "{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }[]; total_entries: number; }",
    markdown:
      "## list\n\n`client.memories.list(chunks_limit?: number, collection_ids?: string[], ids?: string[], limit?: number, metadata_filters?: string, offset?: number, owner_only?: boolean): { results: object[]; total_entries: number; }`\n\n**get** `/v1/memories`\n\nReturns a paginated list of engrams the authenticated user has\naccess to.\n\nResults can be filtered by providing specific engram IDs or collection IDs.\nRegular users will only see engrams they own or have access to through\ncollections. Superusers can see all engrams.\n\nThe engrams are returned in order of last modification, with most\nrecent first. The response includes the engram's text field if available.\n\n### Parameters\n\n- `chunks_limit?: number`\n  Maximum chunks to inline per engram. Defaults to all chunks for backwards compatibility; pass 0 to skip chunk hydration.\n\n- `collection_ids?: string[]`\n  Optional list of collection IDs to filter engrams by. If provided, exactly one collection ID must be specified.\n\n- `ids?: string[]`\n  A list of engram IDs to retrieve. If not provided, all engrams will be returned.\n\n- `limit?: number`\n  Specifies a limit on the number of objects to return, ranging between 1 and 100. Defaults to 100.\n\n- `metadata_filters?: string`\n  JSON string for metadata filtering. Example: '{\"metadata.source\": {\"$eq\": \"playground\"}}'\n\n- `offset?: number`\n  Specifies the number of objects to skip. Defaults to 0.\n\n- `owner_only?: boolean`\n  If true, only returns engrams owned by the user, not all accessible engrams.\n\n### Returns\n\n- `{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }[]; total_entries: number; }`\n\n  - `results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }[]`\n  - `total_entries: number`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst memories = await client.memories.list();\n\nconsole.log(memories);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.list',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst memories = await client.memories.list();\n\nconsole.log(memories.results);",
      },
      python: {
        method: 'memories.list',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nmemories = client.memories.list()\nprint(memories.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/memories/{id}',
    httpMethod: 'get',
    summary: 'Retrieve an engram',
    description:
      "Retrieves detailed information about a specific engram by its\nID.\n\nThis endpoint returns the engram's metadata, status, and system information. It does not\nreturn the engram's content - use the `/engrams/{id}/download` endpoint for that.\n\nUsers can only retrieve engrams they own or have access to through collections.\nSuperusers can retrieve any engram.",
    stainlessPath: '(resource) memories > (method) retrieve',
    qualified: 'client.memories.retrieve',
    params: ['id: string;'],
    response:
      "{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }; }",
    markdown:
      "## retrieve\n\n`client.memories.retrieve(id: string): { results: object; }`\n\n**get** `/v1/memories/{id}`\n\nRetrieves detailed information about a specific engram by its\nID.\n\nThis endpoint returns the engram's metadata, status, and system information. It does not\nreturn the engram's content - use the `/engrams/{id}/download` endpoint for that.\n\nUsers can only retrieve engrams they own or have access to through collections.\nSuperusers can retrieve any engram.\n\n### Parameters\n\n- `id: string`\n  The ID of the engram to retrieve.\n\n### Returns\n\n- `{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }; }`\n\n  - `results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst memory = await client.memories.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.retrieve',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst memory = await client.memories.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory.results);",
      },
      python: {
        method: 'memories.retrieve',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nmemory = client.memories.retrieve(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(memory.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/$ID \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'update',
    endpoint: '/v1/memories/{id}',
    httpMethod: 'patch',
    summary: 'Update a memory',
    description:
      'Update memory-level properties including name, metadata, and collection associations.\n\nThis endpoint allows updating properties of an entire memory (document or conversation)\nwithout modifying its content:\n- **name**: Updates the authoritative engram title\n- **metadata**: Can replace or merge with existing metadata\n- **collection_ids**: Updates authoritative engram collection associations\n\nUsers can only update memories they own or have access to through collections.\nAt least one collection association must be maintained.\n\nIf collection_id is provided and the engram is shared across collections, a copy-on-write\nwill be performed to create a collection-specific copy before modification.',
    stainlessPath: '(resource) memories > (method) update',
    qualified: 'client.memories.update',
    params: [
      'id: string;',
      'collection_id?: string;',
      'collection_ids?: string[];',
      'merge_metadata?: boolean;',
      'metadata?: object;',
      'name?: string;',
    ],
    response:
      "{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }; }",
    markdown:
      "## update\n\n`client.memories.update(id: string, collection_id?: string, collection_ids?: string[], merge_metadata?: boolean, metadata?: object, name?: string): { results: object; }`\n\n**patch** `/v1/memories/{id}`\n\nUpdate memory-level properties including name, metadata, and collection associations.\n\nThis endpoint allows updating properties of an entire memory (document or conversation)\nwithout modifying its content:\n- **name**: Updates the authoritative engram title\n- **metadata**: Can replace or merge with existing metadata\n- **collection_ids**: Updates authoritative engram collection associations\n\nUsers can only update memories they own or have access to through collections.\nAt least one collection association must be maintained.\n\nIf collection_id is provided and the engram is shared across collections, a copy-on-write\nwill be performed to create a collection-specific copy before modification.\n\n### Parameters\n\n- `id: string`\n  The unique identifier of the memory\n\n- `collection_id?: string`\n  Collection context for copy-on-write. If provided and engram is shared, creates a copy before modification.\n\n- `collection_ids?: string[]`\n  New collection associations\n\n- `merge_metadata?: boolean`\n  Merge with existing metadata\n\n- `metadata?: object`\n  Metadata to update\n\n- `name?: string`\n  New name for the memory\n\n### Returns\n\n- `{ results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }; }`\n\n  - `results: { id: string; collection_ids: string[]; document_type: string; engram_type: 'document' | 'conversation'; metadata: object; owner_id: string; chunks?: object[]; created_at?: string; extraction_status?: 'pending' | 'processing' | 'success' | 'failed'; ingestion_attempt_number?: number; ingestion_status?: string; merkle_root?: string; search_ready_seq?: number; size_in_bytes?: number; text?: string; title?: string; total_tokens?: number; updated_at?: string; version?: string; workflow_run_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst memory = await client.memories.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.update',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst memory = await client.memories.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory.results);",
      },
      python: {
        method: 'memories.update',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nmemory = client.memories.update(\n    id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(memory.results)',
      },
      http: {
        example:
          "curl https://api.trynebula.ai/v1/memories/$ID \\\n    -X PATCH \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $NEBULA_BEARER_TOKEN\" \\\n    -d '{}'",
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1/memories/{id}',
    httpMethod: 'delete',
    summary: 'Delete an engram',
    description:
      'Delete a specific engram with graph awareness. All chunks corresponding to the\nengram are deleted, and graph components (entities/relationships) are updated\nor deleted based on remaining chunk references from other engrams.\n\nThis method now properly handles graph components and maintains graph integrity\nfor search operations.',
    stainlessPath: '(resource) memories > (method) delete',
    qualified: 'client.memories.delete',
    params: ['id: string;'],
    response: '{ results: { success: boolean; }; }',
    markdown:
      "## delete\n\n`client.memories.delete(id: string): { results: object; }`\n\n**delete** `/v1/memories/{id}`\n\nDelete a specific engram with graph awareness. All chunks corresponding to the\nengram are deleted, and graph components (entities/relationships) are updated\nor deleted based on remaining chunk references from other engrams.\n\nThis method now properly handles graph components and maintains graph integrity\nfor search operations.\n\n### Parameters\n\n- `id: string`\n  Engram ID\n\n### Returns\n\n- `{ results: { success: boolean; }; }`\n\n  - `results: { success: boolean; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst memory = await client.memories.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.delete',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst memory = await client.memories.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(memory.results);",
      },
      python: {
        method: 'memories.delete',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nmemory = client.memories.delete(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(memory.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'append',
    endpoint: '/v1/memories/{id}/append',
    httpMethod: 'post',
    summary: 'Append content to an engram',
    description:
      'Append content to an existing engram.\n\n**For conversation engrams:**\n- Provide `messages` array with content, role, and optional metadata\n- Works like `/conversations/{id}/messages` endpoint\n\n**For document engrams:**\n- Provide either `raw_text` or `chunks` to append additional content\n- Content will be processed and added to the engram',
    stainlessPath: '(resource) memories > (method) append',
    qualified: 'client.memories.append',
    params: [
      'id: string;',
      'collection_id: string;',
      'chunks?: string[];',
      'ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; };',
      "ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom';",
      "messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; parent_id?: string; source_role_id?: string; timestamp?: string; }[];",
      'metadata?: object;',
      'raw_text?: string;',
    ],
    response:
      "{ results: { id: string; message: { role: 'system' | 'user' | 'assistant' | 'function' | 'tool' | string; content?: object; function_call?: object; image_data?: object; image_url?: string; metadata?: object; name?: string; structured_content?: object[]; tool_call_id?: string; tool_calls?: object[]; }; appended_messages?: { message_id: string; chunk_ids?: string[]; }[]; metadata?: object; }; } | { results: { engram_id: string; message: string; task_id?: string; }; }",
    markdown:
      "## append\n\n`client.memories.append(id: string, collection_id: string, chunks?: string[], ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; }, ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom', messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; parent_id?: string; source_role_id?: string; timestamp?: string; }[], metadata?: object, raw_text?: string): { results: object; } | { results: object; }`\n\n**post** `/v1/memories/{id}/append`\n\nAppend content to an existing engram.\n\n**For conversation engrams:**\n- Provide `messages` array with content, role, and optional metadata\n- Works like `/conversations/{id}/messages` endpoint\n\n**For document engrams:**\n- Provide either `raw_text` or `chunks` to append additional content\n- Content will be processed and added to the engram\n\n### Parameters\n\n- `id: string`\n  The unique identifier of the engram\n\n- `collection_id: string`\n  Target collection ID for the appended content.\n\n- `chunks?: string[]`\n  Pre-processed text chunks to append for document memories.\n\n- `ingestion_config?: { audio_transcription_model?: string; automatic_extraction?: boolean; chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }; chunk_overlap?: number; chunk_size?: number; chunking_strategy?: string; excluded_parsers?: string[]; extra_parsers?: object; max_concurrent_vlm_tasks?: number; parser_overrides?: object; provider?: string; vlm?: string; vlm_batch_size?: number; vlm_max_tokens_to_sample?: number; vlm_ocr_one_page_per_chunk?: boolean; }`\n  Public ingestion config accepted by memory-ingestion endpoints.\n\nThis mirrors the supported request payload shape while staying independent\nfrom the runtime provider config, which also carries internal-only fields\nsuch as ``app`` and ``extra_fields``.\n  - `audio_transcription_model?: string`\n  - `automatic_extraction?: boolean`\n  - `chunk_enrichment_settings?: { chunk_enrichment_prompt?: string; enable_chunk_enrichment?: boolean; n_chunks?: number; }`\n    Settings for chunk enrichment.\n\nModel selection for the enrichment LLM call lives in\n``app.task_llms.chunk_enrichment``; the legacy ``generation_config``\nfield was removed in the per-task LLM cleanup pass.\n  - `chunk_overlap?: number`\n  - `chunk_size?: number`\n  - `chunking_strategy?: string`\n  - `excluded_parsers?: string[]`\n  - `extra_parsers?: object`\n  - `max_concurrent_vlm_tasks?: number`\n  - `parser_overrides?: object`\n  - `provider?: string`\n  - `vlm?: string`\n  - `vlm_batch_size?: number`\n  - `vlm_max_tokens_to_sample?: number`\n  - `vlm_ocr_one_page_per_chunk?: boolean`\n\n- `ingestion_mode?: 'hi-res' | 'ocr' | 'fast' | 'custom'`\n  Ingestion mode for document content.\n\n- `messages?: { content: string | { text: string; type?: 'text'; } | { data: string; duration_seconds?: number; filename?: string; media_type?: string; type?: 'file' | 'image' | 'audio' | 'document'; } | { s3_key: string; bucket?: string; filename?: string; media_type?: string; size_bytes?: number; type?: 's3_ref'; }[]; role: 'user' | 'assistant' | 'system'; authority?: number; metadata?: object; parent_id?: string; source_role_id?: string; timestamp?: string; }[]`\n  Messages to append for conversation memories. Each message has content, role, and optional metadata.\n\n- `metadata?: object`\n  Additional metadata for the appended content.\n\n- `raw_text?: string`\n  Raw text content to append for document memories.\n\n### Returns\n\n- `{ results: { id: string; message: { role: 'system' | 'user' | 'assistant' | 'function' | 'tool' | string; content?: object; function_call?: object; image_data?: object; image_url?: string; metadata?: object; name?: string; structured_content?: object[]; tool_call_id?: string; tool_calls?: object[]; }; appended_messages?: { message_id: string; chunk_ids?: string[]; }[]; metadata?: object; }; } | { results: { engram_id: string; message: string; task_id?: string; }; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.memories.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.append',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.append('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {\n  collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(response);",
      },
      python: {
        method: 'memories.append',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.memories.append(\n    id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n    collection_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/$ID/append \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "collection_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n        }\'',
      },
    },
  },
  {
    name: 'search',
    endpoint: '/v1/memories/search',
    httpMethod: 'post',
    summary: 'Search memories',
    description:
      'Perform a search query across your memories.\n\n**Standard mode** (collection_ids or readable-scope search): returns hierarchical MemoryRecall\nwith semantics, episodes, procedures, and sources.\n\n**Snapshot mode** (snapshot field): returns graph-search results with\n{entities, relationships} from stateless in-memory traversal.',
    stainlessPath: '(resource) memories > (method) search',
    qualified: 'client.memories.search',
    params: [
      'collection_ids?: string[];',
      "effort?: 'auto' | 'low' | 'medium' | 'high';",
      'filters?: object;',
      'nql?: string;',
      'query?: string;',
      "search_settings?: { effort?: 'auto' | 'low' | 'medium' | 'high'; enable_conceptual_expansion?: boolean; filters?: object; fulltext_weight?: number; graph_settings?: object; has_pruning_gate?: boolean; include_scores?: boolean; semantic_weight?: number; verbose?: boolean; };",
      "snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; };",
    ],
    response:
      '{ results: { query: string; episodic?: object[]; procedural?: object[]; semantic?: object[]; sources?: object[]; token_count?: number; }; } | { results: { query: string; entities?: object[]; episodic?: object[]; inference_hints?: object[]; procedural?: object[]; semantic?: object[]; sources?: object[]; total_traversal_time_ms?: number; workflows?: object[]; }; } | { results: { entities?: object[]; relationships?: object[]; }; }',
    markdown:
      "## search\n\n`client.memories.search(collection_ids?: string[], effort?: 'auto' | 'low' | 'medium' | 'high', filters?: object, nql?: string, query?: string, search_settings?: { effort?: 'auto' | 'low' | 'medium' | 'high'; enable_conceptual_expansion?: boolean; filters?: object; fulltext_weight?: number; graph_settings?: object; has_pruning_gate?: boolean; include_scores?: boolean; semantic_weight?: number; verbose?: boolean; }, snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: object[]; entity_description_embeddings?: object; relationship_description_embeddings?: object; relationship_relation_embeddings?: object; relationships?: object[]; }; }): { results: object; } | { results: object; } | { results: object; }`\n\n**post** `/v1/memories/search`\n\nPerform a search query across your memories.\n\n**Standard mode** (collection_ids or readable-scope search): returns hierarchical MemoryRecall\nwith semantics, episodes, procedures, and sources.\n\n**Snapshot mode** (snapshot field): returns graph-search results with\n{entities, relationships} from stateless in-memory traversal.\n\n### Parameters\n\n- `collection_ids?: string[]`\n  Optional list of collection UUIDs or names to scope the search.\n\n- `effort?: 'auto' | 'low' | 'medium' | 'high'`\n  Compute effort budget for memory search.\n\nEffort controls traversal compute (exploration budgets, depth, fanout), not the\nsize of the returned MemoryRecall projection.\n\n- `filters?: object`\n  Optional filters to apply to the search.\n\n- `nql?: string`\n  Pre-written NQL script. Executes directly without planner compilation. Mutually exclusive with ``query``.\n\n- `query?: string`\n  Natural-language search query. Mutually exclusive with ``nql``.\n\n- `search_settings?: { effort?: 'auto' | 'low' | 'medium' | 'high'; enable_conceptual_expansion?: boolean; filters?: object; fulltext_weight?: number; graph_settings?: object; has_pruning_gate?: boolean; include_scores?: boolean; semantic_weight?: number; verbose?: boolean; }`\n  Advanced search settings for fine-tuning search behavior.\n\nNote: Core parameters (query, collection_ids, filters) are now top-level API parameters.\nThis class contains advanced tuning options plus internal fields used by the retrieval service.\n\nMemory search uses `effort` (auto/low/medium/high) to control compute.\n  - `effort?: 'auto' | 'low' | 'medium' | 'high'`\n    Compute effort budget (auto/low/medium/high). Controls traversal compute for memory search, not MemoryRecall size.\n  - `enable_conceptual_expansion?: boolean`\n    Enable conceptual expansion for cross-domain discovery through overlapping concepts\n  - `filters?: object`\n    Internal: Filters populated by the API router\n  - `fulltext_weight?: number`\n    Weight for fulltext search in hybrid mode (0-1). Set to 0 for pure semantic search.\n  - `graph_settings?: object`\n    Internal: Graph traversal settings (bfs_max_depth, semantic_threshold, etc.)\n  - `has_pruning_gate?: boolean`\n    Internal: Set by select_search_filters when an owner_id $in partition-pruning wrapper has been added around the filter tree. Used by the in-memory graph read engine to strip the Postgres-only wrapper before evaluating delegation.\n  - `include_scores?: boolean`\n    Whether to include search score values in the search results\n  - `semantic_weight?: number`\n    Weight for semantic search in hybrid mode (0-1). Set to 0 for pure fulltext search.\n  - `verbose?: boolean`\n    Include full internal metadata, UUIDs, and confidence fields in MemoryRecall responses. When False, returns compact LLM-optimized format.\n\n- `snapshot?: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; }`\n  Portable full snapshot owned by the client.\n  - `collection_id: string`\n  - `root_hash: string`\n  - `created_at?: string`\n  - `format_version?: number`\n  - `generation?: number`\n  - `graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }`\n    A complete graph payload or a context subgraph payload.\n\n### Returns\n\n- `{ results: { query: string; episodic?: object[]; procedural?: object[]; semantic?: object[]; sources?: object[]; token_count?: number; }; } | { results: { query: string; entities?: { id: string; name: string; activation_score?: number; category?: string; profile?: object; }[]; episodic?: { id: string; name: string; activation_score?: number; category?: string; description?: string; entity_names?: string[]; evidence_ids?: string[]; member_semantic_ids?: string[]; n_facts?: number; status?: string; t_last?: string; t_start?: string; }[]; inference_hints?: { object: string; predicate: string; term: string; confidence?: number; inference_metadata?: object; inferred?: boolean; ledger_p_stable?: number; ledger_p_true?: number; ledger_p_use?: number; metadata?: object; object_id?: string; relationship_id?: string; subject_id?: string; usable_for_rewrite?: boolean; used_for_rewrite?: boolean; }[]; procedural?: { id: string; statement: string; activation_score?: number; belief_kind?: string; confidence?: number; derivation_type?: string; entity_id?: string; entity_name?: string; is_negated?: boolean; metadata?: object; }[]; semantic?: { id: string; predicate: string; subject: string; value: string; activation_score?: number; belief_kind?: string; category?: string; corroboration_count?: number; description?: string; entity_id?: string; entity_name?: string; evidence_ids?: string[]; evidence_refs?: object[]; extraction_confidence?: number; is_current?: boolean; reasoning?: string; resolved_at?: string; source_nodegroup_ids?: string[]; stability_confidence?: number; temporal_precision?: string; temporal_validity?: object; truth_confidence?: number; use_confidence?: number; }[]; sources?: { id: string; text: string; activation_score?: number; display_name?: string; engram_id?: string; evidence_ref?: object; metadata?: object; owner_id?: string; page_number?: number; section_path?: string[]; source_role?: string; speaker?: string; speaker_id?: string; structure_label?: string; supporting_fact_ids?: string[]; timestamp?: string; }[]; total_traversal_time_ms?: number; workflows?: { id: string; goal: string; name: string; activation_score?: number; active_instance_count?: number; backbone_signature_hash?: string; branches?: object[]; confidence?: number; current_step_index?: number; instance_count?: number; last_observed_at?: string; metadata?: object; predicted_next_step?: object; steps?: object[]; taxonomy_version?: number; variable_slots?: object; }[]; }; } | { results: { entities?: { id: string; name: string; score: number; category?: string; description?: string; }[]; relationships?: { id: string; object_id: string; predicate: string; subject_id: string; description?: string; weight?: number; }[]; }; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.memories.search();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.search',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.search();\n\nconsole.log(response);",
      },
      python: {
        method: 'memories.search',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.memories.search()\nprint(response)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/search \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "search_settings": {\n            "fulltext_weight": 0.2,\n            "include_scores": true,\n            "semantic_weight": 0.8,\n            "verbose": false\n          }\n        }\'',
      },
    },
  },
  {
    name: 'delete_many',
    endpoint: '/v1/memories/delete',
    httpMethod: 'post',
    summary: 'Delete one or more engrams',
    description:
      'Delete one or more engrams.\n\nThis endpoint efficiently handles both single and batch deletions.\nWhen multiple IDs are provided, it uses optimized batch operations.\n\nArgs:\n    ids: Either a single UUID or a list of UUIDs to delete\n\nReturns:\n    For single deletion: boolean success response\n    For batch deletion: detailed results with successful and failed deletions',
    stainlessPath: '(resource) memories > (method) delete_many',
    qualified: 'client.memories.deleteMany',
    params: ['body: string | string[];'],
    response:
      '{ results: { success: boolean; }; } | { message: string; results: { failed: object[]; successful: string[]; summary: object; }; }',
    markdown:
      "## delete_many\n\n`client.memories.deleteMany(body: string | string[]): { results: object; } | { message: string; results: object; }`\n\n**post** `/v1/memories/delete`\n\nDelete one or more engrams.\n\nThis endpoint efficiently handles both single and batch deletions.\nWhen multiple IDs are provided, it uses optimized batch operations.\n\nArgs:\n    ids: Either a single UUID or a list of UUIDs to delete\n\nReturns:\n    For single deletion: boolean success response\n    For batch deletion: detailed results with successful and failed deletions\n\n### Parameters\n\n- `body: string | string[]`\n  Single engram ID or list of engram IDs to delete\n\n### Returns\n\n- `{ results: { success: boolean; }; } | { message: string; results: { failed: object[]; successful: string[]; summary: object; }; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.memories.deleteMany({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.deleteMany',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.deleteMany({ body: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);",
      },
      python: {
        method: 'memories.delete_many',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.memories.delete_many(\n    body="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/delete \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'"182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\'',
      },
    },
  },
  {
    name: 'create_upload',
    endpoint: '/v1/memories/upload',
    httpMethod: 'post',
    summary: 'Get presigned URL for large file upload',
    description:
      'Get a presigned URL for uploading large files directly to S3.\n\nUse this for files larger than 5MB that cannot be sent inline as base64.\nAfter uploading, reference the file in memory creation using S3FileReference.\n\nArgs:\n    filename: Original filename (e.g., "image.jpg")\n    content_type: MIME type (e.g., "image/jpeg", "application/pdf")\n    file_size: Expected file size in bytes (max 100MB)\n\nReturns:\n    dict with:\n    - upload_url: Presigned URL for PUT request (expires in 1 hour)\n    - upload_headers: Headers that must be sent with the presigned PUT request\n    - s3_key: The S3 key to reference in memory creation\n    - bucket: S3 bucket name\n    - expires_in: Seconds until URL expires\n    - max_size: Maximum allowed file size',
    stainlessPath: '(resource) memories > (method) create_upload',
    qualified: 'client.memories.createUpload',
    params: ['content_type: string;', 'file_size: number;', 'filename: string;'],
    response:
      '{ results: { bucket: string; download_url: string; expires_in: number; max_size: number; s3_key: string; upload_headers: object; upload_url: string; }; }',
    markdown:
      "## create_upload\n\n`client.memories.createUpload(content_type: string, file_size: number, filename: string): { results: object; }`\n\n**post** `/v1/memories/upload`\n\nGet a presigned URL for uploading large files directly to S3.\n\nUse this for files larger than 5MB that cannot be sent inline as base64.\nAfter uploading, reference the file in memory creation using S3FileReference.\n\nArgs:\n    filename: Original filename (e.g., \"image.jpg\")\n    content_type: MIME type (e.g., \"image/jpeg\", \"application/pdf\")\n    file_size: Expected file size in bytes (max 100MB)\n\nReturns:\n    dict with:\n    - upload_url: Presigned URL for PUT request (expires in 1 hour)\n    - upload_headers: Headers that must be sent with the presigned PUT request\n    - s3_key: The S3 key to reference in memory creation\n    - bucket: S3 bucket name\n    - expires_in: Seconds until URL expires\n    - max_size: Maximum allowed file size\n\n### Parameters\n\n- `content_type: string`\n  MIME type (e.g., 'image/jpeg', 'application/pdf')\n\n- `file_size: number`\n  Expected file size in bytes (max 100MB)\n\n- `filename: string`\n  Original filename (e.g., 'image.jpg')\n\n### Returns\n\n- `{ results: { bucket: string; download_url: string; expires_in: number; max_size: number; s3_key: string; upload_headers: object; upload_url: string; }; }`\n\n  - `results: { bucket: string; download_url: string; expires_in: number; max_size: number; s3_key: string; upload_headers: object; upload_url: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.memories.createUpload({\n  content_type: 'content_type',\n  file_size: 0,\n  filename: 'filename',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.createUpload',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.createUpload({\n  content_type: 'content_type',\n  file_size: 0,\n  filename: 'filename',\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'memories.create_upload',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.memories.create_upload(\n    content_type="content_type",\n    file_size=0,\n    filename="filename",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/upload \\\n    -X POST \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'delete_upload',
    endpoint: '/v1/memories/upload',
    httpMethod: 'delete',
    summary: 'Delete a previously uploaded S3 file',
    description:
      'Delete a file from S3 that was uploaded via a presigned URL.\nVerifies the caller owns the file via S3 object metadata.',
    stainlessPath: '(resource) memories > (method) delete_upload',
    qualified: 'client.memories.deleteUpload',
    params: ['s3_key: string;'],
    response: '{ results: { message: string; id?: string; memory_id?: string; }; }',
    markdown:
      "## delete_upload\n\n`client.memories.deleteUpload(s3_key: string): { results: object; }`\n\n**delete** `/v1/memories/upload`\n\nDelete a file from S3 that was uploaded via a presigned URL.\nVerifies the caller owns the file via S3 object metadata.\n\n### Parameters\n\n- `s3_key: string`\n  S3 key of the file to delete (returned by POST /memories/upload)\n\n### Returns\n\n- `{ results: { message: string; id?: string; memory_id?: string; }; }`\n\n  - `results: { message: string; id?: string; memory_id?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.memories.deleteUpload({ s3_key: 's3_key' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.memories.deleteUpload',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.memories.deleteUpload({ s3_key: 's3_key' });\n\nconsole.log(response.results);",
      },
      python: {
        method: 'memories.delete_upload',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.memories.delete_upload(\n    s3_key="s3_key",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/memories/upload \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'connect',
    endpoint: '/v1/connectors/{provider}/connect',
    httpMethod: 'post',
    summary: 'Start OAuth connection flow',
    description: 'Start OAuth connection flow',
    stainlessPath: '(resource) connectors > (method) connect',
    qualified: 'client.connectors.connect',
    params: ['provider: string;', 'collection_id: string;', 'config?: object;'],
    response: '{ results: { auth_url: string; state: string; }; }',
    markdown:
      "## connect\n\n`client.connectors.connect(provider: string, collection_id: string, config?: object): { results: object; }`\n\n**post** `/v1/connectors/{provider}/connect`\n\nStart OAuth connection flow\n\n### Parameters\n\n- `provider: string`\n\n- `collection_id: string`\n\n- `config?: object`\n\n### Returns\n\n- `{ results: { auth_url: string; state: string; }; }`\n\n  - `results: { auth_url: string; state: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.connectors.connect('provider', { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.connect',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.connectors.connect('provider', {\n  collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'connectors.connect',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.connectors.connect(\n    provider="provider",\n    collection_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors/$PROVIDER/connect \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "collection_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1/connectors',
    httpMethod: 'get',
    summary: 'List active connections for a collection',
    description: 'List active connections for a collection',
    stainlessPath: '(resource) connectors > (method) list',
    qualified: 'client.connectors.list',
    params: ['collection_id: string;'],
    response:
      "{ results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }[]; }",
    markdown:
      "## list\n\n`client.connectors.list(collection_id: string): { results: object[]; }`\n\n**get** `/v1/connectors`\n\nList active connections for a collection\n\n### Parameters\n\n- `collection_id: string`\n\n### Returns\n\n- `{ results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }[]; }`\n\n  - `results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }[]`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst connectors = await client.connectors.list({ collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(connectors);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.list',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst connectors = await client.connectors.list({\n  collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(connectors.results);",
      },
      python: {
        method: 'connectors.list',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nconnectors = client.connectors.list(\n    collection_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(connectors.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'list_providers',
    endpoint: '/v1/connectors/providers',
    httpMethod: 'get',
    summary: 'List available connector providers',
    description: 'List available connector providers',
    stainlessPath: '(resource) connectors > (method) list_providers',
    qualified: 'client.connectors.listProviders',
    response: '{ results: string[]; }',
    markdown:
      "## list_providers\n\n`client.connectors.listProviders(): { results: string[]; }`\n\n**get** `/v1/connectors/providers`\n\nList available connector providers\n\n### Returns\n\n- `{ results: string[]; }`\n\n  - `results: string[]`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.connectors.listProviders();\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.listProviders',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.connectors.listProviders();\n\nconsole.log(response.results);",
      },
      python: {
        method: 'connectors.list_providers',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.connectors.list_providers()\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors/providers \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1/connectors/{connection_id}',
    httpMethod: 'get',
    summary: 'Get a single connection by ID',
    description: 'Get a single connection by ID',
    stainlessPath: '(resource) connectors > (method) retrieve',
    qualified: 'client.connectors.retrieve',
    params: ['connection_id: string;'],
    response:
      "{ results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }; }",
    markdown:
      "## retrieve\n\n`client.connectors.retrieve(connection_id: string): { results: object; }`\n\n**get** `/v1/connectors/{connection_id}`\n\nGet a single connection by ID\n\n### Parameters\n\n- `connection_id: string`\n\n### Returns\n\n- `{ results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }; }`\n\n  - `results: { id: string; collection_id: string; created_at: string; provider: string; status: 'active' | 'pending' | 'revoked'; updated_at: string; user_id: string; config?: object; error_detail?: { message: string; retryable: boolean; }; external_account_id?: string; health?: 'ok' | 'error'; items_synced?: number; last_error?: string; last_synced_at?: string; next_sync_at?: string; sync_cursor?: object; token_expires_at?: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst connector = await client.connectors.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(connector);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.retrieve',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst connector = await client.connectors.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(connector.results);",
      },
      python: {
        method: 'connectors.retrieve',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nconnector = client.connectors.retrieve(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(connector.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors/$CONNECTION_ID \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'sync',
    endpoint: '/v1/connectors/{connection_id}/sync',
    httpMethod: 'post',
    summary: 'Manually trigger a sync',
    description: 'Manually trigger a sync',
    stainlessPath: '(resource) connectors > (method) sync',
    qualified: 'client.connectors.sync',
    params: ['connection_id: string;'],
    response: '{ results: { message: string; }; }',
    markdown:
      "## sync\n\n`client.connectors.sync(connection_id: string): { results: object; }`\n\n**post** `/v1/connectors/{connection_id}/sync`\n\nManually trigger a sync\n\n### Parameters\n\n- `connection_id: string`\n\n### Returns\n\n- `{ results: { message: string; }; }`\n\n  - `results: { message: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.connectors.sync('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.sync',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.connectors.sync('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.results);",
      },
      python: {
        method: 'connectors.sync',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.connectors.sync(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors/$CONNECTION_ID/sync \\\n    -X POST \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'disconnect',
    endpoint: '/v1/connectors/{connection_id}',
    httpMethod: 'delete',
    summary: 'Disconnect an external data source',
    description: 'Disconnect an external data source',
    stainlessPath: '(resource) connectors > (method) disconnect',
    qualified: 'client.connectors.disconnect',
    params: ['connection_id: string;', 'delete_memories?: boolean;'],
    response: '{ results: { message: string; warnings?: { code: string; message: string; }[]; }; }',
    markdown:
      "## disconnect\n\n`client.connectors.disconnect(connection_id: string, delete_memories?: boolean): { results: object; }`\n\n**delete** `/v1/connectors/{connection_id}`\n\nDisconnect an external data source\n\n### Parameters\n\n- `connection_id: string`\n\n- `delete_memories?: boolean`\n\n### Returns\n\n- `{ results: { message: string; warnings?: { code: string; message: string; }[]; }; }`\n\n  - `results: { message: string; warnings?: { code: string; message: string; }[]; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.connectors.disconnect('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.disconnect',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.connectors.disconnect('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.results);",
      },
      python: {
        method: 'connectors.disconnect',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.connectors.disconnect(\n    connection_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/connectors/$CONNECTION_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN"',
      },
    },
  },
  {
    name: 'export',
    endpoint: '/v1/device-memory/snapshot/export',
    httpMethod: 'post',
    summary: 'Export a collection snapshot',
    description: "Export a collection's full graph state as a\nportable SnapshotEnvelope.",
    stainlessPath: '(resource) snapshots > (method) export',
    qualified: 'client.snapshots.export',
    params: ['collection_id: string;'],
    response:
      '{ results: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: object[]; entity_description_embeddings?: object; relationship_description_embeddings?: object; relationship_relation_embeddings?: object; relationships?: object[]; }; }; }',
    markdown:
      "## export\n\n`client.snapshots.export(collection_id: string): { results: object; }`\n\n**post** `/v1/device-memory/snapshot/export`\n\nExport a collection's full graph state as a\nportable SnapshotEnvelope.\n\n### Parameters\n\n- `collection_id: string`\n\n### Returns\n\n- `{ results: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: object[]; entity_description_embeddings?: object; relationship_description_embeddings?: object; relationship_relation_embeddings?: object; relationships?: object[]; }; }; }`\n\n  - `results: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.snapshots.export({ collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.snapshots.export',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.snapshots.export({\n  collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'snapshots.export',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.snapshots.export(\n    collection_id="182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/device-memory/snapshot/export \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "collection_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"\n        }\'',
      },
    },
  },
  {
    name: 'import',
    endpoint: '/v1/device-memory/snapshot/import',
    httpMethod: 'post',
    summary: 'Import a snapshot into an ephemeral collection',
    description:
      'Import a SnapshotEnvelope into an ephemeral\ncollection. Returns the ephemeral collection UUID.',
    stainlessPath: '(resource) snapshots > (method) import',
    qualified: 'client.snapshots.import',
    params: [
      "snapshot: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; };",
    ],
    response: '{ results: { ephemeral_collection_id: string; }; }',
    markdown:
      "## import\n\n`client.snapshots.import(snapshot: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: object[]; entity_description_embeddings?: object; relationship_description_embeddings?: object; relationship_relation_embeddings?: object; relationships?: object[]; }; }): { results: object; }`\n\n**post** `/v1/device-memory/snapshot/import`\n\nImport a SnapshotEnvelope into an ephemeral\ncollection. Returns the ephemeral collection UUID.\n\n### Parameters\n\n- `snapshot: { collection_id: string; root_hash: string; created_at?: string; format_version?: number; generation?: number; graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }; }`\n  Portable full snapshot owned by the client.\n  - `collection_id: string`\n  - `root_hash: string`\n  - `created_at?: string`\n  - `format_version?: number`\n  - `generation?: number`\n  - `graph?: { entities?: { id: string; created_at: string; engram_id: string; name: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; fts_terms?: object; metadata?: object; relationship_count?: number; }[]; entity_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_description_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationship_relation_embeddings?: { dim?: number; encoding?: 'npy-base64'; mask_b64?: string; values_b64?: string; }; relationships?: { id: string; created_at: string; object_id: string; subject_id: string; updated_at: string; category?: string; chunk_ids?: string[]; collection_id?: string; description?: string; engram_id?: string; inference_metadata?: object; metadata?: object; object?: string; predicate?: string; relationship_type?: string; subject?: string; temporal_precision?: string; valid_span?: object; weight?: number; }[]; }`\n    A complete graph payload or a context subgraph payload.\n\n### Returns\n\n- `{ results: { ephemeral_collection_id: string; }; }`\n\n  - `results: { ephemeral_collection_id: string; }`\n\n### Example\n\n```typescript\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula();\n\nconst response = await client.snapshots.import({ snapshot: { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', root_hash: 'root_hash' } });\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.snapshots.import',
        example:
          "import Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst response = await client.snapshots.import({\n  snapshot: { collection_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', root_hash: 'root_hash' },\n});\n\nconsole.log(response.results);",
      },
      python: {
        method: 'snapshots.import_',
        example:
          'import os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\nresponse = client.snapshots.import_(\n    snapshot={\n        "collection_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n        "root_hash": "root_hash",\n    },\n)\nprint(response.results)',
      },
      http: {
        example:
          'curl https://api.trynebula.ai/v1/device-memory/snapshot/import \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $NEBULA_BEARER_TOKEN" \\\n    -d \'{\n          "snapshot": {\n            "collection_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n            "root_hash": "root_hash"\n          }\n        }\'',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Nebula Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/nebula-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/nebula-sdk/)\n\nThe Nebula Python library provides convenient access to the Nebula REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Nebula MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40nebula-ai%2Fsdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBuZWJ1bGEtYWkvc2RrLW1jcCJdLCJlbnYiOnsiTkVCVUxBX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTkVCVUxBX0JFQVJFUl9UT0tFTiI6Ik15IEFjY2VzcyBUb2tlbiJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40nebula-ai%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40nebula-ai%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22NEBULA_API_KEY%22%3A%22My%20API%20Key%22%2C%22NEBULA_BEARER_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.trynebula.ai](https://docs.trynebula.ai). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install nebula-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom nebula import Nebula\n\nclient = Nebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\n\ncollection = client.collections.create(\n    name="Example collection",\n    description="Memory store for my app",\n)\nprint(collection.results)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `NEBULA_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncNebula` instead of `Nebula` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom nebula import AsyncNebula\n\nclient = AsyncNebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  collection = await client.collections.create(\n      name="Example collection",\n      description="Memory store for my app",\n  )\n  print(collection.results)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install nebula-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom nebula import DefaultAioHttpClient\nfrom nebula import AsyncNebula\n\nasync def main() -> None:\n  async with AsyncNebula(\n    access_token=os.environ.get("NEBULA_BEARER_TOKEN"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    collection = await client.collections.create(\n        name="Example collection",\n        description="Memory store for my app",\n    )\n    print(collection.results)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom nebula import Nebula\n\nclient = Nebula()\n\nmemory = client.memories.create(\n    ingestion_config={},\n)\nprint(memory.ingestion_config)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `nebula.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `nebula.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `nebula.APIError`.\n\n```python\nimport nebula\nfrom nebula import Nebula\n\nclient = Nebula()\n\ntry:\n    client.collections.create(\n        name="Example collection",\n        description="Memory store for my app",\n    )\nexcept nebula.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept nebula.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept nebula.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom nebula import Nebula\n\n# Configure the default for all requests:\nclient = Nebula(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).collections.create(\n    name="Example collection",\n    description="Memory store for my app",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom nebula import Nebula\n\n# Configure the default for all requests:\nclient = Nebula(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Nebula(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).collections.create(\n    name="Example collection",\n    description="Memory store for my app",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `NEBULA_LOG` to `info`.\n\n```shell\n$ export NEBULA_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom nebula import Nebula\n\nclient = Nebula()\nresponse = client.collections.with_raw_response.create(\n    name="Example collection",\n    description="Memory store for my app",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ncollection = response.parse()  # get the object that `collections.create()` would have returned\nprint(collection.results)\n```\n\nThese methods return an [`APIResponse`](https://github.com/nebula-agi/nebula-python/tree/main/src/nebula/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/nebula-agi/nebula-python/tree/main/src/nebula/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.collections.with_streaming_response.create(\n    name="Example collection",\n    description="Memory store for my app",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom nebula import Nebula, DefaultHttpxClient\n\nclient = Nebula(\n    # Or use the `NEBULA_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom nebula import Nebula\n\nwith Nebula() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/nebula-agi/nebula-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport nebula\nprint(nebula.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Nebula TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@nebula-ai/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@nebula-ai/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@nebula-ai/sdk)\n\nThis library provides convenient access to the Nebula REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.trynebula.ai](https://docs.trynebula.ai). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Nebula MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40nebula-ai%2Fsdk-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBuZWJ1bGEtYWkvc2RrLW1jcCJdLCJlbnYiOnsiTkVCVUxBX0FQSV9LRVkiOiJNeSBBUEkgS2V5IiwiTkVCVUxBX0JFQVJFUl9UT0tFTiI6Ik15IEFjY2VzcyBUb2tlbiJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40nebula-ai%2Fsdk-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40nebula-ai%2Fsdk-mcp%22%5D%2C%22env%22%3A%7B%22NEBULA_API_KEY%22%3A%22My%20API%20Key%22%2C%22NEBULA_BEARER_TOKEN%22%3A%22My%20Access%20Token%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @nebula-ai/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst collection = await client.collections.create({\n  name: 'Example collection',\n  description: 'Memory store for my app',\n});\n\nconsole.log(collection.results);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  accessToken: process.env['NEBULA_BEARER_TOKEN'], // This is the default and can be omitted\n});\n\nconst params: Nebula.CollectionCreateParams = {\n  name: 'Example collection',\n  description: 'Memory store for my app',\n};\nconst collection: Nebula.CollectionCreateResponse = await client.collections.create(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst collection = await client.collections\n  .create({ name: 'Example collection', description: 'Memory store for my app' })\n  .catch(async (err) => {\n    if (err instanceof Nebula.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Nebula({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.collections.create({ name: 'Example collection', description: 'Memory store for my app' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Nebula({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.collections.create({ name: 'Example collection', description: 'Memory store for my app' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Nebula();\n\nconst response = await client.collections\n  .create({ name: 'Example collection', description: 'Memory store for my app' })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: collection, response: raw } = await client.collections\n  .create({ name: 'Example collection', description: 'Memory store for my app' })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(collection.results);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `NEBULA_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Nebula({\n  logger: logger.child({ name: 'Nebula' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.collections.create({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Nebula({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Nebula({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Nebula from '@nebula-ai/sdk';\n\nconst client = new Nebula({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Nebula from 'npm:@nebula-ai/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Nebula({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/nebula-agi/nebula-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
