import { FieldSetFactory, Fields } from "../field";

import { AccountKeyType, HexStr, getTypePrefix, isKlaytnAccountKeyType } from "../util";
import { AccountKey, AccountKeyFail, AccountKeyLegacy, AccountKeyNil, AccountKeyPublic, AccountKeyRoleBased, AccountKeyWeightedMultiSig } from "./accountkey";



export class AccountKeyFactory extends FieldSetFactory<AccountKey> {
  constructor() {
    const requiredFields = ["type"];

    super(requiredFields);

    this.add(AccountKeyNil);
    this.add(AccountKeyLegacy);
    this.add(AccountKeyPublic);
    this.add(AccountKeyFail);
    this.add(AccountKeyWeightedMultiSig);
    this.add(AccountKeyRoleBased);
  }

  public static fromObject(fields: Fields): AccountKey {
    // In AccountKeyWeightedMultiSig, alias weightedPublicKeys -> keys for compatibility.
    // 'weightedPublicKeys' is used in caver and klaytn node.
    // 'keys' is used in this SDK.
    if (fields.type == AccountKeyType.WeightedMultiSig && fields.weightedPublicKeys) {
      fields.keys = fields.weightedPublicKeys;
    }
    const factory = new AccountKeyFactory();
    return factory.fromObject(fields);
  }

  public static fromRLP(rlp: string): AccountKey {
    const factory = new AccountKeyFactory();
    if (rlp == "0x80") { // special case without type prefix
      return factory.fromObject({ type: AccountKeyType.Nil });
    }

    const type = getTypePrefix(rlp);
    if (!isKlaytnAccountKeyType(type)) {
      throw new Error("Not a Klaytn account key");
    }

    const ctor = factory.lookup(type);
    const instance = new ctor();
    instance.setFieldsFromRLP(rlp);
    return instance;
  }
}

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