import { RLP } from "@ethereumjs/rlp";
import { KlaytnTxFactory, TxType, isFeePayerSigTxType, KlaytnTx as CoreKlaytnTx } from "@kaiachain/js-ext-core";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import * as ethereumCryptography from "ethereum-cryptography/secp256k1.js";
import { Transaction as LegacyTransaction, TxOptions, ECDSASignature } from "web3-eth-accounts";
import { bytesToHex, hexToBytes, toHex, toNumber, numberToHex, toBigInt } from "web3-utils";

import { KlaytnTxData } from "../types";

export const secp256k1 = ethereumCryptography.secp256k1 ?? ethereumCryptography;


// Mimics the LegacyTransaction.
// See web3-eth-accounts/src/tx/legacyTransaction.ts
// and web3-eth-accounts/src/tx/baseTransaction.ts
export class KlaytnTypedTransaction extends LegacyTransaction {
  // Override 'type' field (actually a getter) because LegacyTransaction.type is always 0.
  private readonly _klaytnType: number;
  public override get type(): number {
    return this._klaytnType;
  }

  // Additional fields not in LegacyTransaction
  public readonly from?: string;
  public readonly chainId?: bigint;
  public readonly key?: any;
  public readonly feePayer?: string;
  public readonly feePayer_v?: bigint;
  public readonly feePayer_r?: bigint;
  public readonly feePayer_s?: bigint;
  public readonly txSignatures?: any;
  public readonly feePayerSignatures?: any;
  public readonly feeRatio?: number;

  // The CoreKlaytnTx object to be used to calculate RLP encoding.
  private readonly coreKlaytnTx: CoreKlaytnTx;

  // This constructor creates a frozen read-only transaction object out of TxData.
  // Any modifications to the fields (e.g. adding the signature) should involve
  // the construction of a new object, rather than modifying the fields directly.
  public constructor(txData: KlaytnTxData, txOptions: TxOptions = {}) {
    // Allow adding new fields inside constructor.
    const savedFreeze = txOptions.freeze;
    txOptions.freeze = false;

    // Construct LegacyTransaction and parse TxData fields
    super(txData, txOptions);

    // Parse KlaytnTxData fields
    if (!txData.type) {
      // Should not reach here because KlaytnTx is selected via explicit type field.
      throw new Error("Missing 'type' field");
    }
    this._klaytnType = toNumber(txData.type) as number;
    this.from = txData.from;
    this.chainId = txData.chainId;
    this.key = txData.key;
    this.feePayer = txData.feePayer;
    this.feePayer_v = txData.feePayer_v;
    this.feePayer_r = txData.feePayer_r;
    this.feePayer_s = txData.feePayer_s;
    this.txSignatures = txData.txSignatures;
    this.feePayerSignatures = txData.feePayerSignatures;
    this.feeRatio = txData.feeRatio;

    // Build the inner CoreKlaytnTx object.

    // Convert to type understood by CoreKlaytnTx.
    const klaytnTxObject = {
      type:               toHex(this.type || 0),
      nonce:              toHex(this.nonce),
      gasPrice:           toHex(this.gasPrice),
      gasLimit:           toHex(this.gasLimit),
      to:                 this.to ? bytesToHex(this.to.toString()) : undefined,
      value:              toHex(this.value),
      from:               this.from,
      data:               bytesToHex(this.data),
      input:              bytesToHex(this.data),
      chainId:            this.chainId ? toHex(this.chainId) : undefined,
      humanReadable:      false,
      codeFormat:         0x00,
      key:                this.key,
      feePayer:           this.feePayer,
      txSignatures:       this.txSignatures,
      feePayerSignatures: this.feePayerSignatures,
      feeRatio:           this.feeRatio,
    };

    if (txData.type == TxType.SmartContractDeploy ||
      txData.type == TxType.FeeDelegatedSmartContractDeploy ||
      txData.type == TxType.FeeDelegatedSmartContractDeployWithRatio) {
      klaytnTxObject.to = "0x0000000000000000000000000000000000000000";
    }

    this.coreKlaytnTx = KlaytnTxFactory.fromObject(klaytnTxObject);

    if (this.v && this.r && this.s) {
      this.coreKlaytnTx.addSenderSig({
        v: Number(this.v),
        r: numberToHex(this.r),
        s: numberToHex(this.s),
      });
    }

    if (this.feePayer_v && this.feePayer_r && this.feePayer_s) {
      this.coreKlaytnTx.addFeePayerSig({
        v: Number(this.feePayer_v),
        r: numberToHex(this.feePayer_r),
        s: numberToHex(this.feePayer_s),
      });
    }

    // Resume the freeze behavior at the end of LegacyTransaction.constructor().
    this.txOptions.freeze = savedFreeze;
    if (this.txOptions.freeze ?? true) {
      Object.freeze(this);
    }
  }

