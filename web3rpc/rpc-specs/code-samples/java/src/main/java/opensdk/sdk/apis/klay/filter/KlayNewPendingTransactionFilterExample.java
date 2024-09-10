import org.web3j.protocol.kaia.core.method.response.KlayNewPendingTransactionFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayNewPendingTransactionFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayNewPendingTransactionFilterExample() throws IOException {
        KlayNewPendingTransactionFilterResponse response = w3.klayNewPendingTransactionFilter().send();
        response.getResult();
    }
}
