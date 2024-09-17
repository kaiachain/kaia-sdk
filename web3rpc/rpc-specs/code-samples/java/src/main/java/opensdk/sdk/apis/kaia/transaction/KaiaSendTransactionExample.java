import org.web3j.protocol.kaia.core.method.response.KaiaSendTransactionResponse;
import org.web3j.protocol.kaia.core.method.response.KaiaTransactionTypes;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaSendTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaSendTransactionExample() throws IOException {
        String address = "0x413ba0e5f6f00664598b5c80042b1308f4ff1408";
        KaiaTransactionTypes type = new KaiaTransactionTypes();
        type.setFrom(address);
        type.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        type.setValue("0x0");
        type.setGas("0x9999");
        KaiaSendTransactionResponse transactionResponse = w3.kaiaSendTransaction(type).send();
        transactionResponse.getResult();

    }

}
