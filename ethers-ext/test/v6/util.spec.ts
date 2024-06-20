import { assert } from "chai";
import { describe, it } from "mocha";

import {
  TxType,
  isKlaytnTxType,
  isBasicTxType,
  isFeeDelegationTxType,
  isPartialFeeDelegationTxType,
  isFeePayerSigTxType,
  AccountKeyType,
  isKlaytnAccountKeyType,
  isEmbeddableAccountKeyType,
  CodeFormatEVM,
  RLP,
  HexStr,
  getCompressedPublicKey,
  getSignatureTuple,
  splitKeystoreKIP3,
  isKIP3Json,
  asyncOpenApi,
  rpcSendFunction,
  getRpcTxObject,
  formatKlayUnits,
  formatKlay,
  parseKlayUnits,
  parseKlay,
  toPeb,
  fromPeb,
} from "../../src";

// Test that js-ext-core utils are properly exported.
// Do not test the correctness. That is done in js-ext-core/test.
describe("utils v6", () => {
  it("const", () => {
    assert.equal(TxType.ValueTransfer, 8);
    assert.equal(isKlaytnTxType(8), true);
    assert.equal(isBasicTxType(9), false);
    assert.equal(isFeeDelegationTxType(9), true);
    assert.equal(isPartialFeeDelegationTxType(10), true);
    assert.equal(isFeePayerSigTxType(9), true);

    assert.equal(AccountKeyType.Public, 2);
    assert.equal(isKlaytnAccountKeyType(2), true);
    assert.equal(isEmbeddableAccountKeyType(5), false);

    assert.equal(CodeFormatEVM, 0);
  });

  it("data", () => {
    assert.equal(RLP.encode(["0x01", "0x02", "0x03"]), "0xc3010203");
    assert.equal(HexStr.from("0xabcd"), "0xabcd");
  });

  it("ec", () => {
    const uncompressed =
      "0x04c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712";
    const compressed =
      "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e";
    assert.equal(getCompressedPublicKey(uncompressed), compressed);

    const object = {
      v: 27,
      r: "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99",
      s: "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508",
    };
    const tuple = [
      "0x1b",
      "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99",
      "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508",
    ];
    assert.deepEqual(getSignatureTuple(object), tuple);
  });

  it("keystore", () => {
    assert.isFalse(isKIP3Json("asdf"));

    const v4 =
      '{"address":"ec5eaa07b4d3cbafe7bf437a1ea9a898209f617c","keyring":[[{"cipher":"aes-128-ctr","ciphertext":"0a5aa3749b9e83c2a4238445aeb66f59355c0363a54c163e34e454f76e061e47","cipherparams":{"iv":"2a0b2e02a61e0f721bd800ea6e23a588"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":4096,"p":6,"r":8,"salt":"538ead57745bcd946b05fe294de08256628d9a0a393fd29ced933ba5fc045b07"},"mac":"30b5488bc97165bc7ecac8ff8dfec65a75a8ad206450aecff0ac2dfea6f79b08"}]],"id":"362c0766-f5e3-4b4d-af22-7e89d5fb613a","version":4}';
    const split = splitKeystoreKIP3(v4);
    const v3 = JSON.parse(split[0]);
    assert.equal(v3.version, 3);
  });

  it("openapi", async () => {
    const send: rpcSendFunction = (_method: string, _params: any[]) =>
      Promise.resolve("0x1234");

    class MockKlayApi {
      apiClient: any;
      constructor(apiClient: any) {
        this.apiClient = apiClient;
      }

      blockNumber(_opts: any, callback: any) {
        const bodyParams = { method: "klay_blockNumber", params: [] };
        this.apiClient.callApi(
          "/",
          "POST",
          null,
          null,
          null,
          null,
          bodyParams,
          [],
          ["application/json"],
          ["application/json"],
          {},
          null,
          callback
        );
      }
    }
    const KlayApi = MockKlayApi as any;

    const klay = asyncOpenApi(send, KlayApi);
    const ret = await klay.blockNumber();
    assert.isTrue(HexStr.isHex(ret));
  });

  it("rpc", () => {
    const tx = { nonce: 0 };
    const formatted = { nonce: "0x0" };
    assert.deepEqual(getRpcTxObject(tx), formatted);
  });

  it("units", () => {
    const peb = BigInt("1000000000000000000");
    assert.equal(formatKlayUnits(peb, "ston"), "1000000000.0");
    assert.equal(fromPeb(peb, "ston"), "1000000000.0");

    assert.equal(formatKlay(peb), "1.0");
    assert.equal(fromPeb(peb), "1.0");

    assert.equal(parseKlayUnits("25.0", "ston").toString(), "25000000000");
    assert.equal(toPeb("25.0", "ston"), "25000000000");

    assert.equal(parseKlay("123.456").toString(), "123456000000000000000");
    assert.equal(toPeb("123.456"), "123456000000000000000");
  });
});
