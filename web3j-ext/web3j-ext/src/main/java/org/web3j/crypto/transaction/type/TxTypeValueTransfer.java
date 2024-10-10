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

/**
 * Transaction class used for signing 1559 transactions locally.<br>
 * For the specification, refer to p4 of the
 * <a href="http://gavwood.com/paper.pdf">yellow
 * paper</a>.
 */
public class TxTypeValueTransfer extends AbstractTxType {

    public TxTypeValueTransfer(TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from) {
        super(type, nonce, gasPrice, gasLimit, from, to, value);
    }

    public TxTypeValueTransfer(long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice,
            BigInteger gasLimit, String to, BigInteger value, String from) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, to, value);
    }

    public static TxTypeValueTransfer createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from) {
        return new TxTypeValueTransfer(type, nonce, gasPrice, gasLimit, to, value, from);
    }

    public static TxTypeValueTransfer createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from) {
        return new TxTypeValueTransfer(chainId, type, nonce, gasPrice, gasLimit, to, value, from);
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeValueTransfer decoded transaction
     */
    public static TxTypeValueTransfer decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from,
        // txSignatures])
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
            TxType.Type type = Type.VALUE_TRANSFER;
            TxTypeValueTransfer tx = TxTypeValueTransfer.createTransaction(type, nonce, gasPrice, gasLimit, to, value,
                    from);
            tx.addSignatureData(values, 6);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeValueTransfer decoded transaction
     */
    public static TxTypeValueTransfer decodeFromRawTransaction(String rawTransaction) {
        return decodeFromRawTransaction(Numeric.hexStringToByteArray(Numeric.cleanHexPrefix(rawTransaction)));
    }

    /**
     * This method is overridden as VALUE_TRANSFER type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    public Type getKaiaType() {
        return Type.VALUE_TRANSFER;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value and
     * from.
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
        return result;
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
