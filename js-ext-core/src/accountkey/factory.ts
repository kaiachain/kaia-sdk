import { hexValue } from "@ethersproject/bytes";

import { FieldSet, FieldSetFactory, Fields } from "../field";
import { AccountKeyType, HexStr, RLP, getTypePrefix, isKlaytnAccountKeyType } from "../util";

// A typed AccountKey for Kaia is a FieldSet.
// https://docs.kaia.io/learn/accounts/
export abstract class AccountKey extends FieldSet {
  // RLP encoding for constructing AccountUpdate transactions.
  abstract toRLP(): string;
  // Set its own fields from an RLP encoded string.
  abstract setFieldsFromRLP(rlp: string): void;
}

class _AccountKeyFactory extends FieldSetFactory<AccountKey> {
  constructor() {
    const requiredFields = ["type"];
    super(requiredFields);
  }

  public fromObject(fields: Fields): AccountKey {
    // In AccountKeyWeightedMultiSig, alias weightedPublicKeys -> keys for compatibility.
    // 'weightedPublicKeys' is used in caver and klaytn node.
    // 'keys' is used in this SDK.
    if (fields.type == AccountKeyType.WeightedMultiSig && fields.weightedPublicKeys) {
      fields.keys = fields.weightedPublicKeys;
    }
    return super.fromObject(fields);
  }

  public fromRLP(rlp: string): AccountKey {
    if (rlp == "0x80") { // special case without type prefix
      return this.fromObject({ type: AccountKeyType.Nil });
    }

    const type = getTypePrefix(rlp);
    if (!isKlaytnAccountKeyType(type)) {
      throw new Error("Not a Klaytn account key");
    }

    const ctor = this.lookup(type);
    const instance = new ctor();
    instance.setFieldsFromRLP(rlp);
    return instance;
  }
}
export const AccountKeyFactory = new _AccountKeyFactory();

export interface ParsedAccountKeyNil { type: AccountKeyType.Nil; }
export interface ParsedAccountKeyLegacy { type: AccountKeyType.Legacy; }
export interface ParsedAccountKeyPublic { type: AccountKeyType.Public; key: string; }
export interface ParsedAccountKeyFail { type: AccountKeyType.Fail; }
export interface ParsedAccountKeyWeightedMultiSig {
  type: AccountKeyType.WeightedMultiSig;
  threshold: number;
  keys: { weight: number, key: string }[];
}
export type ParsedAccountKeyEmbeddable =
  | ParsedAccountKeyNil
  | ParsedAccountKeyLegacy
  | ParsedAccountKeyPublic
  | ParsedAccountKeyFail
  | ParsedAccountKeyWeightedMultiSig;
export interface ParsedAccountKeyRoleBased {
  type: AccountKeyType.RoleBased;
  keys: ParsedAccountKeyEmbeddable[];
}
export type ParsedAccountKey =
  | ParsedAccountKeyEmbeddable
  | ParsedAccountKeyRoleBased;

export function parseAccountKey(rlp: string): ParsedAccountKey {
  const key = AccountKeyFactory.fromRLP(rlp);
  const canonical = key.toObject();

  if (key.type == AccountKeyType.Nil || key.type == AccountKeyType.Legacy || key.type == AccountKeyType.Fail) {
    return { type: key.type };
  }
  if (key.type == AccountKeyType.Public) {
    return { type: key.type, key: canonical.key };
  }
  if (key.type == AccountKeyType.WeightedMultiSig) {
    return {
      type: key.type,
      threshold: HexStr.toNumber(canonical.threshold),
      keys: canonical.keys.map((k: any) => ({ weight: HexStr.toNumber(k[0]), key: k[1] })),
    };
  }
  if (key.type == AccountKeyType.RoleBased) {
    return {
      type: key.type,
      keys: canonical.keys.map((k: any) => parseAccountKey(k)),
    };
  }

  throw new Error(`Unknown AccountKeyType ${key.type}`);
}