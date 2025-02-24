import { assert } from "chai";
import { describe, it } from "mocha";

import {
  AccountKey,
  AccountKeyFactory,
  AccountKeyNil,
  AccountKeyLegacy,
  AccountKeyPublic,
  AccountKeyFail,
  AccountKeyWeightedMultiSig,
  AccountKeyRoleBased,
  parseAccountKey,
  AccountKeyType,
} from "../src";
import { clone } from "lodash-es";

interface TestCase {
  title?: string,
  clazz: typeof AccountKey,
  object: any,
  canonical: any,
  rlp: string,
}

const testcases: TestCase[] = [
  {
    clazz: AccountKeyNil,
    object: { type: 0 },
    canonical: { type: "0x" },
    rlp: "0x80",
  },
  {
    clazz: AccountKeyLegacy,
    object: { type: 1 },
    canonical: { type: "0x01" },
    rlp: "0x01c0",
  },
  {
    clazz: AccountKeyPublic,
    object: {
      type: AccountKeyType.Public,
      key: "0x02dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8",
    },
    canonical: {
      type: "0x02",
      key: "0x02dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8",
    },
    rlp: "0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8",
  },
  {
    clazz: AccountKeyFail,
    object: { type: 3 },
    canonical: { type: "0x03" },
    rlp: "0x03c0",
  },
  {
    clazz: AccountKeyWeightedMultiSig,
    object: {
      type: AccountKeyType.WeightedMultiSig,
      threshold: 7,
      keys: [
        { weight: 1, key: "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e" },
        { weight: 2, key: "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb" },
        { weight: 3, key: "0x02ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd" },
        { weight: 4, key: "0x038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6" },
      ]
    },
    canonical: {
      type: "0x04",
      threshold: "0x07",
      keys: [
        { weight: 1, key: "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e" },
        { weight: 2, key: "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb" },
        { weight: 3, key: "0x02ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd" },
        { weight: 4, key: "0x038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6" }
      ]
    },
    rlp: "0x04f89307f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee302a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe303a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde304a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6",
  },
  {
    clazz: AccountKeyRoleBased,
    object: {
      type: 5,
      keys: [
        {
          type: AccountKeyType.Public,
          key: "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d"
        },
        {
          type: AccountKeyType.WeightedMultiSig,
          threshold: 2,
          keys: [
            { weight: 1, key: "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d" },
            { weight: 1, key: "0x0336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06" },
          ]
        },
        {
          type: AccountKeyType.Public,
          key: "0x02c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447"
        },
      ]
    },
    canonical: {
      type: "0x05",
      keys: [
        {
          type: AccountKeyType.Public,
          key: "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d"
        },
        {
          type: AccountKeyType.WeightedMultiSig,
          threshold: 2,
          keys: [
            { weight: 1, key: "0x03e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d" },
            { weight: 1, key: "0x0336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06" },
          ]
        },
        {
          type: AccountKeyType.Public,
          key: "0x02c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447"
        },
      ]
    },
    rlp: "0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447",
  }
];

describe("AccountKeyFactory", () => {
  for (const tc of testcases) {
    it(tc.clazz.name, () => {
      const object = clone(tc.object);

      const key = AccountKeyFactory.fromObject(object);
      // In some typescript version, the following error “Cannot assign an abstract constructor type to a non-abstract constructor type.” occurs in the line below.
      // @ts-ignore
      assert.instanceOf(key, tc.clazz);
      assert.deepEqual(key.toObject(), tc.canonical);
      assert.deepEqual(key.toRLP(), tc.rlp);
      assert.deepEqual(parseAccountKey(key.toRLP()), tc.object);
    });
  }

  it("AccountKeyWeightedMultiSig uncompressed public keys", () => {
    // uncompressed public keys are automatically compressed
    const key = AccountKeyFactory.fromObject({
      type: 4,
      threshold: 7,
      keys: [
        { weight: 1, key: "0x04c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712" },
        { weight: 2, key: "0x0412d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842" },
        { weight: 3, key: "0x04ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cdb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca" },
        { weight: 4, key: "0x048551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f64206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7" },
      ]
    });
    assert.deepEqual(key.toObject(), {
      type: "0x04",
      threshold: "0x07",
      keys: [
        { weight: 1, key: "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e" },
        { weight: 2, key: "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb" },
        { weight: 3, key: "0x02ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd" },
        { weight: 4, key: "0x038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6" }
      ]
    });
  });

  it("AccountKeyWeightedMultiSig array of tuples format", () => {
    // mixed tuple and object formats
    const key = AccountKeyFactory.fromObject({
      type: 4,
      threshold: 3,
      keys: [
        [1, "0x04c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712"],
        [2, "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb"],
        { weight: 3, key: "0x04ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cdb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca" },
        { weight: 4, key: "0x038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6" },
      ]
    });
    assert.deepEqual(key.toObject(), {
      type: "0x04",
      threshold: "0x03",
      keys: [
        { weight: 1, key: "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e" },
        { weight: 2, key: "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb" },
        { weight: 3, key: "0x02ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd" },
        { weight: 4, key: "0x038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6" }
      ]
    });
  });
});