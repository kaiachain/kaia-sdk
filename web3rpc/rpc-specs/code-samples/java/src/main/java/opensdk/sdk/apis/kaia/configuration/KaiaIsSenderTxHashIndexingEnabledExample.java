
import org.web3j.protocol.klaytn.core.method.response.KaiaIsSenderTxHashIndexingEnabledResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaIsSenderTxHashIndexingEnabledExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaIsSenderTxHashIndexingEnabledExample() throws IOException {
        KaiaIsSenderTxHashIndexingEnabledResponse response = w3.kaiaIsSenderTxHashIndexingEnabled().send();
        response.getResult();
    }
}
