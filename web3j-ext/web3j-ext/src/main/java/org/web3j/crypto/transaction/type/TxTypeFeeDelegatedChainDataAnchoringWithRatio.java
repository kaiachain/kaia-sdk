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
public class TxTypeFeeDelegatedChainDataAnchoringWithRatio extends TxTypeFeeDelegate {

    /**
     * data of the child chain
     */
    private final byte[] anchoredData;
    private final BigInteger feeRatio;

    protected TxTypeFeeDelegatedChainDataAnchoringWithRatio(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from,
            byte[] anchoredData, BigInteger feeRatio) {
        super(type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
        this.anchoredData = anchoredData;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedChainDataAnchoringWithRatio createTransaction(
            TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from,
            byte[] anchoredData, BigInteger feeRatio) {
        return new TxTypeFeeDelegatedChainDataAnchoringWithRatio(type, nonce, gasPrice, gasLimit, from, anchoredData,
                feeRatio);
    }

    protected TxTypeFeeDelegatedChainDataAnchoringWithRatio(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from,
            byte[] anchoredData, BigInteger feeRatio) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
        this.anchoredData = anchoredData;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedChainDataAnchoringWithRatio createTransaction(
            long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from,
            byte[] anchoredData, BigInteger feeRatio) {
        return new TxTypeFeeDelegatedChainDataAnchoringWithRatio(chainId, type, nonce, gasPrice, gasLimit, from,
                anchoredData, feeRatio);
    }

    public byte[] getAnchoredData() {
        return anchoredData;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, to, value,
     * from and anchoredData.
     * List elements can be different depending on transaction type.
     *
     * @return List RlpType List
     */
    @Override
    public List<RlpType> rlpValues() {
        List<RlpType> values = super.rlpValues();
        values.add(RlpString.create(Numeric.hexStringToByteArray(getFrom())));
        values.add(RlpString.create(getAnchoredData()));
        return values;
    }

    /**
     * This method is overridden as CHAIN_DATA_ANCHORING type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public Type getKaiaType() {
        return Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeChainDataAnchoringTransaction decoded transaction
     */
    public static TxTypeFeeDelegatedChainDataAnchoringWithRatio decodeFromRawTransaction(byte[] rawTransaction) {
        byte[] rawTransactionExceptType = KaiaTransactionUtils.getRawTransactionNoType(rawTransaction);

        RlpList rlpList = RlpDecoder.decode(rawTransactionExceptType);
        List<RlpType> values = ((RlpList) rlpList.getValues().get(0)).getValues();
        BigInteger nonce = ((RlpString) values.get(0)).asPositiveBigInteger();
        BigInteger gasPrice = ((RlpString) values.get(1)).asPositiveBigInteger();
        BigInteger gasLimit = ((RlpString) values.get(2)).asPositiveBigInteger();
        String from = ((RlpString) values.get(3)).asString();
        byte[] payload = ((RlpString) values.get(4)).getBytes();
        BigInteger feeRatio = ((RlpString) values.get(5)).asPositiveBigInteger();
        TxType.Type type = Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO;

        TxTypeFeeDelegatedChainDataAnchoringWithRatio tx = new TxTypeFeeDelegatedChainDataAnchoringWithRatio(type,
                nonce, gasPrice, gasLimit, from, payload, feeRatio);
        tx.addSignatureData(values, 6);
        return tx;
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeChainDataAnchoringTransaction decoded transaction
     */
    public static TxTypeFeeDelegatedChainDataAnchoringWithRatio decodeFromRawTransaction(String rawTransaction) {
        return decodeFromRawTransaction(Numeric.hexStringToByteArray(Numeric.cleanHexPrefix(rawTransaction)));
    }

    @Override
    public List<RlpType> asRlpValues(SignatureData signatureData) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getData() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public TransactionType getType() {
        // TODO Auto-generated method stub
        return null;
    }

}
