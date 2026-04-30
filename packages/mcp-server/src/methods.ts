// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.health',
    fullyQualifiedName: 'health',
    httpMethod: 'get',
    httpPath: '/v1/health',
  },
  {
    clientCallName: 'client.collections.create',
    fullyQualifiedName: 'collections.create',
    httpMethod: 'post',
    httpPath: '/v1/collections',
  },
  {
    clientCallName: 'client.collections.retrieve',
    fullyQualifiedName: 'collections.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/collections/{id}',
  },
  {
    clientCallName: 'client.collections.update',
    fullyQualifiedName: 'collections.update',
    httpMethod: 'post',
    httpPath: '/v1/collections/{id}',
  },
  {
    clientCallName: 'client.collections.list',
    fullyQualifiedName: 'collections.list',
    httpMethod: 'get',
    httpPath: '/v1/collections',
  },
  {
    clientCallName: 'client.collections.delete',
    fullyQualifiedName: 'collections.delete',
    httpMethod: 'delete',
    httpPath: '/v1/collections/{id}',
  },
  {
    clientCallName: 'client.collections.retrieveByName',
    fullyQualifiedName: 'collections.retrieveByName',
    httpMethod: 'get',
    httpPath: '/v1/collections/name/{collection_name}',
  },
  {
    clientCallName: 'client.memories.create',
    fullyQualifiedName: 'memories.create',
    httpMethod: 'post',
    httpPath: '/v1/memories',
  },
  {
    clientCallName: 'client.memories.retrieve',
    fullyQualifiedName: 'memories.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/memories/{id}',
  },
  {
    clientCallName: 'client.memories.update',
    fullyQualifiedName: 'memories.update',
    httpMethod: 'patch',
    httpPath: '/v1/memories/{id}',
  },
  {
    clientCallName: 'client.memories.list',
    fullyQualifiedName: 'memories.list',
    httpMethod: 'get',
    httpPath: '/v1/memories',
  },
  {
    clientCallName: 'client.memories.delete',
    fullyQualifiedName: 'memories.delete',
    httpMethod: 'delete',
    httpPath: '/v1/memories/{id}',
  },
  {
    clientCallName: 'client.memories.append',
    fullyQualifiedName: 'memories.append',
    httpMethod: 'post',
    httpPath: '/v1/memories/{id}/append',
  },
  {
    clientCallName: 'client.memories.createUpload',
    fullyQualifiedName: 'memories.createUpload',
    httpMethod: 'post',
    httpPath: '/v1/memories/upload',
  },
  {
    clientCallName: 'client.memories.deleteMany',
    fullyQualifiedName: 'memories.deleteMany',
    httpMethod: 'post',
    httpPath: '/v1/memories/delete',
  },
  {
    clientCallName: 'client.memories.deleteUpload',
    fullyQualifiedName: 'memories.deleteUpload',
    httpMethod: 'delete',
    httpPath: '/v1/memories/upload',
  },
  {
    clientCallName: 'client.memories.search',
    fullyQualifiedName: 'memories.search',
    httpMethod: 'post',
    httpPath: '/v1/memories/search',
  },
  {
    clientCallName: 'client.connectors.retrieve',
    fullyQualifiedName: 'connectors.retrieve',
    httpMethod: 'get',
    httpPath: '/v1/connectors/{connection_id}',
  },
  {
    clientCallName: 'client.connectors.list',
    fullyQualifiedName: 'connectors.list',
    httpMethod: 'get',
    httpPath: '/v1/connectors',
  },
  {
    clientCallName: 'client.connectors.connect',
    fullyQualifiedName: 'connectors.connect',
    httpMethod: 'post',
    httpPath: '/v1/connectors/{provider}/connect',
  },
  {
    clientCallName: 'client.connectors.disconnect',
    fullyQualifiedName: 'connectors.disconnect',
    httpMethod: 'delete',
    httpPath: '/v1/connectors/{connection_id}',
  },
  {
    clientCallName: 'client.connectors.listProviders',
    fullyQualifiedName: 'connectors.listProviders',
    httpMethod: 'get',
    httpPath: '/v1/connectors/providers',
  },
  {
    clientCallName: 'client.connectors.sync',
    fullyQualifiedName: 'connectors.sync',
    httpMethod: 'post',
    httpPath: '/v1/connectors/{connection_id}/sync',
  },
  {
    clientCallName: 'client.snapshots.export',
    fullyQualifiedName: 'snapshots.export',
    httpMethod: 'post',
    httpPath: '/v1/device-memory/snapshot/export',
  },
  {
    clientCallName: 'client.snapshots.import',
    fullyQualifiedName: 'snapshots.import',
    httpMethod: 'post',
    httpPath: '/v1/device-memory/snapshot/import',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
