import { assert } from "chai";
import { describe, it } from "mocha";
import { CipherOptions, KeyStore, Web3 } from "web3";
import { sign, recover, Web3Account } from "web3-eth-accounts";

import { KlaytnWeb3 } from "../src";
import { KlaytnWeb3Account } from "../src/types";

import { MockProvider } from "./mock_provider";


// Dummy values.

/* eslint-disable quotes */
const url = "https://public-en-kairos.node.kaia.io";
const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const feePayer = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const value = 1000000000000;
const nonce = 2;
const gasPrice = 25e9;
const gasLimit = 50000;
const chainId = 1001;
const senderTxHashRLP = "0x09f87a8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a09f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956a06bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7";
const txSignatures = [["0x7f5", "0x9f8e49e2ad84b0732984398749956e807e4b526c786af3c5f7416b293e638956", "0x6bf88342092f6ff9fabe31739b2ebfa1409707ce54a54693e91a6b9bb77df0e7"]];
const tx0 = { type: 0, from, to, value, gasPrice };
const tx9 = { type: 9, from, to, value, gasPrice, txSignatures };
const lightKdf: CipherOptions = { kdf: "scrypt", n: 2, p: 1 }; // For faster testing

const keystores = [
  { // Eth V3. ethers.Wallet.createRandom().encrypt("password")
    json: '{"address":"029e786304c1531af3ac7db24a02448e543a099e","id":"9d492c95-b9e3-42e3-af73-5c77e932208d","version":3,"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"bfcb88a1501e2bb1e6694c03da18953d"},"ciphertext":"076510b4e25d5cfc31239bffcad6036fe543cbbb04b9f3ec719bf4f61b58fc05","kdf":"scrypt","kdfparams":{"salt":"79124f05995aae98b3088d8365f59a6dfadd1c9ed249abae3c07733f4cbbee53","n":131072,"dklen":32,"p":1,"r":8},"mac":"d70f83824c2c30dc5cd3a244d87147b6aa713a6000165789a82a467651284ac7"}}',
    password: "password",
    address: "0x029e786304c1531aF3aC7db24A02448e543A099E",
    keys: ["0x1b33a48f58d8c85ab142a7375fcf18714d88271f6647cfa6b54f1be66b05a762"],
  },
  { // Klaytn V4 with one key. kcn account new --lightkdf
    json: '{"address":"ec5eaa07b4d3cbafe7bf437a1ea9a898209f617c","keyring":[[{"cipher":"aes-128-ctr","ciphertext":"0a5aa3749b9e83c2a4238445aeb66f59355c0363a54c163e34e454f76e061e47","cipherparams":{"iv":"2a0b2e02a61e0f721bd800ea6e23a588"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":4096,"p":6,"r":8,"salt":"538ead57745bcd946b05fe294de08256628d9a0a393fd29ced933ba5fc045b07"},"mac":"30b5488bc97165bc7ecac8ff8dfec65a75a8ad206450aecff0ac2dfea6f79b08"}]],"id":"362c0766-f5e3-4b4d-af22-7e89d5fb613a","version":4}',
    password: "password",
    address: "0xEc5eAa07b4d3CbAfe7bf437a1Ea9A898209F617c",
    keys: ["0x4062512193ef1dab8ccf3e3d7a4862e3c740bdf11d852954ed48bc73643e354f"],
  },
  { // Klaytn V4 with multiple role-based keys. https://toolkit.kaia.io/misc/generateKeystore
    json: '{"version":4,"id":"2d7ad5c1-880f-4920-9b8e-51f852c4802c","address":"0x17226c9b4e130551c258eb7b1cdc927c13998cd6","keyring":[[{"ciphertext":"eb9bd884ac3cc8bf92e6b0082e9d07198bfc4c1223ccc6e5edf7452ad612b2b5","cipherparams":{"iv":"47faf7b0991a051eef698c73fc246f78"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ba0a3e8dc49a04f8e590f8df5a590bc6e134b031ce10f46d73d4c459aa4c08f8","n":4096,"r":8,"p":1},"mac":"4978d7325e1b9b3ec9fdfd1ec709a5a86fdfade0297ea9ddeeb8c3a7a62ae898"}],[{"ciphertext":"1a80c8666bea1a8dfa3082b001ff64c818fb14cf4e02017785e0edcc7a277af4","cipherparams":{"iv":"eafbecc65ccc177a5579bf56d5f4ed31"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"6472845219e11e4de094cac8c32a6a4d13e69cd4507780a7a37f5e411e1d895d","n":4096,"r":8,"p":1},"mac":"86379236d2fd6e9bb3f99f7eebaa3325b51e9fa5ec150ade7a461555c0a14ca3"},{"ciphertext":"0071c41d2956b12be5ebc08a9a5b3a9684b9e410fe2de91d614be977fb2a0bdb","cipherparams":{"iv":"1492dfb771030d3d9c9d996c193c03e5"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"f8145aa907a649866e0fbff86011244584ddc86559cf4901f8f69b670c234fd7","n":4096,"r":8,"p":1},"mac":"eacc58c1ad717ca375697c9fcc80f463a26600f5da1b21327715bf3efa047be5"}],[{"ciphertext":"68ffc1e2800a7288ba7baba0f0f8049daeed05379fabfdd3bc017fa85c49ab50","cipherparams":{"iv":"17f22d7b8aa1a8a2948fd3629f0b89ed"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ff5e577ec8294320cfe59ef7b1b01ee44d4c9f19c8fbc31f333059c74eb8c6d2","n":4096,"r":8,"p":1},"mac":"de65d669be044df5e39e678b099424a8692a2da6f3746832862cf2e5d6ada612"},{"ciphertext":"fd4810ee850f0aa5f61a2eafbfc5ca36cfebb42df5c2465cc8ae5188029b188b","cipherparams":{"iv":"b00ead13b38e449c268d09fced80ce49"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"af5dbbfb7383045dc7f8a3bfc56cccfc22a5150a1f87e454d40893a4b6fea9a1","n":4096,"r":8,"p":1},"mac":"6234352852eb18246b94f28f3c3454103289ecf2faaa91115927c53729bb0805"},{"ciphertext":"03b758de6372aa6bedde513ccb282bf8af32bca227c258f3e0fc85ce454d72a4","cipherparams":{"iv":"5c20f3e96d0802eaf56670e57fbe3e98"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"b5ec4e40f5a09a59e90317ce45eb7bcd73a2a9afe70f6f2e32548fd38ed2da3b","n":4096,"r":8,"p":1},"mac":"99b7f59855f0aa04531cc4a24c7923f75ed8052084de9ec49a2794e3899c3274"}]]}',
    password: "password",
    address: "0x17226c9B4e130551c258Eb7B1Cdc927c13998cd6",
    keys: [
      "0x278c3d035328daf04ab2597da96dd2d8868fd61a8837030f7d8a85f27b7f1bad",
      "0xa06d13800719307ea7e2503ea441c2ea49279d0d600a2eec2887b50928869676", "0xc32f4007ffad303db99dee0d79a720e1d70c4b2babf8e33cb28170a16bac467d",
      "0xc274d13302891d0d91a60891a48fde8c2860018f8dcb6293dcc0b28a238590b0", "0x83c127e5207b70086a702c93f1c9a041f15ce49ee5183ce848f35c64de196eff", "0x48f97204ac4886dfbd819ada04ea31a730c6fc43fcb08900566360ee7402f93b"],
  }
];
/* eslint-enable quotes */


