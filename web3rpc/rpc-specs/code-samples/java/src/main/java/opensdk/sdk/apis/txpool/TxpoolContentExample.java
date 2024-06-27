import org.web3j.protocol.klaytn.core.method.response.TxpoolContentResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class TxpoolContentExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void txpoolContentExample() throws IOException {
        TxpoolContentResponse response = w3.txpoolContent().send();
        response.getResult();
    }
}
