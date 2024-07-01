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
public class SignMsgAndRecoverWithRoleBasedExample implements keySample {
        /**
         * 
         */

        public static void run() throws Exception {
                Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
                KaiaCredentials credentials1 = KaiaCredentials.create(keySample.ROLEBASED_KEY_transactionkey,
                                keySample.ROLEBASED_KEY_address);
                KaiaCredentials credentials2 = KaiaCredentials.create(keySample.ROLEBASED_KEY_updatekey,
                                keySample.ROLEBASED_KEY_address);
                KaiaCredentials credentials3 = KaiaCredentials.create(keySample.ROLEBASED_KEY_feepayer,
                                keySample.ROLEBASED_KEY_address);
                String from = credentials1.getAddress();
                String message = "0xdeadbeef";
                String blockNumber = "latest";

                SignatureData signature1 = KaiaSignatureData.signPrefixedMessage(message, credentials1);
                String result1 = KaiaSignatureData.getSignatureString(signature1);

                SignatureData signature2 = KaiaSignatureData.signPrefixedMessage(message, credentials2);
                String result2 = KaiaSignatureData.getSignatureString(signature2);

                SignatureData signature3 = KaiaSignatureData.signPrefixedMessage(message, credentials3);
                String result3 = KaiaSignatureData.getSignatureString(signature3);

                KaiaRecoverFromMessageResponse response1 = web3j
                                .kaiaRecoverFromMessage(from, message, result1, blockNumber)
                                .send();

                KaiaRecoverFromMessageResponse response2 = web3j
                                .kaiaRecoverFromMessage(from, message, result2, blockNumber)
                                .send();

                KaiaRecoverFromMessageResponse response3 = web3j
                                .kaiaRecoverFromMessage(from, message, result3, blockNumber)
                                .send();
                System.out.println("Original address : " + from);
                System.out.println("Result address for transaction key : " + response1.getResult());
                System.out.println("Result address for update key : " + response2.getResult());
                System.out.println("Result address for feepayer key : " + response3.getResult());

                web3j.shutdown();

        }

}
