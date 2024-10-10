import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KaiaForkStatusResponse;

import java.io.IOException;

public class KaiaForkStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaForkStatusExample() throws IOException {
        int forkNumber = 20;
        KaiaForkStatusResponse response = w3.kaiaForkStatus(forkNumber).send();
        response.getResult();
    }
}
