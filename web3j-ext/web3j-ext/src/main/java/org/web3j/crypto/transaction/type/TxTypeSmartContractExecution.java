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

public class TxTypeSmartContractExecution extends AbstractTxType {

    /**
     * input data of the smart contract
     */
    private final byte[] payload;

    protected TxTypeSmartContractExecution(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from, byte[] payload) {
        super(type, nonce, gasPrice, gasLimit, from, to, value);
        this.payload = payload;
    }

    public static TxTypeSmartContractExecution createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from, byte[] payload) {
        return new TxTypeSmartContractExecution(type, nonce, gasPrice, gasLimit, to, value, from, payload);
    }

    protected TxTypeSmartContractExecution(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from, byte[] payload) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, to, value);
        this.payload = payload;
    }

    public static TxTypeSmartContractExecution createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String to,
            BigInteger value, String from, byte[] payload) {
        return new TxTypeSmartContractExecution(chainId, type, nonce, gasPrice, gasLimit, to, value, from, payload);
    }

    public byte[] getPayload() {
        return payload;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value,
     * from and payload.
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
        values.add(RlpString.create(getPayload()));
        return values;
    }

    /**
     * This method is overridden as SMART_CONTRACT_EXECUTION type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public TxType.Type getKaiaType() {
        return TxType.Type.SMART_CONTRACT_EXECUTION;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeSmartContractExecution decoded transaction
     */
    public static TxTypeSmartContractExecution decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input,
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
            byte[] payload = ((RlpString) values.get(6)).getBytes();
            TxType.Type type = Type.SMART_CONTRACT_EXECUTION;

            TxTypeSmartContractExecution tx = TxTypeSmartContractExecution.createTransaction(type, nonce, gasPrice,
                    gasLimit, to, value, from, payload);
            tx.addSignatureData(values, 7);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedSmartContractExecution decoded transaction
     */
    public static TxTypeSmartContractExecution decodeFromRawTransaction(String rawTransaction) {
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