import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayGetParamsResponse;

import java.io.IOException;

public class KlayGetParamsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetParamsExample() throws IOException {
        int blockTag = 0;
        KlayGetParamsResponse response = w3.klayGetParams(blockTag).send();
        response.getResult();
    }
}
