import org.web3j.protocol.kaia.core.method.response.KlayPendingTransactionsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayPendingTransactionsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayPendingTransactionsExample() throws IOException {
        KlayPendingTransactionsResponse response = w3.klayPendingTransactions().send();
        response.getResult();
    }
}
