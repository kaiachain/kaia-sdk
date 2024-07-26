package org.web3j.tx;

import java.io.IOException;
import java.math.BigInteger;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.Hash;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.transaction.account.AccountKey;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetCode;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.service.TxKaiaSignServiceImpl;
import org.web3j.service.TxSignService;
import org.web3j.tx.exceptions.TxHashMismatchException;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.utils.Numeric;
import org.web3j.utils.TxHashVerifier;

/**
 * TransactionManager implementation using Ethereum wallet file to create and
 * sign transactions
 * locally.
 *
 * <p>
 * This transaction manager provides support for specifying the chain id for
 * transactions as per
 * <a href="https://github.com/ethereum/EIPs/issues/155">EIP155</a>, as well as
 * for locally signing
 * RawTransaction instances without broadcasting them.
 */
public class KaiaRawTransactionManager extends TransactionManager {
    private final Web3j web3j;
    private final TxKaiaSignServiceImpl txSignService;

    private final long chainId;

    protected TxHashVerifier txHashVerifier = new TxHashVerifier();

    public KaiaRawTransactionManager(Web3j web3j, Credentials credentials, long chainId) {
        super(web3j, credentials.getAddress());
        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = new TxKaiaSignServiceImpl(credentials);
    }

    public KaiaRawTransactionManager(Web3j web3j, KaiaCredentials credentials, long chainId) {
        super(web3j, credentials.getAddress());
        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = new TxKaiaSignServiceImpl(credentials);
    }

    public KaiaRawTransactionManager(Web3j web3j, TxSignService txSignService, long chainId) {
        super(web3j, txSignService.getAddress());
        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = (TxKaiaSignServiceImpl) txSignService;
    }

    public KaiaRawTransactionManager(
            Web3j web3j,
            KaiaCredentials credentials,
            long chainId,
            TransactionReceiptProcessor transactionReceiptProcessor) {
        super(transactionReceiptProcessor, credentials.getAddress());

        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = new TxKaiaSignServiceImpl(credentials);
    }

    public KaiaRawTransactionManager(
            Web3j web3j, Credentials credentials, long chainId, int attempts, long sleepDuration) {
        super(web3j, attempts, sleepDuration, credentials.getAddress());

        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = new TxKaiaSignServiceImpl(credentials);
    }

    public KaiaRawTransactionManager(
            Web3j web3j, KaiaCredentials credentials, long chainId, int attempts, long sleepDuration) {
        super(web3j, attempts, sleepDuration, credentials.getAddress());

        this.web3j = web3j;
        this.chainId = chainId;
        this.txSignService = new TxKaiaSignServiceImpl(credentials);
    }

    public KaiaRawTransactionManager(Web3j web3j, Credentials credentials) {
        this(web3j, credentials, ChainId.NONE);
    }

    public KaiaRawTransactionManager(
            Web3j web3j, Credentials credentials, int attempts, int sleepDuration) {
        this(web3j, credentials, ChainId.NONE, attempts, sleepDuration);
    }

    protected BigInteger getNonce() throws IOException {
        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                this.getFromAddress(), DefaultBlockParameterName.PENDING)
                .send();

