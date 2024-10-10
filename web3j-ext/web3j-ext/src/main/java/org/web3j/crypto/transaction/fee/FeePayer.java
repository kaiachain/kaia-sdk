package org.web3j.crypto.transaction.fee;

import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.KaiaSignatureData;
import org.web3j.utils.BytesUtils;
import org.web3j.crypto.Sign;
import org.web3j.crypto.transaction.type.AbstractTxType;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegate;
import org.web3j.rlp.RlpEncoder;
import org.web3j.rlp.RlpList;
import org.web3j.rlp.RlpString;
import org.web3j.rlp.RlpType;
import org.web3j.utils.Numeric;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class FeePayer {

    final static String EMPTY_FEE_PAYER_ADDRESS = "0x";
    final static String ZERO_FEE_PAYER_ADDRESS = "0x0000000000000000000000000000000000000000";
    private KaiaCredentials credentials;
    private long chainId;

    public FeePayer(KaiaCredentials credentials, long chainId) {
        this.credentials = credentials;
        this.chainId = chainId;
    }

    public KaiaRawTransaction sign(TxTypeFeeDelegate txType) {
        Set<KaiaSignatureData> feePayerSignatureDataSet = getFeePayerSignatureData(txType);

        List<RlpType> rlpTypeList = new ArrayList<>(txType.rlpValues());
        List<RlpType> senderSignatureList = new ArrayList<>();

        for (KaiaSignatureData senderSignature : txType.getSenderSignatureDataSet()) {
            senderSignatureList.add(senderSignature.toRlpList());
        }
        rlpTypeList.add(new RlpList(senderSignatureList));
        rlpTypeList.add(RlpString.create(Numeric.hexStringToByteArray(credentials.getAddress())));

        List<RlpType> feePayerSignatureList = new ArrayList<>();

        String feePayer = txType.getFeePayer();
        if (!feePayer.equals(EMPTY_FEE_PAYER_ADDRESS) && !feePayer.equals(ZERO_FEE_PAYER_ADDRESS)) {
            for (KaiaSignatureData feePayerSignatureData : txType.getFeePayerSignatureData()) {
                feePayerSignatureList.add(feePayerSignatureData.toRlpList());
            }
        }

        for (KaiaSignatureData feePayerSignatureData : feePayerSignatureDataSet) {
            feePayerSignatureList.add(feePayerSignatureData.toRlpList());
        }
        rlpTypeList.add(new RlpList(feePayerSignatureList));

        byte[] encodedTransaction = RlpEncoder.encode(new RlpList(rlpTypeList));
        byte[] type = { txType.getKaiaType().get() };
        byte[] rawTx = BytesUtils.concat(type, encodedTransaction);
        return new KaiaRawTransaction(null, rawTx, feePayerSignatureDataSet);
    }

    @Deprecated
    public KaiaSignatureData getSignatureData(AbstractTxType txType) {
        KaiaSignatureData signatureData = KaiaSignatureData.createKaiaSignatureDataFromChainId(chainId);
        byte[] encodedTransaction = txType.getEncodedTransactionNoSig();

        List<RlpType> rlpTypeList = new ArrayList<>();
        rlpTypeList.add(RlpString.create(encodedTransaction));
        rlpTypeList.add(RlpString.create(Numeric.hexStringToByteArray(credentials.getAddress())));
        rlpTypeList.addAll(signatureData.toRlpList().getValues());
        byte[] encodedTransaction2 = RlpEncoder.encode(new RlpList(rlpTypeList));

        Sign.SignatureData signedSignatureData = Sign.signMessage(encodedTransaction2, credentials.getEcKeyPair());
        return KaiaSignatureData.createEip155KaiaSignatureData(signedSignatureData, chainId);
    }

    /**
     * extract signature data of fee payer signed in TxType
     *
     * @param txType txType to extract fee payer's signature data
     * @return Set fee payer's signature data
     */
    private Set<KaiaSignatureData> getFeePayerSignatureData(AbstractTxType txType) {
        KaiaSignatureData signatureData = KaiaSignatureData.createKaiaSignatureDataFromChainId(chainId);
        Set<KaiaSignatureData> feePayerSignatureDataSet = new HashSet<>();
        byte[] encodedTransactionNoSig = txType.getEncodedTransactionNoSig();

        List<RlpType> rlpTypeList = new ArrayList<>();
        rlpTypeList.add(RlpString.create(encodedTransactionNoSig));
        rlpTypeList.add(RlpString.create(Numeric.hexStringToByteArray(credentials.getAddress())));
        rlpTypeList.addAll(signatureData.toRlpList().getValues());
        byte[] encodedTransaction = RlpEncoder.encode(new RlpList(rlpTypeList));

        Sign.SignatureData signedSignatureData = Sign.signMessage(encodedTransaction, credentials.getEcKeyPair());
        feePayerSignatureDataSet.add(KaiaSignatureData.createEip155KaiaSignatureData(signedSignatureData, chainId));

        return feePayerSignatureDataSet;
    }
}