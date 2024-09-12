import org.web3j.protocol.kaia.core.method.response.TxpoolInspectResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class TxpoolInspectExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void txpoolInspectExample() throws IOException {
        TxpoolInspectResponse response = w3.txpoolInspect().send();
        response.getResult();
    }
}