// Test each properties of web3.eth.accounts (of type KlaytnAccountsInterface)
describe("web3.eth.accounts", () => {
  let P: MockProvider;
  let EW3: Web3;
  let KW3: KlaytnWeb3;

  before(() => {
    P = new MockProvider(url);
    EW3 = new Web3(P);
    KW3 = new KlaytnWeb3(P);

    // Stuff dummy values to the mock provider
    P.mock_override("eth_getTransactionCount", () => "0x1234");
    P.mock_override("eth_chainId", () => "0x3e9");
    P.mock_override("net_version", () => "0x3e9");
    P.mock_override("eth_blockNumber", () => "0x12d687");
    P.mock_override("eth_gasPrice", () => "0xba43b7400");
    P.mock_override("eth_getTransactionCount", () => "0x1234");
    P.mock_override("eth_estimateGas", () => "0x5208");
  });

  it("recoverTransaction()", async () => {
    // var a = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    // var b = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
    // klay.sendTransaction({ typeInt: 0, from: a, to: b, value: 1e12 })
    // klay.sendTransaction({ typeInt: 8, from: a, to: b, value: 1e12 })
    const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const rawTx0 = "0xf86c80850ba43b740083015f909470997970c51812dc3a010c7d01b50e0d17dc79c885e8d4a510008082f4f6a0e0695a8467fca213751d5f31082ebcce69b14d1398d02978fb989744027c2414a04edf04c0bae5326942edc512a6fa793f01a09c14f9a6c1ef526cea75f7afcd97";
    const rawTx8 = "0x08f88401850ba43b740083015f909470997970c51812dc3a010c7d01b50e0d17dc79c885e8d4a5100094f39fd6e51aad88f6f4ce6ab8827279cfffb92266f847f84582f4f5a0855117ad19a1abf7931e9b06211f83d8508611a1d4ca307f1e0f986b99c7161ca0136ff93afe61264e9704eb13d8de8f68d1cb50060f4b392cf9083e86b3650cc2";

    assert.equal(EW3.eth.accounts.recoverTransaction(rawTx0), from);
    assert.equal(KW3.eth.accounts.recoverTransaction(rawTx0), from);
    assert.equal(KW3.eth.accounts.recoverTransaction(rawTx8), from);
  });

  it("hashMessage()", async () => {
    const msg = "hello";
    const msgHash = "0x50b2c43fd39106bafbba0da34fc430e1f91e3c96ea2acee2bc34119f92b37750";

    assert.equal(EW3.eth.accounts.hashMessage(msg), msgHash);
    assert.equal(KW3.eth.accounts.hashMessage(msg), msgHash);
  });

  it("sign()", async () => {
    const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const msg = "hello";
    const msgHash = "0x50b2c43fd39106bafbba0da34fc430e1f91e3c96ea2acee2bc34119f92b37750";

    function checkMsgSignResult(signResult: ReturnType<typeof sign>) {
      assert.equal(signResult.message, msg);
      assert.equal(signResult.messageHash, msgHash);
      assert.equal(recover(msg, signResult.signature), addr);
      assert.equal(recover(msg, signResult.v, signResult.r, signResult.s), addr);
    }

    checkMsgSignResult(EW3.eth.accounts.sign(msg, priv));
    checkMsgSignResult(KW3.eth.accounts.sign(msg, priv));
  });

  it("encrypt()", async () => {
    const priv = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
    const addr = "3c44cdddb6a900fa2b585dd299e03d12fa4293bc";

    function checkKeyStore(ks: KeyStore) {
      assert.equal(ks.version, 3);
      assert.equal(ks.address, addr);
      assert.isString(ks.id);
      assert.isObject(ks.crypto);
    }

    checkKeyStore(await EW3.eth.accounts.encrypt(priv, "password", lightKdf));
    checkKeyStore(await KW3.eth.accounts.encrypt(priv, "password", lightKdf));
  });

  it("wallet", async () => {
    const priv1 = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const addr1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const json2 = "{\"address\":\"3c44cdddb6a900fa2b585dd299e03d12fa4293bc\",\"id\":\"3d73e4aa-2102-4203-8f90-2fb1b0690af7\",\"version\":3,\"crypto\":{\"cipher\":\"aes-128-ctr\",\"cipherparams\":{\"iv\":\"c65d46f512e3e3c66729cdec6884123c\"},\"ciphertext\":\"32f222a3b6f454559331f04f0645b76733e924c770bfe311d6a80a11b952c97a\",\"kdf\":\"scrypt\",\"kdfparams\":{\"salt\":\"317e916c3caa8da89868c41300ec8e2eba88abc2474ee5f7954ba757e7c81caf\",\"n\":2,\"dklen\":32,\"p\":1,\"r\":8},\"mac\":\"36ed4164aab7f139aa42990d11d7f790078f454b46a4d4d0b9ed718de2dd3e9a\"},\"x-ethers\":{\"client\":\"ethers.js\",\"gethFilename\":\"UTC--2023-11-29T09-26-20.0Z--3c44cdddb6a900fa2b585dd299e03d12fa4293bc\",\"mnemonicCounter\":\"6c3b6d22c9e7361b65043ef05430febd\",\"mnemonicCiphertext\":\"63bd4059afc9294ae4e748cf5cee4b61\",\"path\":\"m/44'/60'/0'/0/2\",\"locale\":\"en\",\"version\":\"0.1\"}}";
    const priv2 = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
    const addr2 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

    async function checkWallet(W3: Web3) {
      await W3.eth.accounts.wallet.create(1);
      await W3.eth.accounts.wallet.add(priv1);
      await W3.eth.accounts.wallet.decrypt([JSON.parse(json2)], "");

      assert.equal(W3.eth.accounts.wallet.length, 3);
      assert.equal(W3.eth.accounts.wallet.at(1)?.address, addr1);
      assert.equal(W3.eth.accounts.wallet.at(2)?.privateKey, priv2);
      assert.equal(W3.eth.accounts.wallet.at(2)?.address, addr2);
      checkAccountObject(W3.eth.accounts.wallet.at(0)!);
    }
    async function checkKlaytnWallet(W3: KlaytnWeb3) {
      await checkWallet(W3);
      checkKlaytnAccountObject(W3.eth.accounts.wallet.at(0)!);
    }

    await checkWallet(EW3);
    await checkKlaytnWallet(KW3);
  });

  it("create()", async () => {
    await checkAccountObject(EW3.eth.accounts.create());
    await checkKlaytnAccountObject(KW3.eth.accounts.create());
  });

  it("privateKeyToAccount()", async () => {
    const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const addr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    await checkAccountObject(EW3.eth.accounts.privateKeyToAccount(priv), addr, priv);
    await checkKlaytnAccountObject(KW3.eth.accounts.privateKeyToAccount(priv), addr, priv);
  });

  it("decrypt()", async () => {
    for (const tc of keystores) {
      const version = JSON.parse(tc.json).version;
      if (version == 3) {
        await checkAccountObject(await EW3.eth.accounts.decrypt(tc.json, tc.password), tc.address, tc.keys[0]);
      }
      await checkAccountObject(await KW3.eth.accounts.decrypt(tc.json, tc.password), tc.address, tc.keys[0]);
    }
  });

  it("decryptList()", async () => {
    for (const tc of keystores) {
      const accounts = await KW3.eth.accounts.decryptList(tc.json, tc.password);
      for (let idx = 0; idx < accounts.length; idx++) {
        await checkKlaytnAccountObject(accounts[idx], tc.address, tc.keys[idx]);
      }
    }
  });

  it("signTransaction()", async () => {
    const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const tx0 = { type: 0, from, to, value, gasPrice };
    const tx9 = { type: 9, from, to, value, gasPrice };

    await checkTxSignResult(await EW3.eth.accounts.signTransaction(tx0, priv));
    await checkTxSignResult(await KW3.eth.accounts.signTransaction(tx0, priv));
    await checkTxSignResult(await KW3.eth.accounts.signTransaction(tx9, priv));
  });

  it("signTransactionAsFeePayer()", async () => {
    const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const tx9 = { type: 9, from, to, feePayer, value, nonce, gasPrice, gasLimit, chainId, txSignatures };

    await checkTxSignResult(await KW3.eth.accounts.signTransactionAsFeePayer(tx9, priv));
    await checkTxSignResult(await KW3.eth.accounts.signTransactionAsFeePayer(senderTxHashRLP, priv));
  });
});

