import chai, { assert } from "chai";
import chaiAsPromised from "chai-as-promised";
import { keccak256, Wallet as EthersWallet } from "ethers6";
import _ from "lodash";
import { describe, it } from "mocha";

import { Wallet as KlaytnWallet, parseTransaction } from "../../src/v6";

import { MockEthersProvider, MockKlaytnProvider } from "./mock_provider";

chai.use(chaiAsPromised);

// Dummy values.
const url = "https://public-en-baobab.klaytn.net";
const priv =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const value = 0;
const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const feePayer = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const decoupledAddr = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
const otherAddr = "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65";
const nonce = 2;
const gasPrice = 25e9;
const gasLimit = 50000;
const chainId = 1001;

const txHashRLP =
  "0x08f87e028505d21dba0082c3509470997970c51812dc3a010c7d01b50e0d17dc79c8809490f79bf6eb2c4f870365e785982e1f101e93b906f847f8458207f5a0e16b4d0efd52c217dc3d868834cd1dc7a36f793acf8f4558a3de0eb9a62869fba02fe50e20b55ea59a41678eab633696db728c65755e5fe1d72cb4c006fafad67b";
const senderTxHashRLP_fit =
  "0x09f880821922850ba43b740082cd149470997970c51812dc3a010c7d01b50e0d17dc79c88094f39fd6e51aad88f6f4ce6ab8827279cfffb92266f847f8458207f5a003b5e4371caae44de62e9b2c799b9744d46e84c3309b704cfa276cc6659671f8a0453a40c726a6f5e6fb32e54fc3279508c48cb54e589982c3f01580209a8b0c02";
const senderTxHashRLP_pad =
  "0x09f89a821922850ba43b740082cd149470997970c51812dc3a010c7d01b50e0d17dc79c88094f39fd6e51aad88f6f4ce6ab8827279cfffb92266f847f8458207f5a003b5e4371caae44de62e9b2c799b9744d46e84c3309b704cfa276cc6659671f8a0453a40c726a6f5e6fb32e54fc3279508c48cb54e589982c3f01580209a8b0c02940000000000000000000000000000000000000000c4c3018080";
const txSignatures = [
  [
    "0x7f5",
    "0x9f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956",
    "0x6bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7",
  ],
];

const block = JSON.parse(
  '{"difficulty":"0x1","extraData":"0x","gasLimit":"0xe8d4a50fff","gasUsed":"0x0","hash":"0xe6a28d57db4dec9eacad5e6ce3d90fef900ab65760c579c46567b4bbb3803bc2","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","miner":"0x571e53df607be97431a5bbefca1dffe5aef56f4d","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","number":"0x12d687","parentHash":"0x720ed13d78e8b0f2c20f4129b9b69dcbad49eebecfc2bb22e792be5ea28ecbfc","receiptsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","size":"0x33b","stateRoot":"0xd3db6e4adfc526b5028764512e338d0ff3d8bc76e02593a763ac747ed8a22112","timestamp":"0x5d261b95","totalDifficulty":"0x12d688","transactions":[],"transactionsRoot":"0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","uncles":[]}'
);
const txJson = JSON.parse(
  '{"blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2","blockNumber":"0x5daf3b","hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b","from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d","gas":"0xc350","gasPrice":"0x4a817c800","input":"0x68656c6c6f21","nonce":"0x15","r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea","s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c","to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb","transactionIndex":"0x41","type":"0x0","v":"0x25","value":"0xf3dbb76162000"}'
);

