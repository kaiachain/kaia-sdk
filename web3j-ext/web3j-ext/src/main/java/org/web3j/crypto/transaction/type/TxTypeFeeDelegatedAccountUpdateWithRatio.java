package org.web3j.crypto.transaction.type;

import java.math.BigInteger;
import java.util.List;
import org.web3j.crypto.Sign.SignatureData;
import org.web3j.crypto.transaction.account.AccountKey;
import org.web3j.crypto.transaction.account.AccountKeyDecoder;
import org.web3j.rlp.RlpDecoder;
import org.web3j.rlp.RlpList;
import org.web3j.rlp.RlpString;
import org.web3j.rlp.RlpType;
import org.web3j.utils.KaiaTransactionUtils;
import org.web3j.utils.Numeric;

public class TxTypeFeeDelegatedAccountUpdateWithRatio extends TxTypeFeeDelegate {

    /**
     * newly created accountKey
     */
    private final AccountKey accountKey;

    /**
     * Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the
     * fee payer.
     * 70% will be paid by the sender
     */
    private final BigInteger feeRatio;

    public TxTypeFeeDelegatedAccountUpdateWithRatio(TxType.Type type, BigInteger nonce, BigInteger gasPrice,
            BigInteger gasLimit, String from, AccountKey accountKey, BigInteger feeRatio) {
        super(type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
        this.accountKey = accountKey;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedAccountUpdateWithRatio createTransaction(TxType.Type type, BigInteger nonce,
            BigInteger gasPrice, BigInteger gasLimit, String from, AccountKey accountKey, BigInteger feeRatio) {
        return new TxTypeFeeDelegatedAccountUpdateWithRatio(type, nonce, gasPrice, gasLimit, from, accountKey,
                feeRatio);
    }

    public TxTypeFeeDelegatedAccountUpdateWithRatio(long chainId, TxType.Type type, BigInteger nonce,
            BigInteger gasPrice, BigInteger gasLimit, String from, AccountKey accountKey, BigInteger feeRatio) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, "", BigInteger.ZERO);
        this.accountKey = accountKey;
        this.feeRatio = feeRatio;
    }

    public static TxTypeFeeDelegatedAccountUpdateWithRatio createTransaction(long chainId, TxType.Type type,
            BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit, String from, AccountKey accountKey,
            BigInteger feeRatio) {
        return new TxTypeFeeDelegatedAccountUpdateWithRatio(chainId, type, nonce, gasPrice, gasLimit, from, accountKey,
                feeRatio);
    }

    public AccountKey getAccountKey() {
        return accountKey;
    }

    public BigInteger getFeeRatio() {
        return feeRatio;
    }

    /**
     * create RlpType List which contains nonce, gas price, gas limit, from,
     * accountKey and feeRatio.
     * List elements can be different depending on transaction type.
     *
     * @return List RlpType List
     */
    @Override
    public List<RlpType> rlpValues() {
        List<RlpType> values = super.rlpValues();
        values.add(RlpString.create(Numeric.hexStringToByteArray(getFrom())));
        values.add(RlpString.create(getAccountKey().toRlp()));
        values.add(RlpString.create(getFeeRatio()));
        return values;
    }

    /**
     * This method is overridden as FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO type.
     * The return value is used for rlp encoding.
     *
     * @return Type transaction type
     */
    @Override
    public TxType.Type getKaiaType() {
        return TxType.Type.FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO;
    }

    /**
     * decode transaction hash from sender to reconstruct transaction with fee payer
     * signature.
     *
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedAccountUpdateWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedAccountUpdateWithRatio decodeFromRawTransaction(byte[] rawTransaction) {
        // TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, feeRatio,
        // txSignatures, feePayer, feePayerSignatures])
        try {
            byte[] rawTransactionExceptType = KaiaTransactionUtils.getRawTransactionNoType(rawTransaction);

            RlpList rlpList = RlpDecoder.decode(rawTransactionExceptType);
            List<RlpType> values = ((RlpList) rlpList.getValues().get(0)).getValues();

            BigInteger nonce = ((RlpString) values.get(0)).asPositiveBigInteger();
            BigInteger gasPrice = ((RlpString) values.get(1)).asPositiveBigInteger();
            BigInteger gasLimit = ((RlpString) values.get(2)).asPositiveBigInteger();
            String from = ((RlpString) values.get(3)).asString();
            String accountkeyRaw = ((RlpString) values.get(4)).asString();
            BigInteger feeRatio = ((RlpString) values.get(5)).asPositiveBigInteger();
            TxType.Type type = Type.FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO;

            TxTypeFeeDelegatedAccountUpdateWithRatio tx = TxTypeFeeDelegatedAccountUpdateWithRatio.createTransaction(
                    type, nonce, gasPrice, gasLimit, from, AccountKeyDecoder.fromRlp(accountkeyRaw), feeRatio);

            tx.addSignatureData(values, 6);
            return tx;
        } catch (Exception e) {
            throw new RuntimeException("There is a error in the processing of decoding tx");
        }
    }

    /**
     * @param rawTransaction RLP-encoded signed transaction from sender
     * @return TxTypeFeeDelegatedAccountUpdateWithRatio decoded transaction
     */
    public static TxTypeFeeDelegatedAccountUpdateWithRatio decodeFromRawTransaction(String rawTransaction) {
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
