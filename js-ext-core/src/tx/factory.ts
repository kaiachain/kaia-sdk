import { hexValue } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";
import { AccessList, Transaction as EthTransaction } from "ethers";

import { FieldSetFactory, Fields } from "../field/index.js";
import { HexStr, getTypePrefix, isKlaytnTxType, TxType } from "../util/index.js";
import { TxTypeFeeDelegatedAccountUpdate, TxTypeFeeDelegatedCancel, TxTypeFeeDelegatedSmartContractDeploy, TxTypeFeeDelegatedSmartContractExecution, TxTypeFeeDelegatedValueTransfer, TxTypeFeeDelegatedValueTransferMemo } from "./feedelegated.js";
import { TxTypeAccountUpdate, TxTypeCancel, TxTypeSmartContractDeploy, TxTypeSmartContractExecution, TxTypeValueTransfer, TxTypeValueTransferMemo } from "./basic.js";
import { TxTypeFeeDelegatedAccountUpdateWithRatio, TxTypeFeeDelegatedCancelWithRatio, TxTypeFeeDelegatedSmartContractDeployWithRatio, TxTypeFeeDelegatedSmartContractExecutionWithRatio, TxTypeFeeDelegatedValueTransferMemoWithRatio, TxTypeFeeDelegatedValueTransferWithRatio } from "./partialfeedelegated.js";
import { KlaytnTx } from "./abstract.js";


class _KlaytnTxFactory extends FieldSetFactory<KlaytnTx> {
  constructor() {
    const requiredFields = ["type", "chainId", "txSignatures"];
    super(requiredFields);

    this.add(TxTypeValueTransfer);
    this.add(TxTypeValueTransferMemo);
    this.add(TxTypeSmartContractDeploy);
    this.add(TxTypeSmartContractExecution);
    this.add(TxTypeAccountUpdate);
    this.add(TxTypeCancel);

    this.add(TxTypeFeeDelegatedValueTransfer);
    this.add(TxTypeFeeDelegatedValueTransferMemo);
    this.add(TxTypeFeeDelegatedSmartContractDeploy);
    this.add(TxTypeFeeDelegatedSmartContractExecution);
    this.add(TxTypeFeeDelegatedAccountUpdate);
    this.add(TxTypeFeeDelegatedCancel);

    this.add(TxTypeFeeDelegatedValueTransferWithRatio);
    this.add(TxTypeFeeDelegatedValueTransferMemoWithRatio);
    this.add(TxTypeFeeDelegatedSmartContractDeployWithRatio);
    this.add(TxTypeFeeDelegatedSmartContractExecutionWithRatio);
    this.add(TxTypeFeeDelegatedAccountUpdateWithRatio);
    this.add(TxTypeFeeDelegatedCancelWithRatio);
  }

  public fromObject(fields: Fields): KlaytnTx {
    // Alias input -> data for compatiblity
    if (fields.input) {
      fields.data = fields.input;
    }
    // In TxTypeSmartContractDeploy, force 'to' = 0x for compatibility
    if (HexStr.fromNumber(fields.type) == HexStr.fromNumber(TxType.SmartContractDeploy) ||
      HexStr.fromNumber(fields.type) == HexStr.fromNumber(TxType.FeeDelegatedSmartContractDeploy) ||
      HexStr.fromNumber(fields.type) == HexStr.fromNumber(TxType.FeeDelegatedSmartContractDeployWithRatio)) {
      fields.to = "0x";
    }
    return super.fromObject(fields);
  }

  public fromRLP(rlp: string): KlaytnTx {
    const type = getTypePrefix(rlp);
    if (!isKlaytnTxType(type)) {
      throw new Error("Not a Klaytn raw transaction");
    }
    const ctor = this.lookup(type);
    const instance = new ctor();
    instance.setFieldsFromRLP(rlp);
    return instance;
  }
}
export const KlaytnTxFactory = new _KlaytnTxFactory();
// Similar to ethers.js 'Transaction', but does not use BigNumber.
// All numbers are hexlified without leading zeros, suitable for RPC calls.
export interface ParsedTransaction {
  hash?: string;