        return ethGetTransactionCount.getTransactionCount();
    }

    public TxHashVerifier getTxHashVerifier() {
        return txHashVerifier;
    }

    public void setTxHashVerifier(TxHashVerifier txHashVerifier) {
        this.txHashVerifier = txHashVerifier;
    }

    @Override
    public String sendCall(String to, String data, DefaultBlockParameter defaultBlockParameter)
            throws IOException {
        EthCall ethCall = web3j.ethCall(
                Transaction.createEthCallTransaction(getFromAddress(), to, data),
                defaultBlockParameter)
                .send();

        assertCallNotReverted(ethCall);
        return ethCall.getValue();
    }

    @Override
    public EthGetCode getCode(
            final String contractAddress, final DefaultBlockParameter defaultBlockParameter)
            throws IOException {
        return web3j.ethGetCode(contractAddress, defaultBlockParameter).send();
    }

    /*
     * @param rawTransaction a RawTransaction istance to be signed
     * 
     * @return The transaction signed and encoded without ever broadcasting it
     */
    public String sign(KaiaRawTransaction rawTransaction) {

        byte[] signedMessage = txSignService.sign(rawTransaction, chainId);

        return Numeric.toHexString(signedMessage);
    }

    public EthSendTransaction signAndSend(KaiaRawTransaction rawTransaction) throws IOException {
        String hexValue = sign(rawTransaction);
        EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();

        if (ethSendTransaction != null && !ethSendTransaction.hasError()) {
            String txHashLocal = Hash.sha3(hexValue);
            String txHashRemote = ethSendTransaction.getTransactionHash();
            if (!txHashVerifier.verify(txHashLocal, txHashRemote)) {
                throw new TxHashMismatchException(txHashLocal, txHashRemote);
            }
        }

        return ethSendTransaction;
    }

    /*
     * @param rawTransaction a RawTransaction istance to be signed
     * 
     * @return The transaction signed and encoded without ever broadcasting it
     */
    public String sign(RawTransaction rawTransaction) {

        byte[] signedMessage = txSignService.sign(rawTransaction, chainId);

        return Numeric.toHexString(signedMessage);
    }

    public EthSendTransaction signAndSend(RawTransaction rawTransaction) throws IOException {
        String hexValue = sign(rawTransaction);
        EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();

        if (ethSendTransaction != null && !ethSendTransaction.hasError()) {
            String txHashLocal = Hash.sha3(hexValue);
            String txHashRemote = ethSendTransaction.getTransactionHash();
            if (!txHashVerifier.verify(txHashLocal, txHashRemote)) {
                throw new TxHashMismatchException(txHashLocal, txHashRemote);
            }
        }

        return ethSendTransaction;
    }

    @Override
    public EthSendTransaction sendTransaction(BigInteger gasPrice, BigInteger gasLimit, String to, String data,
            BigInteger value, boolean constructor) throws IOException {
        BigInteger nonce = getNonce();

        RawTransaction rawTransaction = RawTransaction.createTransaction(nonce, gasPrice, gasLimit, to, value, data);

        return signAndSend(rawTransaction);
    }

    @Override
    public EthSendTransaction sendEIP1559Transaction(long chainId, BigInteger maxPriorityFeePerGas,
            BigInteger maxFeePerGas, BigInteger gasLimit, String to, String data, BigInteger value, boolean constructor)
            throws IOException {
        BigInteger nonce = getNonce();

        RawTransaction rawTransaction = RawTransaction.createTransaction(
                chainId,
                nonce,
                gasLimit,
                to,
                value,
                data,
                maxPriorityFeePerGas,
                maxFeePerGas);

        return signAndSend(rawTransaction);
    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from,
                accountKey);
        return signAndSend(rawTransaction);
    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from);

        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                from);
        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                from,
                payload);
        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger option) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                from,
                payload,
                option);
        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey,
            BigInteger feeRatio) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from,
                accountKey,
                feeRatio);

        return signAndSend(rawTransaction);
    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            BigInteger feeRatio) throws IOException {

        BigInteger nonce = getNonce();
        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from,
                feeRatio);
        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            BigInteger feeRatio) throws IOException {

        BigInteger nonce = getNonce();

        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                from,
                feeRatio);
        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger codeFormat,
            BigInteger feeRatio) throws IOException {

        BigInteger nonce = getNonce();

        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                to,
                value,
                from,
                payload,
                codeFormat,
                feeRatio);

        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload) throws IOException {

        BigInteger nonce = getNonce();

        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from,
                payload);

        return signAndSend(rawTransaction);

    }

    public EthSendTransaction sendKaiaTransaction(
            TxType.Type type,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload,
            BigInteger feeRatio) throws IOException {

        BigInteger nonce = getNonce();

        KaiaRawTransaction rawTransaction = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                gasPrice,
                gas,
                from,
                payload,
                feeRatio);
        return signAndSend(rawTransaction);
    }

}