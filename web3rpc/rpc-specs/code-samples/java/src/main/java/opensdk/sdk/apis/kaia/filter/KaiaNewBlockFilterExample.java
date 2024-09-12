import org.web3j.protocol.kaia.core.method.response.KaiaNewBlockFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaNewBlockFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaNewBlockFilterExample() throws IOException {
        KaiaNewBlockFilterResponse response = w3.kaiaNewBlockFilter().send();
        response.getResult();
    }
}
