import org.web3j.protocol.kaia.core.method.response.KaiaChainIDResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaChainIdExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaChainIdExample() throws IOException {
        KaiaChainIDResponse cr = w3.kaiaChainID().send();
        cr.getResult();
    }
}
