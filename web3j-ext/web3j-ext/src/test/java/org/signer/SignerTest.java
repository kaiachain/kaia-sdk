package org.signer;

import org.base.BaseTesting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.*;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.example.keySample;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Signer Tests")
public class SignerTest extends BaseTesting {
    @Test
    @DisplayName("test signPrefixedMessage")
    void testSignPrefixedMessage() {
        String message = "0xdeadbeef";

        Sign.SignatureData signature = KaiaSignatureData.signPrefixedMessage(message, this.getCredentials());
        String result = KaiaSignatureData.getSignatureString(signature);

        assertNotNull(result);
    }

    @Test
    @DisplayName("test signTransaction")
    void testSignTransaction() throws IOException {
        KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        EthChainId EthchainId = this.getWeb3j().ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = "0x000000000000000000000000000000000000dead";
        BigInteger nonce = this.getWeb3j().ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        BigInteger value = BigInteger.valueOf(100);

        TxType.Type type = TxType.Type.VALUE_TRANSFER;

        KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from);

        byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw, chainId, credentials);
        String hexValue = Numeric.toHexString(signedMessage);

        assertNotNull(hexValue);
    }
    @Test
    @DisplayName("test signTransactionAsFeePayer")
    void testSignTransactionAsFeePayer() throws IOException {
        KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);
        KaiaCredentials credentials_feepayer = KaiaCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        EthChainId EthchainId = this.getWeb3j().ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = "0x000000000000000000000000000000000000dead";
        BigInteger nonce = this.getWeb3j().ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        BigInteger value = BigInteger.valueOf(100);

        TxType.Type type = TxType.Type.FEE_DELEGATED_VALUE_TRANSFER;

        KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from);

        // Sign as sender
        byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw, chainId, credentials);

        // Sign same message as Fee payer
        signedMessage = KaiaTransactionEncoder.signMessageAsFeePayer(raw, chainId, credentials_feepayer);

        String hexValue = Numeric.toHexString(signedMessage);

        assertNotNull(hexValue);
    }
    @Test
    @DisplayName("test sendTransaction")
    void testSendTransaction() throws IOException {
        KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        EthChainId EthchainId = this.getWeb3j().ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = "0x000000000000000000000000000000000000dead";
        BigInteger nonce = this.getWeb3j().ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        BigInteger value = BigInteger.valueOf(100);

        TxType.Type type = TxType.Type.VALUE_TRANSFER;

        KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from);

        byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw, chainId, credentials);
        String hexValue = Numeric.toHexString(signedMessage);
        EthSendTransaction transactionResponse = this.getWeb3j().ethSendRawTransaction(hexValue).send();
        String txHash = transactionResponse.getResult();
        assertNotNull(txHash);
    }
    @Test
    @DisplayName("test sendTransactionAsFeePayer")
    void testSendTransactionAsFeePayer() throws IOException {
        KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);
        KaiaCredentials credentials_feepayer = KaiaCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        EthChainId EthchainId = this.getWeb3j().ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = "0x000000000000000000000000000000000000dead";
        BigInteger nonce = this.getWeb3j().ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        BigInteger value = BigInteger.valueOf(100);

        TxType.Type type = TxType.Type.FEE_DELEGATED_VALUE_TRANSFER;

        KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from);

        // Sign as sender
        byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw, chainId, credentials);

        // Sign same message as Fee payer
        signedMessage = KaiaTransactionEncoder.signMessageAsFeePayer(raw, chainId, credentials_feepayer);

        String hexValue = Numeric.toHexString(signedMessage);

        EthSendTransaction transactionResponse = this.getWeb3j().ethSendRawTransaction(hexValue).send();
        String txHash = transactionResponse.getResult();
        assertNotNull(txHash);
    }


}

