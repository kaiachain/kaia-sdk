import org.web3j.protocol.kaia.core.method.response.KaiaNewPendingTransactionFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaNewPendingTransactionFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaNewPendingTransactionFilterExample() throws IOException {
        KaiaNewPendingTransactionFilterResponse response = w3.kaiaNewPendingTransactionFilter().send();
        response.getResult();
    }
}
