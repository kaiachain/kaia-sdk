import org.web3j.protocol.kaia.core.method.response.KlayClientVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayClientVersionExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayClientVersionExample() throws IOException {
        KlayClientVersionResponse cr = w3.klayClientVersion().send();
        cr.getResult();
    }
}
