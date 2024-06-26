import {
  FetchRequest,
  Networkish,
  JsonRpcProvider as EthersJsonRpcProvider,
  BrowserProvider as EthersWeb3Provider,
  assert,
} from "ethers6";

import { asyncOpenApi, AsyncNamespaceApi } from "@klaytn/js-ext-core";
import {
  AdminApi,
  DebugApi,
  GovernanceApi,
  KlayApi,
  NetApi,
  PersonalApi,
  TxpoolApi,
  // @ts-ignore: package @klaytn/web3rpc has no .d.ts file.
} from "@klaytn/web3rpc";

import { JsonRpcSigner } from "./signer";

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
  constructor(provider: any, network?: any) {
    super(provider, network);
    //  temporary solution because this.provider is not receive isKaikas from provider
    this.provider.isKaikas = provider.isKaikas;

    const send = (method: string, params: any) => {
      return this.send(method, params);
    };

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
}
