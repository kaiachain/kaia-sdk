import org.web3j.protocol.klaytn.core.method.response.TxpoolInspectResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class TxpoolInspectExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void txpoolInspectExample() throws IOException {
        TxpoolInspectResponse response = w3.txpoolInspect().send();
        response.getResult();
    }
}
