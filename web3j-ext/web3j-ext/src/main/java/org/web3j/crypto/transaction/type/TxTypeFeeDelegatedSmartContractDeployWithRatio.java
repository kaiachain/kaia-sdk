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

public class TxTypeFeeDelegatedSmartContractDeployWithRatio extends TxTypeFeeDelegate {

    /**
     * code of the newly deployed smart contract
     */
    private final byte[] payload;

    /**
     * Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the
     * fee payer.
     * 70% will be paid by the sender.
     */
    private final BigInteger feeRatio;

    /**
     * The code format of smart contract code
     */
    private final BigInteger codeFormat;

    public TxTypeFeeDelegatedSmartContractDeployWithRatio(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, BigInteger value,
            String from, byte[] payload, BigInteger feeRatio, BigInteger codeFormat) {
        super(type, nonce, gasPrice, gasLimit, from, "", value);
        this.payload = payload;
        this.feeRatio = feeRatio;
        this.codeFormat = codeFormat;
    }

    public static TxTypeFeeDelegatedSmartContractDeployWithRatio createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, BigInteger value,
            String from, byte[] payload, BigInteger feeRatio, BigInteger codeFormat) {
        return new TxTypeFeeDelegatedSmartContractDeployWithRatio(type, nonce, gasPrice, gasLimit, value, from, payload,
                feeRatio, codeFormat);
    }

    public TxTypeFeeDelegatedSmartContractDeployWithRatio(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            BigInteger value,
            String from, byte[] payload, BigInteger feeRatio, BigInteger codeFormat) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, "", value);
        this.payload = payload;
        this.feeRatio = feeRatio;
        this.codeFormat = codeFormat;
    }

    public static TxTypeFeeDelegatedSmartContractDeployWithRatio createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            BigInteger value,
            String from, byte[] payload, BigInteger feeRatio, BigInteger codeFormat) {
        return new TxTypeFeeDelegatedSmartContractDeployWithRatio(chainId, type, nonce, gasPrice, gasLimit, value, from,
                payload, feeRatio, codeFormat);
    }

    public byte[] getPayload() {
        return payload;
    }

    public BigInteger getFeeRatio() {
        return feeRatio;
    }

    public BigInteger getCodeFormat() {
        return codeFormat;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value,
     * from, payload, isHumanReadable and feeRatio.
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
        values.add(RlpString.create(0x0));
        values.add(RlpString.create(getFeeRatio()));
        values.add(RlpString.create(getCodeFormat()));
        return values;
    }

    /**
     * This method is overridden as FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO
     * type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public Type getKaiaType() {
        return Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedSmartContractDeployWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedSmartContractDeployWithRatio decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input,
        // humanReadable, feeRatio, codeFormat, txSignatures, feePayer,
        // feePayerSignatures])
        try {
            byte[] rawTransactionExceptType = KaiaTransactionUtils.getRawTransactionNoType(rawTransaction);

            RlpList rlpList = RlpDecoder.decode(rawTransactionExceptType);
            List<RlpType> values = ((RlpList) rlpList.getValues().get(0)).getValues();
            BigInteger nonce = ((RlpString) values.get(0)).asPositiveBigInteger();
            BigInteger gasPrice = ((RlpString) values.get(1)).asPositiveBigInteger();
            BigInteger gasLimit = ((RlpString) values.get(2)).asPositiveBigInteger();
            BigInteger value = ((RlpString) values.get(4)).asPositiveBigInteger();
            String from = ((RlpString) values.get(5)).asString();
            byte[] payload = ((RlpString) values.get(6)).getBytes();
            BigInteger feeRatio = ((RlpString) values.get(8)).asPositiveBigInteger();
            BigInteger codeFormat = ((RlpString) values.get(9)).asPositiveBigInteger();
            TxType.Type type = Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO;
            TxTypeFeeDelegatedSmartContractDeployWithRatio tx = new TxTypeFeeDelegatedSmartContractDeployWithRatio(type,
                    nonce, gasPrice, gasLimit, value, from, payload, feeRatio, codeFormat);
            tx.addSignatureData(values, 10);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedSmartContractDeployWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedSmartContractDeployWithRatio decodeFromRawTransaction(String rawTransaction) {
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