import org.web3j.protocol.kaia.core.method.response.KaiaBlockNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaBlockNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaBlockNumberExample() throws IOException {
        KaiaBlockNumberResponse br = w3.kaiaBlockNumber().send();
        br.getResult();
    }
}