describe("Wallet v6", () => {
  let EP: MockEthersProvider;
  let KP: MockKlaytnProvider;
  let EW: EthersWallet;
  let KW: KlaytnWallet;
  let KWD: KlaytnWallet;
  let sentRawTx: string;

  before(async () => {
    EP = new MockEthersProvider(url);
    KP = new MockKlaytnProvider(url);
    EW = new EthersWallet(priv, EP);
    KW = new KlaytnWallet(priv, KP);
    KWD = new KlaytnWallet(decoupledAddr, priv, KP);

    // Stuff dummy values to mock providers
    for (let P of [EP, KP]) {
      P.mock_override("eth_chainId", () => "0x3e9");
      P.mock_override("eth_blockNumber", () => "0x12d687");
      P.mock_override("eth_gasPrice", () => "0xba43b7400");
      P.mock_override("eth_getTransactionCount", () => "0x1234");
      P.mock_override("eth_getBlockByNumber", () => block);
      P.mock_override("eth_estimateGas", () => "0x5208");
      P.mock_override("eth_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return keccak256(sentRawTx);
      });
      P.mock_override("eth_getTransactionByHash", () => {
        return txJson;
      });
    }
    for (let P of [KP]) {
      P.mock_override("klay_gasPrice", () => "0xba43b7400");
      P.mock_override("klay_estimateGas", () => "0x5208");
      P.mock_override("klay_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return keccak256(sentRawTx);
      });
    }
  });

  // populateTransaction must fill all missing fields
  describe("populateTransaction", () => {
    async function testOK(W: EthersWallet, tx: any) {
      let res = await W.populateTransaction(tx);
      assert.isDefined(res.from);
      assert.isDefined(res.nonce);
      assert.isDefined(res.gasPrice);
      assert.isDefined(res.gasLimit);
    }

    it("fill missing fields", async () => {
      for (let W of [EW, KW, KWD]) {
        await testOK(W, { type: 0, to, value });
      }
      for (let W of [KW, KWD]) {
        await testOK(W, { type: 9, to, feePayer, value });
      }
    });
  });

  // signTransaction sign transactions under various settings
  // - Accepts both object and RLP-encoded string
  // - signTransaction and signTransactionAsFeePayer
  describe("signTransaction", () => {
    async function testOK(W: EthersWallet, tx: any) {
      let res = await W.signTransaction(tx);
      assert.typeOf(res, "string");
    }
    async function testOK_AsFeePayer(W: KlaytnWallet, tx: any) {
      let res = await W.signTransactionAsFeePayer(tx);
      assert.typeOf(res, "string");
    }

    it("as sender", async () => {
      for (let W of [EW, KW, KWD]) {
        await testOK(W, { type: 0, to, value, nonce, gasPrice, gasLimit });
      }
      for (let W of [KW, KWD]) {
        await testOK(W, {
          type: 9,
          from: await W.getAddress(),
          to,
          feePayer,
          value,
          nonce,
          gasPrice,
          gasLimit,
          chainId,
        });
      }
      for (let W of [KW, KWD]) {
        await testOK(W, txHashRLP);
      }
    });
    it("as fee payer", async () => {
      for (let W of [KW, KWD]) {
        await testOK_AsFeePayer(W, {
          type: 9,
          from,
          to,
          feePayer: await W.getAddress(),
          value,
          nonce,
          gasPrice,
          gasLimit,
          chainId,
          txSignatures,
        });
      }
      for (let W of [KW, KWD]) {
        await testOK_AsFeePayer(W, senderTxHashRLP_fit);
        await testOK_AsFeePayer(W, senderTxHashRLP_pad);
      }
    });
  });

  // sendTransaction send transactions
  // - Accepts both object and RLP-encoded string
  // - sendTransaction and sendTransactionAsFeePayer
  // - populateTransaction before signing
  describe("sendTransaction", () => {
    async function testOK(W: EthersWallet, tx: any) {
      let res = await W.sendTransaction(tx);
      assert.isDefined(res);
      assert.isDefined(res.hash);
      assert.isDefined(res.wait);
    }
    async function testOK_AsFeePayer(
      W: KlaytnWallet,
      tx: any,
      expectedFrom?: string
    ) {
      let res = await W.sendTransactionAsFeePayer(tx);
      assert.isDefined(res);
      assert.isDefined(res.hash);
      assert.isDefined(res.wait);

      expectedFrom ??= await W.getAddress();
      assert.equal(parseTransaction(sentRawTx).from, expectedFrom);
    }

    it("as sender", async () => {
      for (let W of [KWD]) {
        await testOK(W, { type: 0, to, value });
      }
      for (let W of [KW, KWD]) {
        await testOK(W, { type: 9, to, feePayer, value });
      }
    });
    // 'from' address differs from W.getAddress()
    // because W is the fee payer, not the sender.
    // The sentRawTx must have the original 'from' address, not fee payer's.
    it("as fee payer", async () => {
      for (let W of [KW, KWD]) {
        await testOK_AsFeePayer(
          W,
          {
            type: 9,
            from,
            to,
            feePayer: await W.getAddress(),
            value,
            nonce,
            gasPrice,
            gasLimit,
            chainId,
            txSignatures,
          },
          from
        );
      }
      for (let W of [KW, KWD]) {
        await testOK_AsFeePayer(W, senderTxHashRLP_fit, from);
        await testOK_AsFeePayer(W, senderTxHashRLP_pad, from);
      }
    });
  });
});
