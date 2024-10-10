import org.web3j.protocol.kaia.core.method.response.KlayProtocolVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayProtocolVersionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayProtocolVersionExample() throws IOException {
        KlayProtocolVersionResponse response = w3.klayProtocolVersion().send();
        response.getResult();
    }
}
