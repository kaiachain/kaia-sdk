import { SignatureLike as EthersSignatureLike, Signature, splitSignature } from "@ethersproject/bytes";
import { ec } from "elliptic";

import { HexStr } from "./data";
import { isArray, isString } from "lodash-es";

const secp256k1 = new ec("secp256k1");

// Returns a 33-byte compressed public key from a private key.
export function getPublicKeyFromPrivate(privateKey: string): string {
  const key = secp256k1.keyFromPrivate(HexStr.stripHexPrefix(privateKey), "hex");
  return getCompressedPublicKey(key.getPublic(true, "hex"));
}

// Returns a 33-byte compressed public key from
// a compressed (33-byte), uncompressed (65-byte) public key,
// or an object { x, y } (each 32-byte).
export function getCompressedPublicKey(pub: any): string {
  if (pub instanceof Uint8Array) {
    pub = HexStr.from(pub);
  }

  if (isString(pub)) { // Hex string
    const hex = HexStr.from(HexStr.withHexPrefix(pub));
    if (HexStr.isHex(hex, 33) || HexStr.isHex(hex, 65)) {
      const serialized = HexStr.stripHexPrefix(hex);
      const pubkey = secp256k1.keyFromPublic(serialized, "hex");
      return "0x" + pubkey.getPublic(true, "hex");
    }
  }

  if (isString(pub.x) && isString(pub.y)) {
    pub.x = HexStr.stripHexPrefix(pub.x);
    pub.y = HexStr.stripHexPrefix(pub.y);
    const pubkey = secp256k1.keyFromPublic(pub);
    return "0x" + pubkey.getPublic(true, "hex");
  }

  throw new Error("Public key must be a hex string of 33 or 65 bytes, or an { x, y } object");
}

// List of signature tuples used in Klaytn transactions.
// All elements must be string for RLP encoding.
export type SignatureTuple = [string, string, string];

// All kinds of ECDSA signatures returned from various libraries.
export type SignatureLike =
  EthersSignatureLike | // { r, s, v } or { r, s, recoveryParam }
  string | // compact signature
  string[]; // [v, r, s]

// If the sig is an array, the first element 'v' must be one of:
// - pre-EIP-155 v: {27, 28}
// - EIP-155 v: {27, 28} + chainId*8 + 2
//
// If the sig is in object form, it must have one of:
// - sig.recoveryParam: {0, 1}
// - sig.v
//   - pre-EIP-155 v: {27, 28}
//   - EIP-155 v: {27, 28} + chainId*8 + 2
//
// If the sig is bytes, it must be 64 or 65 bytes.
//
// Returns a [v,r,s] tuple composed of only strings. For example, [
//   "0x1b",
//   "0x66809fb130a6ea4ae4e823baa92573a5f1bfb4e88e64048aecfb18a2b4012b99",
//   "0x75c2c3e5f7b0a182c767137c488649cd5104a5e747371fd922d618e328e5c508",
// ]
export function getSignatureTuple(sig: SignatureLike): SignatureTuple {
  // Pass through splitSignature() for sanity check
  let obj: Signature;
  if (isArray(sig)) {
    if (sig.length != 3) {
      throw new Error("Signature tuple must have 3 elements [v,r,s]");
    }
    const numV = HexStr.toNumber(sig[0]);
    obj = splitSignature({ v: numV, r: sig[1], s: sig[2] });
  } else {
    obj = splitSignature(sig);
  }

  // R and S must not have leading zeros
  // c.f. https://github.com/ethers-io/ethers.js/blob/v5/packages/transactions/src.ts/index.ts#L298
  return [
    HexStr.fromNumber(obj.v),
    HexStr.stripZeros(obj.r),
    HexStr.stripZeros(obj.s),
  ];
}

// Extract chainId from tx.txSignatures[] or tx.feePayerSignatures[].
// It works because Klaytn TxType signatures are always EIP-155.
// Returns undefined if chainId cannot be extracted. Use other methods like RPC to get chainId.
export function getChainIdFromSignatureTuples(signatures?: any[]): number | undefined {
  if (!isArray(signatures) || signatures.length == 0) {
    return undefined;
  }

  const signature = signatures[0];
  if (!isArray(signature) || signature.length != 3) {
    return undefined;
  }

  const strV = signature[0];
  if (!HexStr.isHex(strV)) {
    return undefined;
  }

  // v           = 2 * chainId + {35, 36}
  // v + (v % 2) = 2 * chainId + 36
  const v = HexStr.toNumber(strV);
  if (v >= 35) {
    return (v + (v % 2) - 36) / 2;
  } else {
    return undefined;
  }
}
