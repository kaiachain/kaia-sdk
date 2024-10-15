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
import { RLP, TxType } from "../util";

import { KlaytnTx } from "./factory";


// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedvaluetransferwithratio-
export class TxTypeFeeDelegatedValueTransferWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedValueTransferWithRatio;
  static typeName = "TxTypeFeeDelegatedValueTransferWithRatio";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "feeRatio":     FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, feeRatio]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([ encode([type, nonce, gasPrice, gas, to, value, from, feeRatio]), feePayer, chainid, 0, 0 ])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, feeRatio, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, feeRatio, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, feeRatio, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, feeRatio, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedvaluetransfermemowithratio-
export class TxTypeFeeDelegatedValueTransferMemoWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedValueTransferMemoWithRatio;
  static typeName = "TxTypeFeeDelegatedValueTransferMemoWithRatio";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "data":         FieldTypeBytes,
    "feeRatio":     FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, feeRatio]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, feeRatio]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedsmartcontractdeploywithratio-
export class TxTypeFeeDelegatedSmartContractDeployWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedSmartContractDeployWithRatio;
  static typeName = "TxTypeFeeDelegatedSmartContractDeployWithRatio";
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
    "feeRatio":     FieldTypeUint8,
    "codeFormat":   FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, feeRatio, codeFormat, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "humanReadable", "feeRatio", "codeFormat", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedsmartcontractexecutionwithratio-
export class TxTypeFeeDelegatedSmartContractExecutionWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedSmartContractExecutionWithRatio;
  static typeName = "TxTypeFeeDelegatedSmartContractExecutionWithRatio";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "to":           FieldTypeAddress,
    "value":        FieldTypeUint256,
    "from":         FieldTypeAddress,
    "data":        FieldTypeBytes,
    "feeRatio":     FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, feeRatio]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, feeRatio]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, feeRatio, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "to", "value", "from", "data", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}


// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedaccountupdatewithratio-
export class TxTypeFeeDelegatedAccountUpdateWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedAccountUpdateWithRatio;
  static typeName = "TxTypeFeeDelegatedAccountUpdateWithRatio";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "key":          FieldTypeAccountKey,
    "feeRatio":     FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, feeRatio, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "from", "key", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}

// https://docs.kaia.io/learn/transactions/partial-fee-delegation#txtypefeedelegatedcancelwithratio-
export class TxTypeFeeDelegatedCancelWithRatio extends KlaytnTx {
  static type = TxType.FeeDelegatedCancelWithRatio;
  static typeName = "TxTypeFeeDelegatedCancelWithRatio";
  static fieldTypes = {
    "type":         FieldTypeUint8,
    "nonce":        FieldTypeUint64,
    "gasPrice":     FieldTypeUint256,
    "gasLimit":     FieldTypeUint64,
    "from":         FieldTypeAddress,
    "feeRatio":     FieldTypeUint8,
    "chainId":      FieldTypeUint64,
    "txSignatures": FieldTypeSignatureTuples,
    "feePayer":     FieldTypeAddress,
    "feePayerSignatures": FieldTypeSignatureTuples,
  };

  // SigRLP = encode([encode([type, nonce, gasPrice, gas, from, feeRatio]), chainid, 0, 0])
  sigRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "feeRatio"],
      ["chainId"]);
  }

  // SigFeePayerRLP = encode([encode([type, nonce, gasPrice, gas, from, feeRatio]), feePayer, chainid, 0, 0])
  sigFeePayerRLP(): string {
    return this.encodeNestedRLP(
      ["type", "nonce", "gasPrice", "gasLimit", "from", "feeRatio"],
      ["feePayer", "chainId"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, feeRatio, txSignatures])
  senderTxHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "feeRatio", "txSignatures"]);
  }

  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, feeRatio, txSignatures, feePayer, feePayerSignatures])
  txHashRLP(): string {
    return this.encodeTypePrefixedRLP(
      ["nonce", "gasPrice", "gasLimit", "from", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }

  // SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, feeRatio, txSignatures])
  // TxHashRLP = type + encode([nonce, gasPrice, gas, from, feeRatio, txSignatures, feePayer, feePayerSignatures])
  setFieldsFromRLP(rlp: string): void {
    this.decodeTypePrefixedVarlenRLP(rlp,
      ["nonce", "gasPrice", "gasLimit", "from", "feeRatio", "txSignatures"],
      ["nonce", "gasPrice", "gasLimit", "from", "feeRatio", "txSignatures", "feePayer", "feePayerSignatures"]);
  }
}