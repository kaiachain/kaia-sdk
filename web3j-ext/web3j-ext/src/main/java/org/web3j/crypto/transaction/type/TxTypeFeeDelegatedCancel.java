package org.web3j.crypto.transaction.type;

import java.math.BigInteger;
import java.util.List;

import org.web3j.crypto.Sign.SignatureData;
import org.web3j.rlp.RlpDecoder;
import org.web3j.rlp.RlpList;
import org.web3j.rlp.RlpString;
import org.web3j.rlp.RlpType;
import org.web3j.utils.KaiaTransactionUtils;
import org.web3j.utils.Numeric;

public class TxTypeFeeDelegatedCancel extends TxTypeFeeDelegate {

    protected TxTypeFeeDelegatedCancel(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from) {
        super(type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
    }

    public static TxTypeFeeDelegatedCancel createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from) {
        return new TxTypeFeeDelegatedCancel(type, nonce, gasPrice, gasLimit, from);
    }

    protected TxTypeFeeDelegatedCancel(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
    }

    public static TxTypeFeeDelegatedCancel createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from) {
        return new TxTypeFeeDelegatedCancel(chainId, type, nonce, gasPrice, gasLimit, from);
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit and from.
     * List elements can be different depending on transaction type.
     *
     * @return List RlpType List
     */
    @Override
    public List<RlpType> rlpValues() {
        List<RlpType> values = super.rlpValues();
        values.add(RlpString.create(Numeric.hexStringToByteArray(getFrom())));
        return values;
    }

    /**
     * This method is overridden as FEE_DELEGATED_CANCEL type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public Type getKaiaType() {
        return Type.FEE_DELEGATED_CANCEL;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedCancel decoded transaction
     */
    public static TxTypeFeeDelegatedCancel decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures,
        // feePayer, feePayerSignatures])
        try {
            byte[] rawTransactionExceptType = KaiaTransactionUtils.getRawTransactionNoType(rawTransaction);

            RlpList rlpList = RlpDecoder.decode(rawTransactionExceptType);
            List<RlpType> values = ((RlpList) rlpList.getValues().get(0)).getValues();
            BigInteger nonce = ((RlpString) values.get(0)).asPositiveBigInteger();
            BigInteger gasPrice = ((RlpString) values.get(1)).asPositiveBigInteger();
            BigInteger gasLimit = ((RlpString) values.get(2)).asPositiveBigInteger();
            String from = ((RlpString) values.get(3)).asString();
            TxType.Type type = Type.FEE_DELEGATED_CANCEL;

            TxTypeFeeDelegatedCancel tx = TxTypeFeeDelegatedCancel.createTransaction(type, nonce, gasPrice, gasLimit,
                    from);
            tx.addSignatureData(values, 4);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedCancel decoded transaction
     */
    public static TxTypeFeeDelegatedCancel decodeFromRawTransaction(String rawTransaction) {
        return decodeFromRawTransaction(Numeric.hexStringToByteArray(Numeric.cleanHexPrefix(rawTransaction)));
    }

    @Override
    public List<RlpType> asRlpValues(SignatureData signatureData) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'asRlpValues'");
    }

    @Override
    public String getData() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getData'");
    }

    @Override
    public TransactionType getType() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getType'");
    }
}