// Check the result of web3.eth.accounts.create(), decrypt(), and privateKeyToAccount() from Web3.
async function checkAccountObject(account: Web3Account, expectedAddr?: string, expectedPriv?: string) {
  // All properties are defined.
  assert.isString(account.address);
  assert.isString(account.privateKey);
  assert.isFunction(account.signTransaction);
  assert.isFunction(account.sign);
  assert.isFunction(account.encrypt);
  if (expectedAddr) { assert.equal(account.address, expectedAddr); }
  if (expectedPriv) { assert.equal(account.privateKey, expectedPriv); }

  // Functions work.
  checkTxSignResult(await account.signTransaction(tx0));
  checkMsgSignResult(account.sign("hello"));
  checkKeyStore(await account.encrypt("password", lightKdf));
}

// Check the result of web3.eth.accounts.create(), decrypt(), and privateKeyToAccount() from KlaytnWeb3.
async function checkKlaytnAccountObject(account: KlaytnWeb3Account, expectedAddr?: string, expectedPriv?: string) {
  // All properties are defined.
  await checkAccountObject(account, expectedAddr, expectedPriv);
  assert.isFunction(account.signTransactionAsFeePayer);

  // Functions work.
  checkTxSignResult(await account.signTransaction(tx9));
  checkTxSignResult(await account.signTransactionAsFeePayer(tx9));
  checkTxSignResult(await account.signTransactionAsFeePayer(senderTxHashRLP));
}

function checkTxSignResult(signResult: any) {
  assert.isString(signResult.messageHash);
  assert.isString(signResult.v);
  assert.isString(signResult.r);
  assert.isString(signResult.s);
  assert.isString(signResult.rawTransaction);
  assert.isString(signResult.transactionHash);
}

function checkMsgSignResult(signResult: ReturnType<typeof sign>) {
  assert.isString(signResult.messageHash);
  assert.isString(signResult.v);
  assert.isString(signResult.r);
  assert.isString(signResult.s);
  assert.isString(signResult.signature);
}

function checkKeyStore(ks: KeyStore) {
  assert.equal(ks.version, 3);
  assert.isString(ks.address);
  assert.isString(ks.id);
  assert.isObject(ks.crypto);
}