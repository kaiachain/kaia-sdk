//import org.web3j.protocol.klaytn.core.method.response.EthPendingTransactionsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthPendingTransactionsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void ethPendingTransactionsExample() throws IOException {
//        EthPendingTransactionsResponse response = w3.ethPendingTransactions().send();
//        response.getResult();
    }
}
