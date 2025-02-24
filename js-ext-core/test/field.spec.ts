import { BigNumber } from "@ethersproject/bignumber";
import { assert } from "chai";

import {
  FieldType,
  FieldTypeAccountKey,
  FieldTypeAccountKeyList,
  FieldTypeAddress,
  FieldTypeBool,
  FieldTypeBytes,
  FieldTypeCompressedPubKey,
  FieldTypeSignatureTuples,
  FieldTypeUint256,
  FieldTypeUint64,
  FieldTypeUint8,
  FieldTypeWeightedPublicKeys
} from "../src";

function assertField(fieldType: FieldType, value: any, expected: any) {
  assert.deepEqual(fieldType.canonicalize(value), expected);
}

describe("Fields", () => {
  it("FieldTypeAddress", () => {
    // convert to checksumed address
    assertField(FieldTypeAddress, "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa");
  });

  it("FieldTypeBytes", () => {
    assertField(FieldTypeBytes, "0x", "0x");
    assertField(FieldTypeBytes, "0x1234", "0x1234");
    assertField(FieldTypeBytes, Buffer.from("xyz"), "0x78797a");
  });

  it("FieldTypeUint", () => {
    // Because FieldTypes are supposed to be RLP-friendly,
    // numbers are always padded to even number of hex digits.
    assertField(FieldTypeUint8, 0, "0x");
    assertField(FieldTypeUint8, 2, "0x02");
    assertField(FieldTypeUint8, 27, "0x1b");
    assertField(FieldTypeUint64, BigNumber.from(30123456), "0x01cba5c0");
    assertField(FieldTypeUint256, "25000000000", "0x05d21dba00");
  });

  it("FieldTypeBool", () => {
    assertField(FieldTypeBool, true, "0x01");
    assertField(FieldTypeBool, false, "0x");
  });

  it("FieldTypeSignatureTuples", () => {
    // Comprehensive tests are in util.spec.ts.
    const vNum = 27;
    const vHex = "0x1b";
    const r1 = "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99";
    const s1 = "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508";
    const r2 = "0xfb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434";
    const s2 = "0x5c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e";
    assertField(FieldTypeSignatureTuples,
      [{ v: vNum, r: r1, s: s1 }, { v: vNum, r: r2, s: s2 }],
      [[vHex, r1, s1], [vHex, r2, s2]]);
  });

  it("FieldTypeCompressedPubKey", () => {
    // uncompressed public keys are automatically compressed
    // const compressed = "0x02ca61293190ea272cf1b18a54e2dc2ec321ea26d6f339fe7d3521aee65ddb2163";
    const uncompressed = "0x04ca61293190ea272cf1b18a54e2dc2ec321ea26d6f339fe7d3521aee65ddb2163327eadbd840c110f125974cda960b0857cb0bbe493ab1ecdd7f6892f2da78020";
    // assertField(FieldTypeCompressedPubKey, compressed, compressed);
    assertField(FieldTypeCompressedPubKey, uncompressed, uncompressed);
  });

  it("FieldTypeWeightedPublicKeys", () => {
    // uncompressed public keys are automatically compressed in toRLP(), FieldTypeWeightedPublicKeys just parse and pass the raw value
    const compressed = "0x02ca61293190ea272cf1b18a54e2dc2ec321ea26d6f339fe7d3521aee65ddb2163";
    const uncompressed = "0x04ca61293190ea272cf1b18a54e2dc2ec321ea26d6f339fe7d3521aee65ddb2163327eadbd840c110f125974cda960b0857cb0bbe493ab1ecdd7f6892f2da78020";

    assertField(FieldTypeWeightedPublicKeys, [], []);
    assertField(FieldTypeWeightedPublicKeys,
      [[1, compressed], [2, uncompressed]],
      [{ key: compressed, weight: 1 }, { key: compressed, weight: 2 }]);
    assertField(FieldTypeWeightedPublicKeys,
      [{ key: compressed, weight: 1 }, [2, uncompressed]],
      [{ key: compressed, weight: 1 }, { key: compressed, weight: 2 }]);
  });

  it("FieldTypeAccountKeyList", () => {
    // each element is RLP-encoded
    const key1 = { type: 2, key: "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d" };
    const key2 = {
      type: 4, threshold: 2, keys: [
        [1, "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d"],
        [1, "0x0336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06"],
      ]
    };
    const key3 = { type: 2, key: "0x02c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447" };

    const key1RLP = "0x02a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d";
    const key2RLP = "0x04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06";
    const key3RLP = "0x02a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447";

    assertField(FieldTypeAccountKeyList, [], []);
    // FieldTypeAccountKeyList return object key and can accept both objects and strings tuple
    assertField(FieldTypeAccountKeyList, [key1RLP, key2RLP, key3RLP], [key1, {
      // should convert key to to object format
      type: 4,
      threshold: 2,
      keys: [
        {
          weight: 1,
          key: '0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d'
        },
        {
          weight: 1,
          key: '0x0336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06'
        }
      ]
    }, key3]);
    assertField(FieldTypeAccountKeyList, [key1, key2, key3], [key1, key2, key3]);

  });

  it("FieldTypeAccountKey", () => {
    assertField(FieldTypeAccountKey, { type: 0 }, "0x80");
    assertField(FieldTypeAccountKey, { type: 1 }, "0x01c0");
    assertField(FieldTypeAccountKey,
      { // Baobab tx 0x968a646e3ff05ebae17835045a77cf6871a00f8f74173cda7cc2b51c26b217dc
        type: 2,
        key: "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd"
      },
      "0x02a103dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd");
    assertField(FieldTypeAccountKey, { type: 3 }, "0x03c0");
    assertField(FieldTypeAccountKey,
      { // Baobab tx 0x9e08f40ff18a9eb296d21c066486f2838ff2934d0aca26cf84d8e0a2af76778d
        type: 4,
        threshold: 2,
        keys: [
          [1, "0x03f26489914098c5da51f0f646e3000da4d6197217df082b4f7ce1530f0a0cbf2a"],
          [1, "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd"],
          [1, "0x021473839f05083617d532325ce8aa40edffb2bc79f1ce17c77cc41f92f027dd82"],
        ]
      },
      "0x04f86f02f86ce301a103f26489914098c5da51f0f646e3000da4d6197217df082b4f7ce1530f0a0cbf2ae301a103dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cde301a1021473839f05083617d532325ce8aa40edffb2bc79f1ce17c77cc41f92f027dd82");
    assertField(FieldTypeAccountKey,
      { // Baobab tx 0xa2d249a56e660ecfb28cd0b945962eb41b036b028a16bb9926f5855a0506841a
        type: 5,
        keys: [
          { type: 2, key: "0x03f26489914098c5da51f0f646e3000da4d6197217df082b4f7ce1530f0a0cbf2a" },
          { type: 2, key: "0x0263021199702b9fefca617bdcb2a9ed4a810dfa8d270d4e804a1e778450e63ec3" },
          { type: 2, key: "0x03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd" },
        ]
      },
      "0x05f86ca302a103f26489914098c5da51f0f646e3000da4d6197217df082b4f7ce1530f0a0cbf2aa302a10263021199702b9fefca617bdcb2a9ed4a810dfa8d270d4e804a1e778450e63ec3a302a103dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd");
  });
});
