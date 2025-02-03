import {
  FieldTypeAccountKey,
  FieldTypeAddress,
  FieldTypeBool,
  FieldTypeBytes,
  FieldTypeSignatureTuples,
  FieldTypeUint256,
  FieldTypeUint64,
  FieldTypeUint8
} from "../field";
import { TxType } from "../util";
import { KlaytnTx } from "./abstract";


// https://docs.kaia.io/learn/transactions/basic#txtypevaluetransfer-
export class TxTypeValueTransfer extends KlaytnTx {
  static type = TxType.ValueTransfer;
  static typeName = "TxTypeValueTransfer";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/basic#txtypevaluetransfermemo-
export class TxTypeValueTransferMemo extends KlaytnTx {
  static type = TxType.ValueTransferMemo;
  static typeName = "TxTypeValueTransferMemo";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "data":         FieldTypeBytes,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/basic#txtypesmartcontractdeploy-
export class TxTypeSmartContractDeploy extends KlaytnTx {
  static type = TxType.SmartContractDeploy;
  static typeName = "TxTypeSmartContractDeploy";
  static fieldTypes = {
    "type":          FieldTypeUint8,
    "nonce":         FieldTypeUint64,
    "gasPrice":      FieldTypeUint256,
    "gasLimit":      FieldTypeUint64,
    "to":            FieldTypeAddress,
    "value":         FieldTypeUint256,
    "from":          FieldTypeAddress,
    "data":          FieldTypeBytes,
    "humanReadable": FieldTypeBool,
    "codeFormat":    FieldTypeUint8,
    "chainId":       FieldTypeUint64,
    "txSignatures":  FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/basic#txtypesmartcontractexecution-
export class TxTypeSmartContractExecution extends KlaytnTx {
  static type = TxType.SmartContractExecution;
  static typeName = "TxTypeSmartContractExecution";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "data":        FieldTypeBytes,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/basic#txtypeaccountupdate-
export class TxTypeAccountUpdate extends KlaytnTx {
  static type = TxType.AccountUpdate;
  static typeName = "TxTypeAccountUpdate";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "key":          FieldTypeAccountKey,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "key"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/basic#txtypecancel-
export class TxTypeCancel extends KlaytnTx {
  static type = TxType.Cancel;
  static typeName = "TxTypeCancel";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from"],
      ["chainId"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures"]);
  }
}