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
import {  TxType } from "../util";
import { KlaytnTx } from "./abstract";


// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedvaluetransfer-
export class TxTypeFeeDelegatedValueTransfer extends KlaytnTx {
  static type = TxType.FeeDelegatedValueTransfer;
  static typeName = "TxTypeFeeDelegatedValueTransfer";
  static fieldTypes = {
    "type":               FieldTypeUint8,
    "nonce":              FieldTypeUint64,
    "gasPrice":           FieldTypeUint256,
    "gasLimit":           FieldTypeUint64,
    "to":                 FieldTypeAddress,
    "value":              FieldTypeUint256,
    "from":               FieldTypeAddress,
    "chainId":            FieldTypeUint64,
    "txSignatures":       FieldTypeSignatureTuples,
    "feePayer":           FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from]), feePayer, chainid, 0, 0 ])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
  // TxHashRLP       = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedvaluetransfermemo-
export class TxTypeFeeDelegatedValueTransferMemo extends KlaytnTx {
  static type = TxType.FeeDelegatedValueTransferMemo;
  static typeName = "TxTypeFeeDelegatedValueTransferMemo";
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
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedsmartcontractdeploy-
export class TxTypeFeeDelegatedSmartContractDeploy extends KlaytnTx {
  static type = TxType.FeeDelegatedSmartContractDeploy;
  static typeName = "TxTypeFeeDelegatedSmartContractDeploy";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "data":        FieldTypeBytes,
    "humanReadable": FieldTypeBool,
    "codeFormat":   FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "codeFormat", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}


// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedsmartcontractexecution-
export class TxTypeFeeDelegatedSmartContractExecution extends KlaytnTx {
  static type = TxType.FeeDelegatedSmartContractExecution;
  static typeName = "TxTypeFeeDelegatedSmartContractExecution";
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
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedaccountupdate-
export class TxTypeFeeDelegatedAccountUpdate extends KlaytnTx {
  static type = TxType.FeeDelegatedAccountUpdate;
  static typeName = "TxTypeFeeDelegatedAccountUpdate";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "key":          FieldTypeAccountKey,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "key"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "key"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "from", "key", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/fee-delegation#txtypefeedelegatedcancel-
export class TxTypeFeeDelegatedCancel extends KlaytnTx {
  static type = TxType.FeeDelegatedCancel;
  static typeName = "TxTypeFeeDelegatedCancel";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, from]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "from", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}