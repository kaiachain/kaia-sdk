package org.web3j.example.contracts;

import java.io.IOException;
import java.math.BigInteger;
import org.web3j.crypto.KlayCredentials;
import org.web3j.crypto.KlayRawTransaction;
import org.web3j.crypto.KlayTransactionEncoder;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedSmartContractExecution;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.KlayCallResponse;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Uint;
import java.util.Arrays;
import java.util.Collections;

public class WriteContractWithKlaytnTxTypeExample {
        /**
         * @throws Exception
         * 
         */
        public static void run() throws Exception {

                Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
                KlayCredentials credentials = KlayCredentials.create(keySample.LEGACY_KEY_privkey);
                String contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";
                BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
                BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
                String from = credentials.getAddress();
                BigInteger nonce = web3j.ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                                .getTransactionCount();
                EthChainId EthchainId = web3j.ethChainId().send();
                long chainId = EthchainId.getChainId().longValue();
                BigInteger value = BigInteger.ZERO;
                StaticGasProvider gasProvider = new StaticGasProvider(GAS_PRICE, GAS_LIMIT);
                Counter counter = Counter.load(contractAddr, web3j, credentials.convertToCredentials(), gasProvider);

                // Get number before Contract Write
                System.out.println("number before : " + counter.number().send());

                // Contract Write (Set number with setNumber function)
                Function function = new Function("setNumber", // Function name
                                Arrays.asList(new Uint(BigInteger.valueOf(50))), // Function input parameters
                                Collections.emptyList()); // Function returned parameters
                String txData = FunctionEncoder.encode(function);
                byte[] payload = Numeric.hexStringToByteArray(txData);

                TxType.Type type = Type.SMART_CONTRACT_EXECUTION;

                KlayRawTransaction raw = KlayRawTransaction.createTransaction(
                                type,
                                nonce,
                                GAS_PRICE,
                                GAS_LIMIT,
                                contractAddr,
                                value,
                                from,
                                payload);

                // Sign as sender
                byte[] signedMessage = KlayTransactionEncoder.signMessage(raw, chainId, credentials);
                String hexValue = Numeric.toHexString(signedMessage);
                web3j.ethSendRawTransaction(hexValue).send();
                try {
                        Thread.sleep(2000);
                } catch (Exception e) {
                        System.out.println(e);
                }
                // Get number after Contract Write
                System.out.println("number after : " + counter.number().send());

                web3j.shutdown();
        }
}