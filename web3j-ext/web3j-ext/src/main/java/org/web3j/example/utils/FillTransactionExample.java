package org.web3j.example.utils;

import java.io.IOException;
import java.math.BigInteger;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.KaiaTransactionEncoder;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeValueTransfer;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;

/**
 * 
 */
public class FillTransactionExample implements keySample {
        /**
         * 
         */

        public static void run() throws Exception {
                Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
                KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);

                BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
                String from = credentials.getAddress();
                String to = "0x000000000000000000000000000000000000dead";

                BigInteger value = BigInteger.valueOf(100);

                TxType.Type type = Type.VALUE_TRANSFER;

                KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
                                0, // set chainId to zero
                                type,
                                BigInteger.ZERO, // set nonce to zero
                                BigInteger.ZERO, // set Gas price to zero
                                GAS_LIMIT,
                                to,
                                value,
                                from);

                // Fill transaction with fillTransaction
                KaiaRawTransaction raw_fillTransaction = raw.fillTransaction(web3j);

                byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw_fillTransaction, credentials);
                String hexValue = Numeric.toHexString(signedMessage);
                EthSendTransaction transactionResponse = web3j.ethSendRawTransaction(hexValue).send();
                System.out.println("TxHash : \n " + transactionResponse.getResult());
                String txHash = transactionResponse.getResult();

                int DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH = 40;
                int DEFAULT_BLOCK_TIME = 1 * 1000;
                long DEFAULT_POLLING_FREQUENCY = DEFAULT_BLOCK_TIME;
                TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(web3j,
                                DEFAULT_POLLING_FREQUENCY, DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH);
                org.web3j.protocol.core.methods.response.TransactionReceipt ethReceipt = transactionReceiptProcessor
                                .waitForTransactionReceipt(txHash);
                System.out.println("Receipt from eth_getTransactionReceipt : \n" + ethReceipt);
                TransactionReceipt receipt = web3j.kaiaGetTransactionReceipt(txHash).send().getResult();
                System.out.println("Receipt from kaia_getTransactionReceipt : \n" + receipt);
                web3j.shutdown();

                TxTypeValueTransfer rawTransaction = TxTypeValueTransfer.decodeFromRawTransaction(signedMessage);
                System.out.println("TxType : " + rawTransaction.getKaiaType());

        }

}
