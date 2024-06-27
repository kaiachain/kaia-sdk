package org.web3j.example.accountKey;

import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import java.io.IOException;
import java.math.BigInteger;
import org.web3j.crypto.KlayCredentials;
import org.web3j.crypto.KlayRawTransaction;
import org.web3j.crypto.KlayTransactionEncoder;
import org.web3j.crypto.transaction.account.AccountKeyPublic;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeAccountUpdate;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;

public class AccountUpdateWithPubKeyExample {

        public static void run() throws Exception {

                KlayCredentials credentials = KlayCredentials.create(keySample.PUBLIC_KEY_privkey, keySample.PUBLIC_KEY_address);
                Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));

                BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
                BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
                String from = credentials.getAddress();
                EthChainId EthchainId = web3j.ethChainId().send();
                long chainId = EthchainId.getChainId().longValue();
                BigInteger nonce = web3j.ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                                .getTransactionCount();

                BigInteger newPubkey = credentials.getEcKeyPair().getPublicKey();

                AccountKeyPublic accountkey = AccountKeyPublic.create(newPubkey);

                TxType.Type type = Type.ACCOUNT_UPDATE;

                KlayRawTransaction raw = KlayRawTransaction.createTransaction(
                                type,
                                nonce,
                                GAS_PRICE,
                                GAS_LIMIT,
                                from,
                                accountkey);

                byte[] signedMessage = KlayTransactionEncoder.signMessage(raw, chainId, credentials);
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
                TransactionReceipt receipt = web3j.klayGetTransactionReceipt(txHash).send().getResult();
                System.out.println("Receipt from klay_getTransactionReceipt : \n" + receipt);
                web3j.shutdown();

                TxTypeAccountUpdate rawTransaction = TxTypeAccountUpdate.decodeFromRawTransaction(signedMessage);

                System.out.println("TxType : " + rawTransaction.getKlayType());

        }

}
