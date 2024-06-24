
import org.web3j.protocol.klaytn.core.method.response.KaiaPendingTransactionsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaPendingTransactionsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaPendingTransactionsExample() throws IOException {
        KaiaPendingTransactionsResponse response = w3.kaiaPendingTransactions().send();
        response.getResult();
    }
}
