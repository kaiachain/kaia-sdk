import org.web3j.protocol.kaia.core.method.response.TxpoolStatusResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class TxpoolStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void txpoolStatusExample() throws IOException {
        TxpoolStatusResponse response = w3.txpoolStatus().send();
        response.getResult();
    }
}
