import { FetchRequest, Networkish } from "ethers6";
import { JsonRpcProvider as EthersProvider } from "ethers6";
import _ from "lodash";

import { JsonRpcProvider as KlaytnProvider } from "../../src/v6";

type mockRpcHandler = (params: Array<any>) => Promise<any> | any;

export class MockEthersProvider extends EthersProvider {
  overrides: { [method: string]: mockRpcHandler } = {};

  constructor(url?: FetchRequest | string, network?: Networkish) {
    super(url, network);
  }

  send(method: string, params: Array<any>): Promise<any> {
    let handler = this.overrides[method];
    if (handler) {
      return Promise.resolve(handler(params));
    } else {
      console.log("mock fallback", method, params);
      return super.send(method, params);
    }
  }

  mock_override(method: string, handler: mockRpcHandler) {
    this.overrides[method] = handler;
  }

  mock_reset() {
    this.overrides = {};
  }
}

export class MockKlaytnProvider extends KlaytnProvider {
  overrides: { [method: string]: mockRpcHandler } = {};

  constructor(url?: FetchRequest | string, network?: Networkish) {
    super(url, network);
  }

  send(method: string, params: Array<any>): Promise<any> {
    let handler = this.overrides[method];
    if (handler) {
      return Promise.resolve(handler(params));
    } else {
      return super.send(method, params);
    }
  }

  mock_override(method: string, handler: mockRpcHandler) {
    this.overrides[method] = handler;
  }

  mock_reset() {
    this.overrides = {};
  }
}
