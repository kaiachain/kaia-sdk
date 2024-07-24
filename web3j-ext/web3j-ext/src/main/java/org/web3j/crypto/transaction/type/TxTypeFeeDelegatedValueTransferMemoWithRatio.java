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

public class TxTypeFeeDelegatedValueTransferMemoWithRatio extends TxTypeFeeDelegate {

    /**
     * memo
     */
    private final byte[] payload;

    /**
     * Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the
     * fee payer.
     * 70% will be paid by the sender.
     */
    private final BigInteger feeRatio;

    protected TxTypeFeeDelegatedValueTransferMemoWithRatio(TxType.Type type, BigInteger nonce, BigInteger gasPrice,
            BigInteger gasLimit,
            String to, BigInteger value, String from, byte[] payload, BigInteger feeRatio) {
        super(type, nonce, gasPrice, gasLimit, from, to, value);
        this.payload = payload;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedValueTransferMemoWithRatio createTransaction(TxType.Type type, BigInteger nonce,
            BigInteger gasPrice, BigInteger gasLimit, String to, BigInteger value, String from, byte[] payload,
            BigInteger feeRatio) {
        return new TxTypeFeeDelegatedValueTransferMemoWithRatio(type, nonce, gasPrice, gasLimit, to, value, from,
                payload, feeRatio);
    }

    protected TxTypeFeeDelegatedValueTransferMemoWithRatio(long chainId, TxType.Type type, BigInteger nonce,
            BigInteger gasPrice, BigInteger gasLimit,
            String to, BigInteger value, String from, byte[] payload, BigInteger feeRatio) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, to, value);
        this.payload = payload;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedValueTransferMemoWithRatio createTransaction(long chainId, TxType.Type type,
            BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to, BigInteger value, String from,
            byte[] payload, BigInteger feeRatio) {
        return new TxTypeFeeDelegatedValueTransferMemoWithRatio(chainId, type, nonce, gasPrice, gasLimit, to, value,
                from, payload, feeRatio);
    }

    public byte[] getPayload() {
        return payload;
    }

    public BigInteger getFeeRatio() {
        return feeRatio;
    }

    /**
     * This method is overridden as FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO
     * type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public Type getKaiaType() {
        return Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value,
     * from, payload and feeRatio.
     * List elements can be different depending on transaction type.
     *
     * @return List RlpType List
     */
    @Override
    public List<RlpType> rlpValues() {
        List<RlpType> result = super.rlpValues();
        result.add(RlpString.create(Numeric.hexStringToByteArray(getTo())));
        result.add(RlpString.create(getValue()));
        result.add(RlpString.create(Numeric.hexStringToByteArray(getFrom())));
        result.add(RlpString.create(getPayload()));
        result.add(RlpString.create(getFeeRatio()));
        return result;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedValueTransferMemoWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedValueTransferMemoWithRatio decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input,
        // feeRatio, txSignatures, feePayer, feePayerSignatures])
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
            byte[] payload = ((RlpString) values.get(6)).getBytes();
            BigInteger feeRatio = ((RlpString) values.get(7)).asPositiveBigInteger();
            TxType.Type type = Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO;
            TxTypeFeeDelegatedValueTransferMemoWithRatio tx = TxTypeFeeDelegatedValueTransferMemoWithRatio
                    .createTransaction(type, nonce, gasPrice, gasLimit, to, value, from, payload, feeRatio);
            tx.addSignatureData(values, 8);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedValueTransferMemoWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedValueTransferMemoWithRatio decodeFromRawTransaction(String rawTransaction) {
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