import { camelCase, get, has, isNumber, isString, snakeCase, upperFirst } from "lodash-es";
import { HexStr } from "./data";

// Klaytn Type Enumeration
export enum TxType {
  // Basic
  ValueTransfer = 0x08,
  ValueTransferMemo = 0x10,
  AccountUpdate = 0x20,
  SmartContractDeploy = 0x28,
  SmartContractExecution = 0x30,
  Cancel = 0x38,

  // Fee Delegation
  FeeDelegatedValueTransfer = 0x09,
  FeeDelegatedValueTransferMemo = 0x11,
  FeeDelegatedAccountUpdate = 0x21,
  FeeDelegatedSmartContractDeploy = 0x29,
  FeeDelegatedSmartContractExecution = 0x31,
  FeeDelegatedCancel = 0x39,

  // Partial Fee Delegation
  FeeDelegatedValueTransferWithRatio = 0x0a,
  FeeDelegatedValueTransferMemoWithRatio = 0x12,
  FeeDelegatedAccountUpdateWithRatio = 0x22,
  FeeDelegatedSmartContractDeployWithRatio = 0x2a,
  FeeDelegatedSmartContractExecutionWithRatio = 0x32,
  FeeDelegatedCancelWithRatio = 0x3a,
}

// Parse Klaytn TxType in various formats including number (8),
// hex string (0x08), camel case string ("ValueTransfer"), and snake case string ("VALUE_TRANSFER").
type TxTypeLike = number | bigint | string | null | undefined;

export function parseTxType(type?: TxTypeLike): number {
  if (type === undefined || type === null) {
    type = 0;
  }

  if (typeof type === "bigint") {
    type = Number(type);
  }

  if (isNumber(type)) {
    return type;
  }

  if (isString(type) && type.length > 0) {
    // Try the hex string, e.g. "0x08"
    if (HexStr.isHex(type)) {
      return HexStr.toNumber(type);
    }
    // Try camel case string, e.g. "ValueTransfer", "TxTypeValueTransfer"
    // or snake case string, e.g. "VALUE_TRANSFER"
    let name = type;
    if (name.startsWith("TxType")) {
      name = name.substring(6);
    }
    name = upperFirst(camelCase(name));
    if (has(TxType, name)) {
      return get(TxType, name);
    }
  }

  throw new Error(`Unrecognized tx type '${type}'. Expected a number.'`);
}

// Convert Klaytn TxType to what Kaikas wallet (https://docs.kaikas.io/) understands.
// Pass-through undefined and non-Klaytn TxTypes.
// Convert Klaytn TxTypes to upper and snake case string (e.g. "VALUE_TRANSFER").
export function getKaikasTxType(type?: TxTypeLike): number | string | undefined {
  const num = parseTxType(type);
  if (!isKlaytnTxType(num)) {
    return num;
  } else {
    const name = TxType[num];
    return snakeCase(name).toUpperCase();
  }
}

// Returns true for Klaytn TxType.
export function isKlaytnTxType(type?: number): boolean {
  return !!type && (type in TxType);
}
// Returns true for Klaytn Basic (i.e. not fee delegated) TxType.
export function isBasicTxType(type?: number): boolean {
  return !!type && (type in TxType) && ((type & 0x3) == 0x0);
}
// Returns true for Klaytn Fee Delegated TxType.
export function isFeeDelegationTxType(type?: number): boolean {
  return !!type && (type in TxType) && ((type & 0x3) == 0x1);
}
// Returns true for Klaytn Partial Fee Delegated (i.e. with ratio) TxType.
export function isPartialFeeDelegationTxType(type?: number): boolean {
  return !!type && (type in TxType) && ((type & 0x3) == 0x2);
}
// Returns true for Klaytn TxType with feePayer feature (i.e. fee delegation or partial fee delegation).
export function isFeePayerSigTxType(type?: number): boolean {
  return isFeeDelegationTxType(type) || isPartialFeeDelegationTxType(type);
}

export enum AccountKeyType {
  // Account Key Type
  Nil = 0x00,
  Legacy = 0x01,
  Public = 0x02,
  Fail = 0x03,
  WeightedMultiSig = 0x04,
  RoleBased = 0x05
}

// Returns true for Klaytn AccountKeyType.
export function isKlaytnAccountKeyType(type?: number): boolean {
  return !!type && (type in AccountKeyType);
}
// Returns true for AccountKeyTypes that can be embedded in an AccountKeyRoleBased
// (i.e. AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, and AccountKeyWeightedMultiSig)
export function isEmbeddableAccountKeyType(type?: number): boolean {
  return !!type && (type in AccountKeyType) && (type != AccountKeyType.RoleBased);
}

export const CodeFormatEVM = 0x00;
