import org.web3j.protocol.kaia.core.method.response.KlayGetTransactionReceiptResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetTransactionReceiptExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetTransactionReceiptExample() throws IOException {
        KlayGetTransactionReceiptResponse response = w3.klayGetTransactionReceipt(
                "0xaca5d9a1ed8b86b1ef61431b2bedfc99a66eaefc3a7e1cffdf9ff53653956a67"
        ).send();
        response.getResult();
    }
}
