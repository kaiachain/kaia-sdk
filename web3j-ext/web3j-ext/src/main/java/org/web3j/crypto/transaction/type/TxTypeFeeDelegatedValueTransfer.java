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

public class TxTypeFeeDelegatedValueTransfer extends TxTypeFeeDelegate {

    protected TxTypeFeeDelegatedValueTransfer(TxType.Type type, BigInteger nonce, BigInteger gasPrice,
            BigInteger gasLimit, String to, BigInteger value, String from) {
        super(type, nonce, gasPrice, gasLimit, from, to, value);
    }

    public static TxTypeFeeDelegatedValueTransfer createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            String recipient, BigInteger value, String from) {
        return new TxTypeFeeDelegatedValueTransfer(type, nonce, gasPrice, gasLimit, recipient, value, from);
    }

    protected TxTypeFeeDelegatedValueTransfer(long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice,
            BigInteger gasLimit, String to, BigInteger value, String from) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, to, value);
    }

    public static TxTypeFeeDelegatedValueTransfer createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            String recipient, BigInteger value, String from) {
        return new TxTypeFeeDelegatedValueTransfer(chainId, type, nonce, gasPrice, gasLimit, recipient, value, from);
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value,
     * and from.
     * List elements can be different depending on transaction type.
     *
     * @return List RlpType List
     */
    @Override
    public List<RlpType> rlpValues() {
        List<RlpType> values = super.rlpValues();
        values.add(RlpString.create(Numeric.hexStringToByteArray(getTo())));
        values.add(RlpString.create(getValue()));
        values.add(RlpString.create(Numeric.hexStringToByteArray(getFrom())));
        return values;
    }

    /**
     * This method is overridden as FEE_DELEGATED_VALUE_TRANSFER type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public TxType.Type getKaiaType() {
        return TxType.Type.FEE_DELEGATED_VALUE_TRANSFER;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedValueTransfer decoded transaction
     */
    public static TxTypeFeeDelegatedValueTransfer decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from,
        // txSignatures, feePayer, feePayerSignatures])
        try {
            byte[] rawTransactionExceptType = KaiaTransactionUtils.getRawTransactionNoType(rawTransaction);

            RlpList rlpList = RlpDecoder.decode(rawTransactionExceptType);
            List<RlpType> values = ((RlpList) rlpList.getValues().get(0)).getValues();
            BigInteger nonce = ((RlpString) values.get(0)).asPositiveBigInteger();
            BigInteger gasPrice = ((RlpString) values.get(1)).asPositiveBigInteger();
            BigInteger gasLimit = ((RlpString) values.get(2)).asPositiveBigInteger();
            String to = ((RlpString) values.get(3)).asString();
            BigInteger value = ((RlpString) values.get(4)).asPositiveBigInteger();
            String from = ((RlpString) values.get(5)).asString();
            TxType.Type type = Type.FEE_DELEGATED_VALUE_TRANSFER;
            TxTypeFeeDelegatedValueTransfer tx = TxTypeFeeDelegatedValueTransfer.createTransaction(type, nonce,
                    gasPrice,
                    gasLimit, to, value, from);
            tx.addSignatureData(values, 6);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedValueTransfer decoded transaction
     */
    public static TxTypeFeeDelegatedValueTransfer decodeFromRawTransaction(String rawTransaction) {
        return decodeFromRawTransaction(Numeric.hexStringToByteArray(Numeric.cleanHexPrefix(rawTransaction)));
    }

    @Override
    public List<RlpType> asRlpValues(SignatureData signatureData) {
        // TODO Auto-generated method stub
        return rlpValues();
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