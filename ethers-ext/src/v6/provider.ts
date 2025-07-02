import {
  FetchRequest,
  Networkish,
  JsonRpcProvider as EthersJsonRpcProvider,
  BrowserProvider as EthersWeb3Provider,
  assert,
  isHexString
} from "ethers";

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
  net: AsyncNamespaceApi;
  personal: AsyncNamespaceApi;
  txpool: AsyncNamespaceApi;

  constructor(url?: FetchRequest | string | undefined, network?: Networkish) {
    super(url, network);

    const send = (method: string, params: any) => {
      return this.send(method, params);
    };

    const { AdminApi, DebugApi, GovernanceApi, KlayApi, NetApi, PersonalApi, TxpoolApi } = web3rpc

    this.admin = asyncOpenApi(send, AdminApi);
    this.debug = asyncOpenApi(send, DebugApi);
    this.governance = asyncOpenApi(send, GovernanceApi);
    this.klay = asyncOpenApi(send, KlayApi);
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
  net: AsyncNamespaceApi;
  personal: AsyncNamespaceApi;
  txpool: AsyncNamespaceApi;
  isKaikas?: boolean;
  isMobile?: boolean;
  private _sendFunction: (method: string, params: any) => Promise<any>;
  
  constructor(provider: any, network?: any) {
    // Making window.klaytn to EIP1193 compatible request,chainId
    if (!provider.request) {
      provider.request = async (_method: any, _params: any) => {};
    }
    if (!provider.chainId) {
      provider.chainId = undefined;
    }
    super(provider, network);
    //  temporary solution because this.provider is not receive isKaikas from provider
    this.provider.isKaikas = provider.isKaikas;
    this.provider.isMobile = provider?.sendAsync && provider?.isMobile;

    const send = async (method: string, params: any = []) => {
      if (provider.isKaikas) {
        method = method.replace("eth_", "klay_");
      }

      if (provider?.send) {
        return super.send(method, params);
      } else if (this.isMobile) {
        if (method === "wallet_switchEthereumChain") {
          method = "wallet_switchKlaytnChain";
        }
        if (method === "wallet_addEthereumChain") {
          method = "wallet_addKlaytnChain";
        }

        if (method.endsWith("_requestAccounts") || method.endsWith("_accounts")) {
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

    // Store the send function for use in the override
    this._sendFunction = send;

    const { AdminApi, DebugApi, GovernanceApi, KlayApi, NetApi, PersonalApi, TxpoolApi } = web3rpc

    this.admin = asyncOpenApi(send, AdminApi);
    this.debug = asyncOpenApi(send, DebugApi);
    this.governance = asyncOpenApi(send, GovernanceApi);
    this.klay = asyncOpenApi(send, KlayApi);
    this.net = asyncOpenApi(send, NetApi);
    this.personal = asyncOpenApi(send, PersonalApi);
    this.txpool = asyncOpenApi(send, TxpoolApi);
  }

  override async getSigner(
    addressOrIndex?: string | number
  ): Promise<JsonRpcSigner> {
    if (!addressOrIndex) {
      addressOrIndex = 0;
    }
    if (typeof addressOrIndex === "number") {
      const accounts = await this.provider.send("eth_accounts", []);
      assert(
        accounts.length > addressOrIndex,
        "unknown account #" + addressOrIndex,
        "UNSUPPORTED_OPERATION",
        { operation: "getAddress" }
      );

      addressOrIndex = await this.provider._getAddress(
        accounts[addressOrIndex]
      );
    }

    return Promise.resolve(new JsonRpcSigner(this, addressOrIndex));
  }

  override async send(method: string, params: Array<any> | Record<string, any>): Promise<any> {
    return this._sendFunction(method, params);
  }

  override async listAccounts(): Promise<Array<JsonRpcSigner>> {
    const accounts: Array<string> = await this.send("eth_accounts", []);
    return accounts.map((a) => new JsonRpcSigner(this, a));
  }

  // async getTransaction(txhash: string): Promise<any> {
  //   if (this.isMobile) {
  //     return await this._sendFunction("eth_getTransactionByHash", [txhash]);
  //   }
  //   return super.getTransaction(txhash);
  // }

  async getTransactionCount(address: string): Promise<number> {
    if (this.isMobile) {
      return await this._sendFunction("eth_getTransactionCount", [address]);
    }
    return super.getTransactionCount(address);
  }

  async estimateGas(tx: any): Promise<any> {
    if (!isHexString(tx.value)) {
      tx.value = "0x" + BigInt(tx.value || 0).toString(16);
    }
    return await this._sendFunction("eth_estimateGas", [tx]);
  }

  async signMessage(message: string): Promise<any> {
    return await this._sendFunction("eth_sign", [message]);
  }

  async getGasPrice(): Promise<any> {
    return await this._sendFunction("eth_gasPrice", []);
  }

  async getFeeData(): Promise<any> {
    if (this.isMobile) {
      return { gasPrice: (await this.getGasPrice()) };
    }
    return super.getFeeData();
  }
}
