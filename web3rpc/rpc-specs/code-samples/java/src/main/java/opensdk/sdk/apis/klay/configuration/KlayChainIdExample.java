import org.web3j.protocol.klaytn.core.method.response.KlayChainIDResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayChainIdExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayChainIdExample() throws IOException {
        KlayChainIDResponse cr = w3.klayChainID().send();
        cr.getResult();
    }
}
