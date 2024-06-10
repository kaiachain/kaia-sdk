import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits as formatEthUnits, parseUnits as parseEthUnits, formatEther, parseEther } from "@ethersproject/units";
import { assert } from "chai";
import { describe, it } from "mocha";
import { toWei, fromWei } from "web3-utils";
/* eslint-disable */
// @ts-ignore: package @klaytn/web3rpc has no .d.ts file.
//import { ApiClient, KlayApi } from "@klaytn/web3rpc";
/* eslint-enable */

import {
  TxType,
  parseTxType,
  getKaikasTxType,
  isBasicTxType,
  isFeeDelegationTxType,
  isKlaytnTxType,
  isPartialFeeDelegationTxType,
  getPublicKeyFromPrivate,
  getCompressedPublicKey,
  getSignatureTuple,
  getRpcTxObject,
  formatKlayUnits,
  formatKaiaUnits,
  formatKlay,
  formatKaia,
  parseKlayUnits,
  parseKaiaUnits,
  parseKlay,
  parseKaia,
  toPeb,
  toKei,
  fromPeb,
  fromKei,
  asyncOpenApi,
  HexStr,
  isKIP3Json,
  splitKeystoreKIP3,
  getChainIdFromSignatureTuples,
} from "../src";


describe("util", () => {
  it("const", () => {
    // Eth types are not Klaytn TxType
    assert.isFalse(isKlaytnTxType(0));
    assert.isFalse(isBasicTxType(0));
    assert.isFalse(isFeeDelegationTxType(1));
    assert.isFalse(isPartialFeeDelegationTxType(2));

    let ty = TxType.ValueTransfer;
    assert.isTrue(isBasicTxType(ty));
    assert.isFalse(isFeeDelegationTxType(ty));
    assert.isFalse(isPartialFeeDelegationTxType(ty));

    ty = TxType.FeeDelegatedSmartContractExecution;
    assert.isFalse(isBasicTxType(ty));
    assert.isTrue(isFeeDelegationTxType(ty));
    assert.isFalse(isPartialFeeDelegationTxType(ty));

    ty = TxType.FeeDelegatedCancelWithRatio;
    assert.isFalse(isBasicTxType(ty));
    assert.isFalse(isFeeDelegationTxType(ty));
    assert.isTrue(isPartialFeeDelegationTxType(ty));

    assert.equal(parseTxType(), 0);
    assert.equal(parseTxType(null), 0);
    assert.equal(parseTxType(BigInt(1)), 1);
    assert.equal(parseTxType(0), 0);
    assert.equal(parseTxType(2), 2);
    assert.equal(parseTxType(8), 8);
    assert.equal(parseTxType("0x09"), 9);
    assert.equal(parseTxType("FeeDelegatedValueTransferWithRatio"), 0x0a);
    assert.equal(parseTxType("TxTypeValueTransferMemo"), 0x10);
    assert.equal(parseTxType("SMART_CONTRACT_EXECUTION"), 0x30);

    assert.equal(getKaikasTxType(), 0);
    assert.equal(getKaikasTxType(null), 0);
    assert.equal(getKaikasTxType(BigInt(1)), 1);
    assert.equal(getKaikasTxType(0), 0);
    assert.equal(getKaikasTxType(2), 2);
    assert.equal(getKaikasTxType(8), "VALUE_TRANSFER");
    assert.equal(getKaikasTxType("0x09"), "FEE_DELEGATED_VALUE_TRANSFER");
    assert.equal(getKaikasTxType("SMART_CONTRACT_EXECUTION"), "SMART_CONTRACT_EXECUTION");
  });

  it("getPublicKeyFromPrivate", () => {
    const priv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";
    const pub = "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd";
    assert.equal(getPublicKeyFromPrivate(priv), pub);
  });

  it("getCompressedPublicKey", () => {
    const testcases = [
      { x: "dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd", y: "af06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79" },
      { x: "0xdc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd", y: "0xaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79" },
      "03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd",
      "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd",
      "04dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cdaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79",
      "0x04dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cdaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79",
    ];
    const compressed = "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd";

    for (const tc of testcases) {
      const pub = getCompressedPublicKey(tc);
      assert.equal(pub, compressed);
    }
  });

  it("getSignatureTuple", () => {
    const vNum = 27;
    const vHex = "0x1b";
    const rHex = "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99";
    const sHex = "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508";
    const canonical = [vHex, rHex, sHex];

    const testcases = [
      // tuple
      [vHex, rHex, sHex],

      // object
      { v: vNum, r: rHex, s: sHex },
      { recoveryParam: 0, r: rHex, s: sHex },

      // compact
      ("0x" + rHex.substring(2) + sHex.substring(2)),
      ("0x" + rHex.substring(2) + sHex.substring(2) + vHex.substring(2)),
    ];

    for (const tc of testcases) {
      let tuple = getSignatureTuple(tc);
      assert.deepEqual(tuple, canonical);
    }
  });

  it("getChainIdFromSignatureTuples", () => {
    const oddV = [
      [
        "0x7f5",
        "0xe77a78c4a972f883e05df3a143a3b42cb08b8c082c3f7582f89e27c7062b6d2a",
        "0x506da8080866d5a9ae40197917d0a5268a7bb5d33a3093b780c8134b55777ccf",
      ],
    ];
    const evenV = [
      [
        "0x7f6",
        "0x3c72041cdb99c5d9902dd5784361e5fe91b205fa109db8b58097d8ed983e15f5",
        "0x11716a098568b68eac778acf256bbbfececdff02478a620de696339ec86473a0",
      ]
    ];
    assert.equal(getChainIdFromSignatureTuples(oddV), 1001);
    assert.equal(getChainIdFromSignatureTuples(evenV), 1001);
  });

  it("getRpcTxObject", () => {
    let tx = {
      chainId: 42,
      gasLimit: 0x1111,
      gasPrice: 0x222,
      type: 2,
      maxFeePerGas: 0x33,
      maxPriorityFeePerGas: 0x4,
      nonce: 0,
      value: 0,

      from: "0x00000000000000000000000000000000000000aa",
      to: "0x00000000000000000000000000000000000000bb",
      data: "0x",
    };

    let formatted = getRpcTxObject(tx);
    assert.deepEqual(formatted, {
      chainId: "0x2a",
      gas: "0x1111",
      gasPrice: "0x222",
      type: "0x2",
      maxFeePerGas: "0x33",
      maxPriorityFeePerGas: "0x4", // numeric (QUANTITY) encoded without leading zeros
      nonce: "0x0",
      value: "0x0", // zero numeric (QUANTITY) encoded to 0x0

      from: "0x00000000000000000000000000000000000000aa",
      to: "0x00000000000000000000000000000000000000bb",
      data: "0x", // empty bytestring (DATA) encoded to 0x
    });
  });

  describe("peb to unit (formatKlayUnits, formatKlay, fromPeb)", () => {
    it("klay units", () => {
      // unit names are case-insensitive.
      const peb = BigNumber.from("1000000000000000000"); // 1e18 peb

      assert.equal(formatKlayUnits(peb, "ston"), "1000000000.0"); // = 1e9 ston
      assert.equal(formatKlayUnits(peb, "gpeb"), "1000000000.0"); // = 1e9 gpeb
      assert.equal(fromPeb(peb, "ston"), "1000000000.0");

      assert.equal(formatKlayUnits(peb, "klay"), "1.0"); // = 1 KLAY
      assert.equal(formatKlayUnits(peb, "KLAY"), "1.0"); // = 1 KLAY
      assert.equal(fromPeb(peb, "klay"), "1.0");

      assert.equal(formatKlay(peb), "1.0"); // unit=KLAY by default
      assert.equal(fromPeb(peb), "1.0");

      // mKLAY and MKLAY are case sensitive
      assert.equal(formatKlayUnits(peb, "mKLAY"), "1000.0"); // = 1e3 mKLAY
      assert.equal(formatKlayUnits(peb, "MKLAY"), "0.000001"); // = 1e-6 MKLAY
      assert.equal(fromPeb(peb, "mKLAY"), "1000.0");
      assert.equal(fromPeb(peb, "MKLAY"), "0.000001");
    });

    // Make sure {formatKlayUnits, formatKlay} can safely replace {formatUnits, formatEther}.
    it("for eth units, equivalent to ethers.utils.formatUnits", () => {
      {
        const wei = BigNumber.from("1000000000000000000"); // 1e18 wei in BigNumber
        assert.equal(formatKlayUnits(wei, "gwei"), formatEthUnits(wei, "gwei"));
        assert.equal(formatKlayUnits(wei, "ether"), formatEthUnits(wei, "ether"));
        assert.equal(formatKlay(wei), formatEther(wei));
      }
      {
        const wei = "25000000000"; // 25e9 wei in String
        assert.equal(formatKlayUnits(wei, "gwei"), formatEthUnits(wei, "gwei"));
        assert.equal(formatKlayUnits(wei, "ether"), formatEthUnits(wei, "ether"));
        assert.equal(formatKlay(wei), formatEther(wei));
      }
    });

    // Make sure {fromPeb} can safely replace {fromWei}.
    it("for eth units, equivalent to web3.utils.fromWei", () => {
      // fromWei and fromPeb are slightly different in decimal representation
      // but the number is the same.
      {
        const wei = "1000000000000000000"; // 1e18 wei

        assert.equal(fromWei(wei, "gwei"), "1000000000");
        assert.equal(fromPeb(wei, "gwei"), "1000000000.0");

        assert.equal(fromWei(wei, "ether"), "1");
        assert.equal(fromPeb(wei, "ether"), "1.0");
        assert.equal(fromPeb(wei), "1.0");
      }
      {
        const wei = "25000000000"; // 25e9 wei

        assert.equal(fromWei(wei, "gwei"), "25");
        assert.equal(fromPeb(wei, "gwei"), "25.0");

        assert.equal(fromWei(wei, "ether"), "0.000000025");
        assert.equal(fromPeb(wei, "ether"), "0.000000025");
        assert.equal(fromPeb(wei), "0.000000025");
      }
    });
  });

  describe("unit to peb (parseKlayUnits, parseUnits, toPeb)", () => {
    it("klay units", () => {
      assert.equal(parseKlayUnits("25.0", "ston").toString(), "25000000000"); // 25 ston = 25e9 peb
      assert.equal(parseKlayUnits("25.0", "gpeb").toString(), "25000000000"); // 25 gpeb = 25e9 peb
      assert.equal(toPeb("25.0", "ston"), "25000000000");

      assert.equal(parseKlayUnits("123.456", "klay").toString(), "123456000000000000000"); // 123.456 KLAY = 123.456e18 peb
      assert.equal(parseKlayUnits("123.456", "KLAY").toString(), "123456000000000000000"); // 123.456 KLAY = 123.456e18 peb
      assert.equal(toPeb("123.456", "klay"), "123456000000000000000");

      assert.equal(parseKlay("123.456").toString(), "123456000000000000000");// unit=KLAY by default
      assert.equal(toPeb("123.456"), "123456000000000000000");

      // mKLAY and MKLAY are case sensitive
      assert.equal(parseKlayUnits("1000.0", "mKLAY").toString(), "1000000000000000000"); // 1000 mKLAY = 1e18 peb
      assert.equal(parseKlayUnits("5", "MKLAY").toString(), "5000000000000000000000000"); // 5 MKLAY = 5e24 peb
      assert.equal(toPeb("1000.0", "mKLAY"), "1000000000000000000");
      assert.equal(toPeb("5", "MKLAY"), "5000000000000000000000000");
    });

    it("for eth units, equivalent to ethers.utils.parseUnits", () => {
      const eth = "123.456";
      assert.equal(parseKlayUnits(eth, "gwei").toString(), parseEthUnits(eth, "gwei").toString());
      assert.equal(parseKlayUnits(eth, "ether").toString(), parseEthUnits(eth, "ether").toString());
      assert.equal(parseKlay(eth).toString(), parseEther(eth).toString());
      assert.equal(parseKlayUnits(eth).toString(), "123456000000000000000");
    });

    it("for eth units, equivalent to web3.utils.toPeb", () => {
      const eth = "123.456";
      assert.equal(toPeb(eth, "gwei"), toWei(eth, "gwei"));
      assert.equal(toPeb(eth, "ether"), toWei(eth, "ether"));
      assert.equal(toPeb(eth), toWei(eth, "ether"));
      assert.equal(toPeb(eth), "123456000000000000000");
    });
  });

  describe("kei to unit (formatKaiaUnits, formatKaia, fromKei)", () => {
    it("kaia units", () => {
      // unit names are case-insensitive.
      const kei = BigNumber.from("1000000000000000000"); // 1e18 kei

      assert.equal(formatKaiaUnits(kei, "Gkei"), "1000000000.0"); // = 1e9 Gkei
      assert.equal(fromKei(kei, "Gkei"), "1000000000.0");

      assert.equal(formatKaiaUnits(kei, "KAIA"), "1.0"); // = 1 KAIA
      assert.equal(fromKei(kei, "KAIA"), "1.0");

      assert.equal(formatKaia(kei), "1.0"); // unit=KAIA by default
      assert.equal(fromKei(kei), "1.0");
    });

    // Make sure {formatKaiaUnits, formatKaia} can safely replace {formatUnits, formatEther}.
    it("for eth units, equivalent to ethers.utils.formatUnits", () => {
      {
        const wei = BigNumber.from("1000000000000000000"); // 1e18 wei in BigNumber
        assert.equal(formatKaiaUnits(wei, "gwei"), formatEthUnits(wei, "gwei"));
        assert.equal(formatKaiaUnits(wei, "ether"), formatEthUnits(wei, "ether"));
        assert.equal(formatKaia(wei), formatEther(wei));
      }
      {
        const wei = "25000000000"; // 25e9 wei in String
        assert.equal(formatKaiaUnits(wei, "gwei"), formatEthUnits(wei, "gwei"));
        assert.equal(formatKaiaUnits(wei, "ether"), formatEthUnits(wei, "ether"));
        assert.equal(formatKaia(wei), formatEther(wei));
      }
    });

    // Make sure {fromKei} can safely replace {fromWei}.
    it("for eth units, equivalent to web3.utils.fromWei", () => {
      // fromWei and fromKei are slightly different in decimal representation
      // but the number is the same.
      {
        const wei = "1000000000000000000"; // 1e18 wei

        assert.equal(fromWei(wei, "gwei"), "1000000000");
        assert.equal(fromKei(wei, "gwei"), "1000000000.0");

        assert.equal(fromWei(wei, "ether"), "1");
        assert.equal(fromKei(wei, "ether"), "1.0");
        assert.equal(fromKei(wei), "1.0");
      }
      {
        const wei = "25000000000"; // 25e9 wei

        assert.equal(fromWei(wei, "gwei"), "25");
        assert.equal(fromKei(wei, "gwei"), "25.0");

        assert.equal(fromWei(wei, "ether"), "0.000000025");
        assert.equal(fromKei(wei, "ether"), "0.000000025");
        assert.equal(fromKei(wei), "0.000000025");
      }
    });
  });

  describe("unit to kei (parseKaiaUnits, parseUnits, toKei)", () => {
    it("kaia units", () => {
      assert.equal(parseKaiaUnits("25.0", "Gkei").toString(), "25000000000"); // 25 Gkei = 25e9 kei
      assert.equal(toKei("25.0", "Gkei"), "25000000000");

      assert.equal(parseKaiaUnits("123.456", "kaia").toString(), "123456000000000000000"); // 123.456 kaia = 123.456e18 kei
      assert.equal(parseKaiaUnits("123.456", "KAIA").toString(), "123456000000000000000"); // 123.456 KAIA = 123.456e18 kei
      assert.equal(toKei("123.456", "kaia"), "123456000000000000000");

      assert.equal(parseKaia("123.456").toString(), "123456000000000000000");// unit=KAIA by default
      assert.equal(toKei("123.456"), "123456000000000000000");
    });

    it("for eth units, equivalent to ethers.utils.parseUnits", () => {
      const eth = "123.456";
      assert.equal(parseKaiaUnits(eth, "gwei").toString(), parseEthUnits(eth, "gwei").toString());
      assert.equal(parseKaiaUnits(eth, "ether").toString(), parseEthUnits(eth, "ether").toString());
      assert.equal(parseKaia(eth).toString(), parseEther(eth).toString());
      assert.equal(parseKaiaUnits(eth).toString(), "123456000000000000000");
    });

    it("for eth units, equivalent to web3.utils.toPeb", () => {
      const eth = "123.456";
      assert.equal(toKei(eth, "gwei"), toWei(eth, "gwei"));
      assert.equal(toKei(eth, "ether"), toWei(eth, "ether"));
      assert.equal(toKei(eth), toWei(eth, "ether"));
      assert.equal(toKei(eth), "123456000000000000000");
    });
  });

  it("keystore", () => {
    // Does not crash with non-JSON.
    let json = "asdfasdf";
    assert.isFalse(isKIP3Json(json));

    // V3 wallet
    // ethers.Wallet.createRandom().encrypt("password")
    json = '{"address":"029e786304c1531af3ac7db24a02448e543a099e","id":"9d492c95-b9e3-42e3-af73-5c77e932208d","version":3,"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"bfcb88a1501e2bb1e6694c03da18953d"},"ciphertext":"076510b4e25d5cfc31239bffcad6036fe543cbbb04b9f3ec719bf4f61b58fc05","kdf":"scrypt","kdfparams":{"salt":"79124f05995aae98b3088d8365f59a6dfadd1c9ed249abae3c07733f4cbbee53","n":131072,"dklen":32,"p":1,"r":8},"mac":"d70f83824c2c30dc5cd3a244d87147b6aa713a6000165789a82a467651284ac7"}}';
    assert.isFalse(isKIP3Json(json));

    // KIP-3 wallet with one key.
    // kcn account new --lightkdf
    json = '{"address":"ec5eaa07b4d3cbafe7bf437a1ea9a898209f617c","keyring":[[{"cipher":"aes-128-ctr","ciphertext":"0a5aa3749b9e83c2a4238445aeb66f59355c0363a54c163e34e454f76e061e47","cipherparams":{"iv":"2a0b2e02a61e0f721bd800ea6e23a588"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":4096,"p":6,"r":8,"salt":"538ead57745bcd946b05fe294de08256628d9a0a393fd29ced933ba5fc045b07"},"mac":"30b5488bc97165bc7ecac8ff8dfec65a75a8ad206450aecff0ac2dfea6f79b08"}]],"id":"362c0766-f5e3-4b4d-af22-7e89d5fb613a","version":4}';
    assert.isTrue(isKIP3Json(json));

    // Delete address
    let jsons = splitKeystoreKIP3(json);
    let v3 = JSON.parse(jsons[0]);
    assert.equal(v3.version, 3);
    assert.isUndefined(v3.address);

    // Keep address
    jsons = splitKeystoreKIP3(json, false);
    v3 = JSON.parse(jsons[0]);
    assert.equal(v3.version, 3);
    assert.equal(v3.address, "ec5eaa07b4d3cbafe7bf437a1ea9a898209f617c");

    // KIP-3 wallet with multiple keys.
    // https://toolkit.klaytn.foundation/misc/generateKeystore
    json = '{"version":4,"id":"2d7ad5c1-880f-4920-9b8e-51f852c4802c","address":"0x17226c9b4e130551c258eb7b1cdc927c13998cd6","keyring":[[{"ciphertext":"eb9bd884ac3cc8bf92e6b0082e9d07198bfc4c1223ccc6e5edf7452ad612b2b5","cipherparams":{"iv":"47faf7b0991a051eef698c73fc246f78"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ba0a3e8dc49a04f8e590f8df5a590bc6e134b031ce10f46d73d4c459aa4c08f8","n":4096,"r":8,"p":1},"mac":"4978d7325e1b9b3ec9fdfd1ec709a5a86fdfade0297ea9ddeeb8c3a7a62ae898"}],[{"ciphertext":"1a80c8666bea1a8dfa3082b001ff64c818fb14cf4e02017785e0edcc7a277af4","cipherparams":{"iv":"eafbecc65ccc177a5579bf56d5f4ed31"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"6472845219e11e4de094cac8c32a6a4d13e69cd4507780a7a37f5e411e1d895d","n":4096,"r":8,"p":1},"mac":"86379236d2fd6e9bb3f99f7eebaa3325b51e9fa5ec150ade7a461555c0a14ca3"},{"ciphertext":"0071c41d2956b12be5ebc08a9a5b3a9684b9e410fe2de91d614be977fb2a0bdb","cipherparams":{"iv":"1492dfb771030d3d9c9d996c193c03e5"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"f8145aa907a649866e0fbff86011244584ddc86559cf4901f8f69b670c234fd7","n":4096,"r":8,"p":1},"mac":"eacc58c1ad717ca375697c9fcc80f463a26600f5da1b21327715bf3efa047be5"}],[{"ciphertext":"68ffc1e2800a7288ba7baba0f0f8049daeed05379fabfdd3bc017fa85c49ab50","cipherparams":{"iv":"17f22d7b8aa1a8a2948fd3629f0b89ed"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ff5e577ec8294320cfe59ef7b1b01ee44d4c9f19c8fbc31f333059c74eb8c6d2","n":4096,"r":8,"p":1},"mac":"de65d669be044df5e39e678b099424a8692a2da6f3746832862cf2e5d6ada612"},{"ciphertext":"fd4810ee850f0aa5f61a2eafbfc5ca36cfebb42df5c2465cc8ae5188029b188b","cipherparams":{"iv":"b00ead13b38e449c268d09fced80ce49"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"af5dbbfb7383045dc7f8a3bfc56cccfc22a5150a1f87e454d40893a4b6fea9a1","n":4096,"r":8,"p":1},"mac":"6234352852eb18246b94f28f3c3454103289ecf2faaa91115927c53729bb0805"},{"ciphertext":"03b758de6372aa6bedde513ccb282bf8af32bca227c258f3e0fc85ce454d72a4","cipherparams":{"iv":"5c20f3e96d0802eaf56670e57fbe3e98"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"b5ec4e40f5a09a59e90317ce45eb7bcd73a2a9afe70f6f2e32548fd38ed2da3b","n":4096,"r":8,"p":1},"mac":"99b7f59855f0aa04531cc4a24c7923f75ed8052084de9ec49a2794e3899c3274"}]]}';
    jsons = splitKeystoreKIP3(json, false);
    assert.equal(jsons.length, 6);
  });

  it("asyncOpenApi", async () => {
    // Uncomment to test with real HTTP Providers.
    /* // (1) ethers.JsonRpcProvider
    const { JsonRpcProvider } = require("@ethersproject/providers");
    const provider = new JsonRpcProvider("https://public-en-baobab.klaytn.net");
    const send = (method: string, params: any[]) => provider.send(method, params);
    //*/

    /* // (2) web3.HttpProvider
    const { Web3, HttpProvider } = require("web3");
    const provider = new HttpProvider("https://public-en-baobab.klaytn.net");
    const web3 = new Web3(provider);
    const send = (method: string, params: any[]) => web3.requestManager.send({ method, params });
    //*/

    //* // (3) Test mock
    const send = (_method: string, _params: any[]) => Promise.resolve("0x1234");
    //* /

    // Uncomment to test with real OpenApi generated codes.
    /* // (1) @klaytn/web3rpc
    const { KlayApi } = require("@klaytn/web3rpc");
    //*/

    //* // (2) Test mock
    class MockKlayApi {
      apiClient: any;
      constructor(apiClient: any) {
        this.apiClient = apiClient;
      }

      blockNumber(_opts: any, callback: any) {
        const bodyParams = { method: "klay_blockNumber", params: [] };
        this.apiClient.callApi("/", "POST", null, null, null, null, bodyParams,
          [], ["application/json"], ["application/json"], {}, null, callback);
      }
    }
    const KlayApi = MockKlayApi as any;
    //* /

    const klay = asyncOpenApi(send, KlayApi);
    const ret = await klay.blockNumber();
    assert.isTrue(HexStr.isHex(ret));
  });
});
