import org.web3j.protocol.klaytn.core.method.response.KlaySendTransactionResponse;
import org.web3j.protocol.klaytn.core.method.response.KlaytnTransactionTypes;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlaySendTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klaySendTransactionExample() throws IOException {
        String address = "0x413ba0e5f6f00664598b5c80042b1308f4ff1408";
        KlaytnTransactionTypes type = new KlaytnTransactionTypes();
        type.setFrom(address);
        type.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        type.setValue("0x0");
        type.setGas("0x9999");
        KlaySendTransactionResponse transactionResponse = w3.klaySendTransaction(type).send();
        transactionResponse.getResult();

    }

}
