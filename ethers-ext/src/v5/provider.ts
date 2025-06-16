import { Networkish } from "@ethersproject/networks";
import {
  JsonRpcProvider as EthersJsonRpcProvider,
  Web3Provider as EthersWeb3Provider,
  JsonRpcSigner as EthersJsonRpcSigner
} from "@ethersproject/providers";
import { ConnectionInfo } from "@ethersproject/web";

import { asyncOpenApi, AsyncNamespaceApi } from "@kaiachain/js-ext-core";
// @ts-ignore: package @kaiachain/web3rpc has no .d.ts file.
import * as web3rpc from "@kaiachain/web3rpc";

import { JsonRpcSigner } from "./signer.js";

/* eslint-disable no-multi-spaces */
export class JsonRpcProvider extends EthersJsonRpcProvider {
  // API methods other than eth_ namespaces
  admin: AsyncNamespaceApi;
  debug: AsyncNamespaceApi;
  governance: AsyncNamespaceApi;
  klay: AsyncNamespaceApi;
  kaia: AsyncNamespaceApi;
  net: AsyncNamespaceApi;
  personal: AsyncNamespaceApi;
  txpool: AsyncNamespaceApi;

  constructor(url?: ConnectionInfo | string, network?: Networkish) {
    super(url, network);

    const send = (method: string, params: any) => {
      return this.send(method, params);
    };
    const { AdminApi, DebugApi, GovernanceApi, KlayApi, NetApi, PersonalApi, TxpoolApi } = web3rpc
    this.admin = asyncOpenApi(send, AdminApi);
    this.debug = asyncOpenApi(send, DebugApi);
    this.governance = asyncOpenApi(send, GovernanceApi);
    this.klay = asyncOpenApi(send, KlayApi);
    this.kaia = asyncOpenApi(send, KlayApi);
    this.net = asyncOpenApi(send, NetApi);
    this.personal = asyncOpenApi(send, PersonalApi);
    this.txpool = asyncOpenApi(send, TxpoolApi);
  }
}

export class Web3Provider extends EthersWeb3Provider {
  // API methods other than eth_ namespaces
  admin: AsyncNamespaceApi;
  debug: AsyncNamespaceApi;
  governance: AsyncNamespaceApi;
  klay: AsyncNamespaceApi;
  kaia: AsyncNamespaceApi;
  net: AsyncNamespaceApi;
  personal: AsyncNamespaceApi;
  txpool: AsyncNamespaceApi;

  constructor(provider: any, network?: any) {
    super(provider, network);

    const send = async (method: string, params: any = []) => {
      if (method === "wallet_switchEthereumChain") {
        method = "wallet_switchKlaytnChain";
      }
      if (method === "wallet_addEthereumChain") {
        method = "wallet_addKlaytnChain";
      }

      if (provider?.request) {
        return provider.request({ method, params });
      } else if (provider?.send) {
        return provider.send(method, params);
      } else if (provider?.sendAsync && provider?.isMobile) {
        if (method === "eth_requestAccounts" || method == "eth_accounts" || method == "kaia_accounts") {
          return provider?.enable();
        } else {
          return new Promise((resolve, reject) => {
            provider.sendAsync({ method, params }, (err: any, result: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(result?.result || "");
              }
            });
          });
        }
      } else {
        throw new Error("Provider does not support sendAsync or send methods");
      }
    };
    this.send = send;
    const { AdminApi, DebugApi, GovernanceApi, KlayApi, NetApi, PersonalApi, TxpoolApi } = web3rpc
    this.admin = asyncOpenApi(send, AdminApi);
    this.debug = asyncOpenApi(send, DebugApi);
    this.governance = asyncOpenApi(send, GovernanceApi);
    this.klay = asyncOpenApi(send, KlayApi);
    this.kaia = asyncOpenApi(send, KlayApi);
    this.net = asyncOpenApi(send, NetApi);
    this.personal = asyncOpenApi(send, PersonalApi);
    this.txpool = asyncOpenApi(send, TxpoolApi);
  }

  override getSigner(addressOrIndex?: string | number | undefined): EthersJsonRpcSigner {
    return new JsonRpcSigner(this, addressOrIndex);
  }

  override send(method: string, params: Array<any>): Promise<any> {
    return this.send(method, params);
  }

  override listAccounts(): Promise<Array<string>> {
    return this.send("eth_accounts", []).then((accounts: Array<string>) => {
      return accounts;
    });
  }
}