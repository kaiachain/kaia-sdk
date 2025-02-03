import { FieldSet } from "../field";
import { getSignatureTuple, HexStr, isFeePayerSigTxType, RLP, SignatureLike } from "../util";

export abstract class KlaytnTx extends FieldSet {
  // A Klaytn Tx has 4 kinds of RLP encoding:
  // - sigRLP is deifned for all TxTypes.
  // - txHashRLP is deifned for all TxTypes.
  // - sigFeePayerRLP is only defined for FeeDelegation and PartialFeeDelegation TxTypes.
  // - senderTxHashRLP equals to txHashRLP for all TxTypes except FeeDelegation and PartialFeeDelegation TxTypes.

  // //////////////////////////////////////////////////////////
  // Child classes MUST override below properties and methods

  // RLP encoding for sender to sign.
  abstract sigRLP(): string;
  // RLP encoding for broadcasting. Includes all signatures.
  abstract txHashRLP(): string;
  // Set its own fields from an RLP encoded string.
  abstract setFieldsFromRLP(rlp: string): void;

  // //////////////////////////////////////////////////////////
  // Child classes MAY override below methods

  // RLP encoding for fee payer to sign.
  sigFeePayerRLP(): string {
    if (!isFeePayerSigTxType(this.type)) {
      this.throwTypeError("sigFeePayerRLP not defined");
    } else {
      this.throwTypeError("sigFeePayerRLP not implemented");
    }
  }

  // RLP encoding with sender signature.
  senderTxHashRLP(): string {
    if (!isFeePayerSigTxType(this.type)) {
      return this.txHashRLP();
    } else {
      this.throwTypeError("senderTxHashRLP not implemented");
    }
  }

  // //////////////////////////////////////////////////////////
  // Child classes CANNOT override below methods

  // Add a signature
  addSenderSig(sig: SignatureLike) {
    const tuple = getSignatureTuple(sig);
    this.fields.txSignatures ||= [];
    this.fields.txSignatures.push(tuple);
  }

  // Add a signature as a feePayer
  addFeePayerSig(sig: SignatureLike) {
    const tuple = getSignatureTuple(sig);
    this.fields.feePayerSignatures ||= [];
    this.fields.feePayerSignatures.push(tuple);
  }

  // Helper for sigRLP and sigFeePayerRLP
  // encode([ encode(inner), outer, 0, 0 ])
  encodeNestedRLP(innerFieldNames: string[], outerFieldNames: string[]): string {
    const inner = this.getFields(innerFieldNames);
    const outer = this.getFields(outerFieldNames);
    return RLP.encode([
      RLP.encode(inner),
      ...outer,
      "0x",
      "0x",
    ]);
  }

  // Helper for senderTxHashRLP and txHashRLP
  // type + encode(fields)
  encodeTypePrefixedRLP(namesWithoutType: string[]): string {
    const fields = this.getFields(namesWithoutType);
    return HexStr.concat(
      this.getField("type"),
      RLP.encode(fields)
    );
  }

  // Helper for setFieldsFromRLP
  // Undo encodeTypePrefixedRLP and overwrite this.fields
  decodeTypePrefixedRLP(rlp: string, namesWithoutType: string[]): void {
    const type = HexStr.toNumber(rlp.substring(0, 4));
    if (type !== this.type) {
      this.throwTypeError(`Invalid type '${type}`);
    }

    const withoutType = "0x" + String(rlp).substring(4); // Strip type byte

    const names = ["type", ...namesWithoutType];
    const fields = [this.type, ...RLP.decode(withoutType)];
    this.setFieldsFromArray(names, fields);
  }

  // Helper for setFieldsFromRLP
  // Given multiple candidates for names[], use the one that matches the RLP decoded array length.
  decodeTypePrefixedVarlenRLP(rlp: string, ...namesCandidates: string[][]): void {
    // Decode the RLP without the type prefix
    const arrayLen = RLP.decode("0x" + rlp.substring(4)).length;

    // Find the 'names' list with matching length
    for (let i = 0; i < namesCandidates.length; i++) {
      const names = namesCandidates[i];
      if (arrayLen == names.length) {
        this.decodeTypePrefixedRLP(rlp, names);
        return;
      }
    }
    this.throwTypeError(`Invalid RLP string '${rlp}'`);
  }
}
