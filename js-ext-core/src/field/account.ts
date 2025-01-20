import { AccountKeyFactory } from "../accountkey";
import { HexStr, getCompressedPublicKey, isEmbeddableAccountKeyType } from "../util";
import { has, isArray, isString, map } from 'lodash-es'
import { FieldType } from "./common";


// Accepted types: A compressed (33-bytes) or uncompressed (65-bytes) public key
//                 in hex string or byte array
// Canonical type: A compressed (33-byte) public key in hex string
export const FieldTypeCompressedPubKey = new class implements FieldType {
  canonicalize(value: any): string {
    return getCompressedPublicKey(value);
  }

  emptyValue(): string { return "0x000000000000000000000000000000000000000000000000000000000000000000"; }
};

export type WeightedPublicKey = [string, string];

// Accepted types: An array of tuples [weight: number|string, publicKey: string]
//                 An array of objects { weight: number|string, publicKey: string }
// Canonical type: An array of hexlified tuples [weight: string, publicKey: string]
// Example canonical value:
// [
//   ["0x01", "0x02c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e"],
//   ["0x02", "0x0212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb"],
// ]
export const FieldTypeWeightedPublicKeys = new class implements FieldType {
  canonicalize(value: any): WeightedPublicKey[] {
    if (!isArray(value)) {
      throw new Error("Malformed WeightedPublicKeys");
    }

    return map(value, (tupleOrObject: any) => {
      if (isArray(tupleOrObject) && tupleOrObject.length == 2) {
        const tuple = tupleOrObject;
        return [
          HexStr.fromNumber(tuple[0]),
          getCompressedPublicKey(tuple[1])
        ] as WeightedPublicKey;
      } else if (has(tupleOrObject, "weight") && has(tupleOrObject, "key")) {
        const object = tupleOrObject;
        return [
          HexStr.fromNumber(object.weight),
          getCompressedPublicKey(object.key)
        ] as WeightedPublicKey;
      } else {
        throw new Error("Malformed WeightedPublicKeys");
      }
    });
  }

  emptyValue(): WeightedPublicKey[] { return []; }
};

// Accepted types: An array of AccountKeys in JS object format
//                 An array of AccountKeys in RLP format
// Canonical type: An array of AccountKeys in RLP format
// Example canonical value:
// [
//   "0x02a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d",
//   "0x04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06",
//   "0x02a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447",
// ]
export const FieldTypeAccountKeyList = new class implements FieldType {
  canonicalize(value: any): string[] {
    if (!isArray(value)) {
      throw new Error("Malformed RoleBasedKeys");
    }

    return map(value, (elem: any) => {
      if (isString(elem) && HexStr.isHex(elem)) { // pass RLP format
        return elem;
      } else { // encode JS object format
        const accountKey = AccountKeyFactory.fromObject(elem);
        if (!isEmbeddableAccountKeyType(accountKey.type)) {
          throw new Error(`AccountKeyType ${accountKey.type} cannot be inside an AccountKeyRoleBased`);
        }
        return accountKey.toRLP();
      }
    });
  }

  emptyValue(): string[] { return []; }
};

// Accepted types: An AccountKey in JS object or RLP format
// Canonical type: An AccountKey in RLP format
// Example canonical value:
// "0x02a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d",
export const FieldTypeAccountKey = new class implements FieldType {
  canonicalize(value: any): string {
    if (isString(value) && HexStr.isHex(value)) { // pass RLP format
      return value;
    } else { // encode JS object format
      return AccountKeyFactory.fromObject(value).toRLP();
    }
  }

  emptyValue(): string { return "0x80"; }
};