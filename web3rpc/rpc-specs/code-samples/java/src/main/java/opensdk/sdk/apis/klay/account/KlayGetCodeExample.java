import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayGetCodeResponse;

import java.io.IOException;

public class KlayGetCodeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetCodeExample() throws IOException {
        KlayGetCodeResponse gr = w3.klayGetCode(
                        "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                        "0x2")
                .send();
        gr.getResult();
    }
}
