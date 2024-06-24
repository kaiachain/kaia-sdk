import { AsyncNamespaceApi, rpcSendFunction, asyncOpenApi } from "@klaytn/js-ext-core";
// @ts-ignore: package @klaytn/web3rpc has no .d.ts file.
import { AdminApi, DebugApi, GovernanceApi, KlayApi, NetApi, PersonalApi, TxpoolApi } from "@klaytn/web3rpc";
import { Web3 } from "web3";
import {
  Web3Context,
  Web3ContextInitOptions,
  isSupportedProvider
} from "web3-core";
import { ResponseError, ProviderError } from "web3-errors";
import { RegisteredSubscription } from "web3-eth";
import {
  EthExecutionAPI,
  SupportedProviders,
} from "web3-types";
import * as utils from "web3-utils";

import { context_accounts } from "./accounts";
import {
  context_getProtocolVersion,
  context_sendSignedTransaction,
  context_sendTransaction,
  context_signTransaction,
} from "./eth";
import { KlaytnWeb3EthInterface } from "./types";


// Follow the Web3 class from the web3/src/web3.ts
// with slight difference in the web3.eth property.
export class KlaytnWeb3
  extends Web3Context<EthExecutionAPI, RegisteredSubscription> {
  // Static properties analogous to Web3 class
  public static version = Web3.version;
  public static utils = Web3.utils;
  public static modules = Web3.modules;

  // Properties analogous to Web3 class
  public utils: typeof utils;
  public eth: KlaytnWeb3EthInterface;

  // Additional RPC namespaces
  public admin: AsyncNamespaceApi;
  public debug: AsyncNamespaceApi;
  public governance: AsyncNamespaceApi;
  public klay: AsyncNamespaceApi;
  public kaia: AsyncNamespaceApi;
  public net: AsyncNamespaceApi;
  public personal: AsyncNamespaceApi;
  public txpool: AsyncNamespaceApi;

  // The inner Web3 instance that provides the base implementation.
  // KlaytnWeb3 will delegate most of its methods to this instance.
  private _web3: Web3;

  public constructor(
    providerOrContext?:
			| string
			| SupportedProviders<EthExecutionAPI>
			| Web3ContextInitOptions<EthExecutionAPI>,
  ) {
    // Call super() like original Web3.constructor() does
    const contextInitOptions = getContextInitOptions(providerOrContext);
    super(contextInitOptions);

    // Create inner Web3 object
    this._web3 = new Web3(providerOrContext);

    // Expose required properties from inner Web3 object
    this.utils = this._web3.utils;
    this.eth = this._web3.eth as KlaytnWeb3EthInterface;

    // Override web3.eth.accounts methods
    const accounts = context_accounts(this);
    this.eth.accounts = accounts;
    this._accountProvider = accounts as any; // inevitable conflict in signTransaction types
    this._wallet = accounts.wallet;

    // Override web3.eth RPC method wrappers. See web3-eth/src/web3_eth.ts:Web3Eth
    // Note that other web3.eth methods should just calling eth_ RPCs to Klaytn node.
    this.eth.getProtocolVersion = context_getProtocolVersion(this._web3);
    this.eth.sendTransaction = context_sendTransaction(this._web3);
    this.eth.sendSignedTransaction = context_sendSignedTransaction(this._web3);
    this.eth.signTransaction = context_signTransaction(this._web3);

    // Attach additional RPC namespaces.
    const send = this.makeSendFunction();
    this.admin = asyncOpenApi(send, AdminApi);
    this.debug = asyncOpenApi(send, DebugApi);
    this.governance = asyncOpenApi(send, GovernanceApi);
    this.klay = asyncOpenApi(send, KlayApi);
    this.kaia = asyncOpenApi(send, KlayApi);
    this.net = asyncOpenApi(send, NetApi);
    this.personal = asyncOpenApi(send, PersonalApi);
    this.txpool = asyncOpenApi(send, TxpoolApi);
  }

  private makeSendFunction(): rpcSendFunction {
    if (!this.provider) {
      return async (_method: string, _params: any[]): Promise<any> => {
        throw new ProviderError("no provider set");
      };
    }

    return async (method: string, params: any[]): Promise<any> => {
      const response = await this.provider?.request({
        jsonrpc: "2.0",
        id: "1",
        method: method,
        params: params,
      });
      if (response?.error) {
        throw new ResponseError(response);
      } else {
        return response?.result;
      }
    };
  }
}

// Parse providerOrContext into Web3ContextInitOptions.
// See web3/src/web3.ts:Web3
function getContextInitOptions(
  providerOrContext?:
    | string
    | SupportedProviders<EthExecutionAPI>
    | Web3ContextInitOptions<EthExecutionAPI>,
) {
  // Because console.warn will be printed in `this._web3 = new Web3(..)`, we omit here.
  // if (...) { console.warn('NOTE: web3.js is running without provider...'); }

  let contextInitOptions: Web3ContextInitOptions<EthExecutionAPI> = {};
  if (
    typeof providerOrContext === "string" ||
    isSupportedProvider(providerOrContext as SupportedProviders)
  ) {
    contextInitOptions.provider = providerOrContext as
      | undefined
      | string
      | SupportedProviders;
  } else if (providerOrContext) {
    contextInitOptions = providerOrContext as Web3ContextInitOptions;
  } else {
    contextInitOptions = {};
  }

  return contextInitOptions;
}