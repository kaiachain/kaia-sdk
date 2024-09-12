import { assert } from "chai";
import _ from "lodash";
import { describe, it } from "mocha";
import { Receipt, Web3 } from "web3";

import { KlaytnWeb3 } from "../src";

import { MockProvider } from "./mock_provider";

// Dummy values
const url = "https://public-en-kairos.node.kaia.io";

const rawTx0 = "0xf86c80850ba43b740083015f909470997970c51812dc3a010c7d01b50e0d17dc79c885e8d4a510008082f4f6a0e0695a8467fca213751d5f31082ebcce69b14d1398d02978fb989744027c2414a04edf04c0bae5326942edc512a6fa793f01a09c14f9a6c1ef526cea75f7afcd97";
const rc0 = {
  blockHash: "0x76938e2a9b83600621d51465a66a725130de1963e9e5d546adf755939bf74799",
  blockNumber: 18,
  contractAddress: null,
  cumulativeGasUsed: "0x5208",
  effectiveGasPrice: "0x5d21dba00",
  from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  gasUsed: 21000,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  transactionHash: "0x3c3b448e03b34c09c19f3dacaaeaac20e5367a63da64ad0a219cc490ad0cf062",
  transactionIndex: 0,
  type: "0x0"
};

const rawTx8 = "0x08f88401850ba43b740083015f909470997970c51812dc3a010c7d01b50e0d17dc79c885e8d4a5100094f39fd6e51aad88f6f4ce6ab8827279cfffb92266f847f84582f4f5a0855117ad19a1abf7931e9b06211f83d8508611a1d4ca307f1e0f986b99c7161ca0136ff93afe61264e9704eb13d8de8f68d1cb50060f4b392cf9083e86b3650cc2";
const rc8 = {
  blockHash: "0x9e98fff0e594ba898abd9406d7b2b79ca0b21fa0cc7822b48d897bcc50b4888c",
  blockNumber: 91,
  contractAddress: null,
  cumulativeGasUsed: "0x5208",
  effectiveGasPrice: "0x5d21dba00",
  from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  gasUsed: 21000,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  transactionHash: "0x8d8e09e21311c53469a0cd82d310641b82819d723b09762166178f194f9eecd1",
  transactionIndex: 0,
  type: "0x0"
};

const block = {
  baseFeePerGas: "0x5d21dba00",
  difficulty: "0x1",
  extraData: "0x",
  gasLimit: "0xe8d4a50fff",
  gasUsed: 0,
  hash: "0x92694a6b75a012a15559d60e92ff30d855e2722292b7d1b05f94e5c34ff02a42",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  mixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  nonce: "0x0000000000000000",
  number: 19,
  parentHash: "0x76938e2a9b83600621d51465a66a725130de1963e9e5d546adf755939bf74799",
  receiptsRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 630,
  stateRoot: "0x61f886eb9904d0c776c4871f9b955d5d849938340ad2cec78b35e4ab0fa9bb1a",
  timestamp: 1701338345,
  timestampFoS: 0,
  totalDifficulty: "0x14",
  transactions: [],
  transactionsRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  uncles: []
};


// Test overriden methods of web3.eth.
describe("web3.eth", () => {
  let P: MockProvider;
  let EW3: Web3;
  let KW3: KlaytnWeb3;

  before(() => {
    P = new MockProvider(url);
    EW3 = new Web3(P);
    KW3 = new KlaytnWeb3(P);

    // Stuff dummy values to the mock provider
    P.mock_override("eth_chainId", () => "0x3e9");
    P.mock_override("net_version", () => "0x3e9");

    // To test getProtocolVersion
    P.mock_override("eth_protocolVersion", () => "0x1111");
    P.mock_override("klay_protocolVersion", () => "0x2222");

    // To test sendSignedTransaction
    P.mock_override("eth_call", () => {});
    P.mock_override("eth_blockNumber", () => "0x64");
    P.mock_override("eth_getBlockByNumber", ([num]) => {
      const b = _.clone(block);
      b.number = Number(num);
      return b; // Return a dummy block with the requested number
    });
    function mockSendRawTransaction(params: any[]) {
      if (params[0] == rawTx0) { return rc0.transactionHash; }
      if (params[0] == rawTx8) { return rc8.transactionHash; }
      return null;
    }
    function mockGetTransactionReceipt(params: any[]) {
      if (params[0] == rc0.transactionHash) { return rc0; }
      if (params[0] == rc8.transactionHash) { return rc8; }
      return null;
    }
    P.mock_override("eth_sendRawTransaction", mockSendRawTransaction);
    P.mock_override("eth_getTransactionReceipt", mockGetTransactionReceipt);
    P.mock_override("klay_sendRawTransaction", mockSendRawTransaction);

    // To test additional RPC namespaces
    P.mock_override("admin_datadir", () => "/home/ubuntu/klaytn/data");
    P.mock_override("debug_isPProfRunning", () => false);
    P.mock_override("governance_idxCache", () => [0]);
    P.mock_override("klay_blockNumber", () => "0x64");
    P.mock_override("klay_getTransactionReceipt", mockGetTransactionReceipt);
    P.mock_override("net_networkID", () => 1001);
    P.mock_override("personal_listAccounts", () => ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"]);
    P.mock_override("txpool_status", () => {
      return { pending: 1, queued: 2 };
    });
  });

  it("getProtocolVersion()", async () => {
    // calls different namespace
    assert.equal(await EW3.eth.getProtocolVersion(), "0x1111");
    assert.equal(await KW3.eth.getProtocolVersion(), "0x2222");
  });

  it("sendSignedTransaction()", async () => {
    async function checkSend(W3: Web3, rawTx: string, receipt: Receipt) {
      let onSent: string = "";
      let onTxHash: string = "";
      let onRc: Receipt = {};

      const rc = await W3.eth.sendSignedTransaction(rawTx)
        .on("sending", (sent: string) => { onSent = sent; })
        .on("sent", (sent: string) => { onSent = sent; })
        .on("transactionHash", (hash: string) => { onTxHash = hash; })
        .on("receipt", (rc: Receipt) => { onRc = rc; });

      assert.equal(onSent, rawTx);
      assert.equal(onTxHash, receipt.transactionHash);
      assert.equal(onRc.transactionHash, receipt.transactionHash);
      assert.equal(rc.transactionHash, receipt.transactionHash);
    }

    await checkSend(EW3, rawTx0, rc0);
    await checkSend(KW3, rawTx0, rc0);
    await checkSend(KW3, rawTx8, rc8);
  });

  it("additional RPC namespaces", async () => {
    assert.deepEqual(await KW3.admin.datadir(), "/home/ubuntu/klaytn/data");
    assert.deepEqual(await KW3.debug.isPProfRunning(), false);
    assert.deepEqual(await KW3.governance.idxCache(), [0]);
    assert.deepEqual(await KW3.klay.blockNumber(), "0x64");
    assert.deepEqual(await KW3.klay.getTransactionReceipt(rc0.transactionHash), rc0); // example with nonzero params
    assert.deepEqual(await KW3.net.networkID(), 1001);
    assert.deepEqual(await KW3.personal.listAccounts(), ["0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"]);
    assert.deepEqual(await KW3.txpool.status(), { pending: 1, queued: 2 });
  });
});
