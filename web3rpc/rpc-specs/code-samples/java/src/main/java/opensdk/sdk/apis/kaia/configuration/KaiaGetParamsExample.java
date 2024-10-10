import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KaiaGetParamsResponse;

import java.io.IOException;

public class KaiaGetParamsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGetParamsExample() throws IOException {
        int blockTag = 0;
        KaiaGetParamsResponse response = w3.kaiaGetParams(blockTag).send();
        response.getResult();
    }
}
