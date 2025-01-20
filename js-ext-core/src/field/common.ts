import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";

import { HexStr, SignatureLike, SignatureTuple, getSignatureTuple } from "../util";
import { map } from "lodash-es";

export class FieldError extends Error {
  constructor(ty: FieldType, name: string, value: any) {
    const message = `Cannot assign value '${value}' to field '${name}' of type '${ty.constructor.name}'`;
    super(message);
    this.name = "FieldError";
  }
}

// A FieldType represents a RLP-encodable field in a FieldSet.
export interface FieldType {
  // convert into the canonical form, to be RLP-encoded.
  canonicalize(value: any): any;
  // default empty value in canonical form.
  emptyValue(): any;
}

// Tuples of [name, type]
export interface FieldTypes {
  [name: string]: FieldType;
}

// Tuples of [name, value]
export interface Fields {
  [name: string]: any;
}

// //////////////////////////////////////////////////////////
// Common field types

// Accepted types: hex string of an address
// Canonical type: hex string of checksumed address
export const FieldTypeAddress = new class implements FieldType {
  canonicalize(value: any): string {
    if (value === "0x") {
      return "0x";
    }
    return getAddress(value);
  }

  emptyValue(): string { return "0x"; }
};


// Accepted types: hex string, byte array
// Canonical type: hex string
export const FieldTypeBytes = new class implements FieldType {
  canonicalize(value: any): string { return HexStr.from(value); }
  emptyValue(): string { return "0x"; }
};

// Accepted types: JS number, JS bigint, BigNumber class, hex-encoded string
// Canonical type: hex string
export class FieldTypeNumberBits implements FieldType {
  maxBits: number;
  maxBN: BigNumber;
  constructor(maxBits?: number) {
    if (!maxBits) {
      maxBits = 256;
    }
    this.maxBits = maxBits;
    this.maxBN = BigNumber.from(2).pow(maxBits);
  }

  canonicalize(value: any): string {
    if (value === "0x") {
      value = 0;
    }
    const bn = BigNumber.from(value);

    if (bn.gte(this.maxBN)) {
      throw new Error(`Number exceeds ${this.maxBits} bits`);
    }

    if (bn.isZero()) {
      // BigNumber.from(0).toHexString() returns '0x00',
      // but RLP encoder expects '0x'.
      return "0x";
    }
    return bn.toHexString();
  }

  emptyValue(): string { return "0x"; }
}
export const FieldTypeUint8 = new FieldTypeNumberBits(8);
export const FieldTypeUint32 = new FieldTypeNumberBits(32);
export const FieldTypeUint64 = new FieldTypeNumberBits(64);
export const FieldTypeUint256 = new FieldTypeNumberBits(256);

// Accepted types: boolean-like values, hex-encoded string
// Canonical type: "0x01" for true, "0x" for false
export const FieldTypeBool = new class implements FieldType {
  canonicalize(value: any): string {
    if (value === "0x01" || value === "0x") {
      return value;
    }
    return value ? "0x01" : "0x";
  }

  emptyValue(): string { return "0x"; }
};

// Accepted types: An array of [v,r,s] tuple, {v,r,s} object, serialized bytes
// Canonical type: An array of [v,r,s] tuple
export const FieldTypeSignatureTuples = new class implements FieldType {
  canonicalize(value: SignatureLike[]): SignatureTuple[] {
    return map(value, getSignatureTuple);
  }

  emptyValue(): SignatureTuple[] { return []; }
};