package org.web3j.example.contracts;

import java.math.BigInteger;
import org.web3j.crypto.KlayCredentials;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.tx.gas.StaticGasProvider;

public class ReadContractExample {
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
        StaticGasProvider gasProvider = new StaticGasProvider(GAS_PRICE, GAS_LIMIT);
        Counter counter = Counter.load(contractAddr, web3j, credentials.convertToCredentials(), gasProvider);
        System.out.println("Contract Call(number) Result : " + counter.number().send());

    }

}
