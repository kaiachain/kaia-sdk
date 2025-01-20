// Integration toolkit for code generated by openapi-generator-javascript.
// JsonRpcClient is an ApiClient replacement built using existing JSON-RPC client.
// ApiClient has many methods, but implementing callApi() is actually sufficient
// for the purpose of JSON-RPC.

import { isFunction } from "lodash-es";

// For example, JsonRpcClient can be built from ethers.JsonRpcProvider or web3.HttpProvider.
export type rpcSendFunction = (method: string, params: any[]) => Promise<any>;
export class JsonRpcClient {
  send: rpcSendFunction;

  constructor(send: rpcSendFunction) {
    this.send = send;
  }

  /* eslint-disable no-multi-spaces */
  callApi(
    _path:         any,
    _httpMethod:   any,
    _pathParams:   any,
    _queryParams:  any,
    _headerParams: any,
    _formParams:   any,
    bodyParam:     { method: string, params: any[] },
    _authNames:    any,
    _contentTypes: any,
    _accepts:      any,
    _returnType:   any,
    _apiBasePath:  any,
    callback:      (err: any, data: any) => void,
  ): any {
    this.send(bodyParam.method, bodyParam.params)
      .then((data: any) => callback(null, data))
      .catch((err: any) => callback(err, null));
  }
  /* eslint-enable no-multi-spaces */
}

// NamespaceApi is a class generated by openapi-generator-javascript.
export type openApiMethod = (...args: any[]) => any;
export declare class NamespaceApi {
  constructor(client: any);
  [methodName: string | symbol]: openApiMethod;
}

// AsyncNamespaceApi is a collection of async methods that wraps NamespaceApi.
export type asyncApiMethod = (...args: any[]) => Promise<any>;
export declare class AsyncNamespaceApi {
  [methodName: string | symbol]: asyncApiMethod | any;
}

export function promisifyMethod(openApi: NamespaceApi, methodName: string | symbol, numRequiredArgs: number): asyncApiMethod {
  // API classes made by openapi-generator-javascript separately takes required and optional paramters,
  // and we have no definitive way to know the number of optional parameters.
  // So we only check for the number of required parameters, hence the condition args.length < numArgs.
  //
  // For instance klay_createAccessList has 1 required (callObject) and 1 'optional' (blockParameter) parameter.
  // The generated openApiMethod looks like this:
  //
  //   function createAccessList(callObject, opts, callback)
  //   - `callObject` is a required parameter.
  //   - `opts` contains optional parameters as an object `{blockParameter: 'latest'}` or an array `['latest']`.
  //
  // Here, the number of required parameters = (arg count) - (opts and callback) = 3 - 2 = 1 = numArgs
  // and the number of optional parameters is not known by JS Reflection.
  //
  // But because JSON-RPC API expects all parameters to be passed, the "optional" parameters are actually "required".
  //
  // For details, see the codegen frameworks
  //   https://github.com/kaiachain/kaia-sdk/blob/dev/web3rpc/sdk/client/javascript/template/libraries/javascript/api.mustache
  //   https://github.com/OpenAPITools/openapi-generator/blob/master/modules/openapi-generator/src/main/java/org/openapitools/codegen/languages/JavascriptClientCodegen.java
  // Or the generated code
  //   https://www.npmjs.com/package/@kaiachain/web3rpc?activeTab=code
  //   @kaiachain/web3rpc/dist/api/KlayApi.js
  return async function (...args: any[]): Promise<any> {
    if (args.length < numRequiredArgs) {
      throw new Error(`API ${String(methodName)} expects ${numRequiredArgs} or more arguments, got ${args.length}`);
    }
    const requiredArgs = args.slice(0, numRequiredArgs);
    const optionalArgs = args.slice(numRequiredArgs);

    return new Promise((resolve, reject) => {
      openApi[methodName](...requiredArgs, optionalArgs, (err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };
}

// promisifyApi converts NamespaceApi to AsyncNamespaceApi by promisifying each methods.
export function promisifyApi(openApi: NamespaceApi): AsyncNamespaceApi {
  const asyncApi: AsyncNamespaceApi = {};

  const proto = Reflect.getPrototypeOf(openApi);
  if (!proto) {
    throw new Error("Cannot promisify OpenApi object");
  }

  const methods = Reflect.ownKeys(proto);
  for (const methodName of methods) {
    // Assume the prototype has only constructor and API methods;
    // anything other that the constructor is an API method.
    if (methodName == "constructor") {
      continue;
    }

    const method = Reflect.get(proto, methodName);
    if (!isFunction(method)) {
      continue;
    }
    if (method.length < 2) {
      // Function.length is the number of arguments.
      // OpenApi generated methods have at least 2 arguments: opts, callback.
      continue;
    }

    // The openApiMethod looks like this: function api(req1, req2, opts, callback)
    const numRequiredArgs = method.length - 2;
    asyncApi[methodName] = promisifyMethod(openApi, methodName, numRequiredArgs);
  }

  return asyncApi;
}

export function asyncOpenApi(send: rpcSendFunction, Clazz: typeof NamespaceApi): AsyncNamespaceApi {
  const client = new JsonRpcClient(send);
  const api = new Clazz(client);
  return promisifyApi(api);
}
