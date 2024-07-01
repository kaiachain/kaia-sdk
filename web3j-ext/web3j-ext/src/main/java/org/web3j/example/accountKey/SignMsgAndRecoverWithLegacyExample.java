package org.web3j.example.accountKey;

import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import java.io.IOException;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaSignatureData;
import org.web3j.crypto.Sign.SignatureData;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KaiaRecoverFromMessageResponse;

/**
 * 
 */
public class SignMsgAndRecoverWithLegacyExample implements keySample {
    /**
     * 
     */

    public static void run() throws Exception {
        Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
        KaiaCredentials credentials1 = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);
        String from = credentials1.getAddress();
        String message = "0xdeadbeef";
        String blockNumber = "latest";

        SignatureData signature = KaiaSignatureData.signPrefixedMessage(message, credentials1);
        String result = KaiaSignatureData.getSignatureString(signature);

        KaiaRecoverFromMessageResponse response = web3j.kaiaRecoverFromMessage(from, message, result, blockNumber)
                .send();
        System.out.println("Original address : " + from);
        System.out.println("Result address : " + response.getResult());

        web3j.shutdown();

    }

}