  to?: string;
  from?: string;
  nonce: number;

  gasLimit: string;
  gasPrice?: string;

  data: string;
  value: string;
  chainId?: number;

  r?: string;
  s?: string;
  v?: number;

  // Typed-Transaction features
  type?: number | null;

  // EIP-2930; Type 1 & EIP-1559; Type 2
  accessList?: AccessList;

  // EIP-1559; Type 2
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;

  // Klaytn tx types
  key?: any;
  humanReadable?: boolean;
  codeFormat?: number;
  feePayer?: string;
  txSignatures?: any;
  feePayerSignatures?: any;
  feeRatio?: number;
}

/* eslint-disable no-multi-spaces */
export function parseTransaction(rlp: string): ParsedTransaction {
  const type = getTypePrefix(rlp);
  if (!isKlaytnTxType(type)) {
    const tx = EthTransaction.from(rlp);

    // eip1559
    const parsedTx: ParsedTransaction = {
      // ...tx,
      from: tx.from ?? undefined,
      to: tx.to ?? undefined,
      nonce: tx.nonce,
      data: tx.data,
      r: tx.signature?.r,
      s: tx.signature?.s,
      v: tx.signature?.v ?? undefined,
      hash: tx.hash ?? undefined,
      accessList: tx.accessList ?? undefined,
      chainId: Number(tx.chainId),
      type: tx?.type,
      // Convert BigNumber to hex string
      gasLimit: hexValue(tx.gasLimit),
      gasPrice: tx.gasPrice ? hexValue(tx.gasPrice) : undefined,
      value: hexValue(tx.value),
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? hexValue(tx.maxPriorityFeePerGas) : undefined,
      maxFeePerGas: tx.maxFeePerGas ? hexValue(tx.maxFeePerGas) : undefined,
    };
    if (typeof parsedTx.v === 'number') {
      // convert v to KAIA compatible
      parsedTx.v = parsedTx.v === 27 ? 0 : 1;
    }
    // Clean up 'explicit undefined' fields
    Object.entries(parsedTx).forEach(([key, value]) => {
      if (value === undefined) {
        delete (parsedTx as any)[key];
      }
    });
    return parsedTx;
  } else {
    const tx = KlaytnTxFactory.fromRLP(rlp).toObject();
    try {
      const parsedTx: ParsedTransaction = {
        hash: keccak256(rlp),
        to: tx.to ? HexStr.toAddress(tx.to) : undefined,
        from: tx.from ? HexStr.toAddress(tx.from) : undefined,
        nonce: HexStr.toNumber(tx.nonce),
        gasLimit: hexValue(tx.gasLimit),
        gasPrice: hexValue(tx.gasPrice),
        data: tx.data ?? "0x",
        value: hexValue(tx.value ?? 0),
        chainId: tx.chainId ? HexStr.toNumber(tx.chainId) : undefined,
        type: tx.type ? HexStr.toNumber(tx.type) : null,
        accessList: tx.accessList,
        key: tx.key,
        humanReadable: tx.humanReadable ? HexStr.toBoolean(tx.humanReadable) : undefined,
        codeFormat: tx.codeFormat ? HexStr.toNumber(tx.codeFormat) : undefined,
        feePayer: tx.feePayer ? HexStr.toAddress(tx.feePayer) : undefined,
        txSignatures: tx.txSignatures,
        feePayerSignatures: tx.feePayerSignatures,
        feeRatio: tx.feeRatio ? HexStr.toNumber(tx.feeRatio) : undefined,
      };
      // Clean up 'explicit undefined' fields
      Object.entries(parsedTx).forEach(([key, value]) => {
        if (value === undefined) {
          delete (parsedTx as any)[key];
        }
      });
      return parsedTx;
    } catch (e) {
      // In case conversion fails, return the original tx object.
      return tx as any;
    }
  }
}
/* eslint-enable no-multi-spaces */
