
import { FieldSet, FieldTypeAccountKeyList, FieldTypeCompressedPubKey, FieldTypeUint32, FieldTypeUint8, FieldTypeWeightedPublicKeys } from "../field/index.js";
import { AccountKeyType } from "../util/const.js";
import { convertKeysToRLP, decodeObjectFromRLP, GetHexlifyRLP } from "../util/rlp.js";

// A typed AccountKey for Kaia is a FieldSet.
// https://docs.kaia.io/learn/accounts/
export abstract class AccountKey extends FieldSet {
  // RLP encoding for constructing AccountUpdate transactions.
  abstract toRLP(): string;
  // Set its own fields from an RLP encoded string.
  abstract setFieldsFromRLP(rlp: string): void;
}
// https://docs.kaia.io/learn/accounts/#accountkeynil-
export class AccountKeyNil extends AccountKey {
  static type = AccountKeyType.Nil;
  static typeName = "AccountKeyNil";
  static fieldTypes = {
    "type": FieldTypeUint8,
  };

  toRLP(): string {
    return convertKeysToRLP({ type: AccountKeyType.Nil });
  }

  setFieldsFromRLP(rlp: string): void {
    if (rlp !== "0x80") {
      this.throwTypeError(`Invalid RLP string '${rlp}'`);
    }
    this.setFields({ type: AccountKeyType.Nil });
  }
}

// https://docs.kaia.io/learn/accounts/#accountkeylegacy-
export class AccountKeyLegacy extends AccountKey {
  static type = AccountKeyType.Legacy;
  static typeName = "AccountKeyLegacy";
  static fieldTypes = {
    "type": FieldTypeUint8,
  };

  toRLP(): string {
    return convertKeysToRLP({ type: AccountKeyType.Legacy });
  }

  setFieldsFromRLP(rlp: string): void {
    if (rlp !== "0x01c0") {
      this.throwTypeError(`Invalid RLP string '${rlp}'`);
    }
    this.setFields({ type: AccountKeyType.Legacy });
  }
}

// https://docs.kaia.io/learn/accounts/#accountkeypublic-
export class AccountKeyPublic extends AccountKey {
  static type = AccountKeyType.Public;
  static typeName = "AccountKeyPublic";
  static fieldTypes = {
    "type": FieldTypeUint8,
    "key": FieldTypeCompressedPubKey,
  };

  // 0x02 + encode(CompressedPubKey)
  toRLP(): string {
    const rawRLP = convertKeysToRLP({ key: this.getField("key"), type: AccountKeyType.Public })
    return GetHexlifyRLP(AccountKeyType.Public, rawRLP);
  }

  setFieldsFromRLP(rlp: string): void {
    const { type, key } = decodeObjectFromRLP(rlp)
    if (type !== this.type) {
      this.throwTypeError(`Invalid type '${type}`);
    }
    this.setFields({ type, key });
  }
}

// https://docs.kaia.io/learn/accounts/#accountkeyfail-
export class AccountKeyFail extends AccountKey {
  static type = AccountKeyType.Fail;
  static typeName = "AccountKeyFail";
  static fieldTypes = {
    "type": FieldTypeUint8,
  };

  toRLP(): string {
    return convertKeysToRLP({ type: AccountKeyType.Fail });
  }

  setFieldsFromRLP(rlp: string): void {
    if (rlp !== "0x03c0") {
      this.throwTypeError(`Invalid RLP string '${rlp}'`);
    }
    this.setFields({ type: AccountKeyType.Fail });
  }
}

// https://docs.kaia.io/learn/accounts/#accountkeyweightedmultisig-
export class AccountKeyWeightedMultiSig extends AccountKey {
  static type = AccountKeyType.WeightedMultiSig;
  static typeName = "AccountKeyWeightedMultiSig";
  static fieldTypes = {
    "type": FieldTypeUint8,
    "threshold": FieldTypeUint32,
    "keys": FieldTypeWeightedPublicKeys,
  };

  // 0x04 + encode([threshold, [[weight1, compressedPubKey1], [weight2, compressedPubKey2]]])
  toRLP(): string {
    const [threshold, keys] = this.getFields(["threshold", "keys"]);
    const rawRLP = convertKeysToRLP({ threshold, keys, type: AccountKeyType.WeightedMultiSig })
    return GetHexlifyRLP(AccountKeyType.WeightedMultiSig, rawRLP);
  }

  setFieldsFromRLP(rlp: string): void {
    const { type, keys, threshold } = decodeObjectFromRLP(rlp)
    if (type !== this.type) {
      this.throwTypeError(`Invalid type '${type}`);
    }
    this.setFields({ type, threshold, keys });
  }
}


// https://docs.kaia.io/learn/accounts/#accountkeyrolebased-
export class AccountKeyRoleBased extends AccountKey {
  static type = AccountKeyType.RoleBased;
  static typeName = "AccountKeyRoleBased";
  static fieldTypes = {
    "type": FieldTypeUint8,
    "keys": FieldTypeAccountKeyList,
  };

  // 0x05 + encode([key1, key2, key3])
  // = 0x05 + encode(keys)
  toRLP(): string {
    const inner = this.getField("keys");
    const rawRLP = convertKeysToRLP({ type: AccountKeyType.RoleBased, keys: inner })
    return GetHexlifyRLP(AccountKeyType.RoleBased, rawRLP);
  }

  setFieldsFromRLP(rlp: string): void {
    const { type, keys } = decodeObjectFromRLP(rlp)
    if (type !== this.type) {
      this.throwTypeError(`Invalid type '${type}`);
    }
    this.setFields({ type, keys });

  }
}