  // Return sender signing message. i.e. SigRLP
  public getMessageToSign(hashMessage: false): Uint8Array[];
  public getMessageToSign(hashMessage?: true): Uint8Array;
  public getMessageToSign(hashMessage = true) {
    const rlp = hexToBytes(this.coreKlaytnTx.sigRLP());
    if (hashMessage) {
      return keccak256(rlp); // Hashed Uint8Array
    } else {
      return RLP.decode(rlp); // RLP-decoded Uint8Array[]
    }
  }

  // Return feePayer signing message. i.e. sigFeePayerRLP
  public getMessageToSignAsFeePayer(hashMessage: false): Uint8Array[];
  public getMessageToSignAsFeePayer(hashMessage?: true): Uint8Array;
  public getMessageToSignAsFeePayer(hashMessage = true) {
    const rlp = hexToBytes(this.coreKlaytnTx.sigFeePayerRLP());
    if (hashMessage) {
      return keccak256(rlp); // Hashed Uint8Array
    } else {
      return RLP.decode(rlp); // RLP-decoded Uint8Array[]
    }
  }

  // Return a new KlaytnTx object with the (v,r,s) signature added.
  public sign(privateKey: Uint8Array): KlaytnTypedTransaction {
    if (privateKey.length !== 32) {
      const msg = this._errorMsg("Private key must be 32 bytes in length.");
      throw new Error(msg);
    }
    if (!this.chainId) {
      // shouldn't reach here because chainId is required in every Klaytn TxType.
      // The chainId should have been supplied by user or filled at prepareTransaction().
      throw new Error("Missing 'chainId' field");
    }

    const msgHash = this.getMessageToSign(true);
    const { r, s, v } = this._eip155sign(msgHash, privateKey, this.chainId);

    return new KlaytnTypedTransaction({
      ...this,
      type: this.type, // The '...this' expression does not include this.type because 'type()' a getter.
      v: v,
      r: toBigInt(bytesToHex(r)),
      s: toBigInt(bytesToHex(s)),
    }, this.txOptions);
  }

  // Analogous to sign(), but uses *AsFeePayer methods.
  // See web3-eth-accounts/src/tx/baseTransaction.ts:sign()
  public signAsFeePayer(privateKey: Uint8Array): KlaytnTypedTransaction {
    if (privateKey.length !== 32) {
      const msg = this._errorMsg("Private key must be 32 bytes in length.");
      throw new Error(msg);
    }
    if (!this.chainId) {
      // shouldn't reach here because chainId is required in every Klaytn TxType.
      // The chainId should have been supplied by user or filled at prepareTransaction().
      throw new Error("Missing 'chainId' field");
    }

    const msgHash = this.getMessageToSignAsFeePayer(true);
    const { v, r, s } = this._eip155sign(msgHash, privateKey, this.chainId);

    return new KlaytnTypedTransaction({
      ...this,
      type: this.type, // The '...this' expression does not include this.type because 'type()' is a getter.
      feePayer_v: v,
      feePayer_r: toBigInt(bytesToHex(r)),
      feePayer_s: toBigInt(bytesToHex(s)),
    }, this.txOptions);
  }

  // Return the sender-signed raw transaction. i.e. SenderTxHashRLP or TxHashRLP
  public serialize(): Uint8Array {
    if (isFeePayerSigTxType(this.type)) {
      return hexToBytes(this.coreKlaytnTx.senderTxHashRLP());
    }
    return hexToBytes(this.coreKlaytnTx.txHashRLP());
  }

  // Return the feePayer-signed raw transaction. i.e. TxHashRLP
  public serializeAsFeePayer(): Uint8Array {
    return hexToBytes(this.coreKlaytnTx.txHashRLP());
  }

  // Recreating BaseTransaction._ecsign because that's private.
  private _eip155sign(msgHash: Uint8Array, privateKey: Uint8Array, chainId: bigint): ECDSASignature {
    const signature = secp256k1.sign(msgHash, privateKey);
    const signatureBytes = signature.toCompactRawBytes();

    const r = signatureBytes.subarray(0, 32);
    const s = signatureBytes.subarray(32, 64);
    const recoveryParam = signature.recovery;
    const v = BigInt(recoveryParam + 35) + chainId * BigInt(2);
    return { v, r, s };
  }
}