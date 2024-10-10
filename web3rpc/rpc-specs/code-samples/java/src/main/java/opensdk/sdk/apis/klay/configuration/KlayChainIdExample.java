import org.web3j.protocol.kaia.core.method.response.KlayChainIDResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayChainIdExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayChainIdExample() throws IOException {
        KlayChainIDResponse cr = w3.klayChainID().send();
        cr.getResult();
    }
}
