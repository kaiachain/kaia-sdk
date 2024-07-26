package org.web3j.crypto.transaction.type;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.KaiaSignatureData;
import org.web3j.rlp.RlpEncoder;
import org.web3j.rlp.RlpList;
import org.web3j.rlp.RlpString;
import org.web3j.rlp.RlpType;
import org.web3j.utils.BytesUtils;
import org.web3j.utils.Numeric;

public abstract class TxTypeFeeDelegate extends AbstractTxType {
    final static String EMPTY_FEE_PAYER_ADDRESS = "0x30";
    final static int DEFAULT_FEE_RATIO = 100;

    private Set<KaiaSignatureData> feePayerSignatureData;
    private String feePayer;

    public TxTypeFeeDelegate(TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            String from, String to, BigInteger value) {
        super(type, nonce, gasPrice, gasLimit, from, to, value);
        this.feePayerSignatureData = new HashSet<>();
        this.feePayer = EMPTY_FEE_PAYER_ADDRESS;
    }

    public TxTypeFeeDelegate(long chainId, TxType.Type type, BigInteger nonce, BigInteger gasPrice, BigInteger gasLimit,
            String from, String to, BigInteger value) {
        super(chainId, type, nonce, gasPrice, gasLimit, from, to, value);
        this.feePayerSignatureData = new HashSet<>();
        this.feePayer = EMPTY_FEE_PAYER_ADDRESS;
    }

    public Set<KaiaSignatureData> getFeePayerSignatureData() {
        return feePayerSignatureData;
    }

    public String getFeePayer() {
        return this.feePayer;
    }

    public void setFeePayer(String feePayer) {
        this.feePayer = feePayer;
    }

    public BigInteger getFeeRatio() {
        return BigInteger.valueOf(DEFAULT_FEE_RATIO);
    }

    /**
     * add a feePayer signature
     *
     * @param feePayerSignatureData signature data signed by feePayer
     */
    public void addFeePayerSignatureData(KaiaSignatureData feePayerSignatureData) {
        this.feePayerSignatureData.add(feePayerSignatureData);
    }

    /**
     * add feePayers signature
     *
     * @param feePayerSignatureData signature data signed by feePayer
     */
    public void addFeePayerSignatureData(Set<KaiaSignatureData> feePayerSignatureData) {
        this.feePayerSignatureData.addAll(feePayerSignatureData);
    }

    /**
     * add feePayers signature
     *
     * @param signatureRlpTypeList rlp type list of signatures
     */
    protected void addFeePayerSignatureData(List<RlpType> signatureRlpTypeList) {
        for (RlpType signatureRlpType : signatureRlpTypeList) {
            List<RlpType> vrs = ((RlpList) signatureRlpType).getValues();
            if (vrs.size() < 3)
                continue;
            byte[] v = ((RlpString) vrs.get(0)).getBytes();
            byte[] r = ((RlpString) vrs.get(1)).getBytes();
            byte[] s = ((RlpString) vrs.get(2)).getBytes();
            addFeePayerSignatureData(new KaiaSignatureData(v, r, s));
        }
    }

    /**
     * add signature data
     *
     * @param values rlp encoded rawTransaction
     * @param offset where sender's signature data begins
     */
    public void addSignatureData(List<RlpType> values, int offset) {
        if (values.size() > offset) {
            List<RlpType> senderSignatures = ((RlpList) (values.get(offset))).getValues();
            addSenderSignatureData(senderSignatures);
        }

        if (values.size() > offset + 1) {
            String feePayer = ((RlpString) values.get(offset + 1)).asString();
            setFeePayer(feePayer);
        }

        if (values.size() > offset + 2) {
            List<RlpType> feePayerSignatures = ((RlpList) (values.get(offset + 2))).getValues();
            addFeePayerSignatureData(feePayerSignatures);
        }
    }

    /**
     * add signature data
     *
     * @param txType TxType holding a signature
     */
    public void addSignatureData(TxTypeFeeDelegate txType) {
        addSenderSignatureData(txType.getSenderSignatureDataSet());
        addFeePayerSignatureData(txType.getSenderSignatureDataSet());
    }

    /**
     * rlp encoding for transaction hash(TxHash)
     *
     * @param credentials credential info of a signer
     * @param chainId     chain ID
     * @return KaiaRawTransaction this contains transaction hash and processed
     *         signature data
     */
    @Override
    public KaiaRawTransaction sign(KaiaCredentials credentials, long chainId) {
        Set<KaiaSignatureData> newSignatureDataSet = getNewSenderSignatureDataSet(credentials, chainId);
        addSenderSignatureData(newSignatureDataSet);

        List<RlpType> rlpTypeList = new ArrayList<>(rlpValues());
        List<RlpType> senderSignatureList = new ArrayList<>();

        for (KaiaSignatureData kaiaSignatureData : getSenderSignatureDataSet()) {
            senderSignatureList.add(kaiaSignatureData.toRlpList());
        }

        rlpTypeList.add(new RlpList(senderSignatureList));
        rlpTypeList.add(RlpString.create(Numeric.hexStringToByteArray(this.feePayer)));

        List<RlpType> feePayerSignatureList = new ArrayList<>();
        for (KaiaSignatureData kaiaSignatureData : this.feePayerSignatureData) {
            feePayerSignatureList.add(kaiaSignatureData.toRlpList());
        }
        rlpTypeList.add(new RlpList(feePayerSignatureList));

        byte[] encodedTransaction = RlpEncoder.encode(new RlpList(rlpTypeList));
        byte[] type = { getKaiaType().get() };
        byte[] rawTx = BytesUtils.concat(type, encodedTransaction);
        return new KaiaRawTransaction(this, rawTx, getSenderSignatureData());
    }
}