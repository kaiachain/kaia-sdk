import org.web3j.protocol.klaytn.core.method.response.KlaySendRawTransactionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlaySendRawTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klaySendRawTransactionExample() throws IOException {
        String singedTransactionData = "0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67";

        KlaySendRawTransactionResponse response = w3.klaySendRawTransaction(singedTransactionData).send();
        response.getResult();
    }
}
