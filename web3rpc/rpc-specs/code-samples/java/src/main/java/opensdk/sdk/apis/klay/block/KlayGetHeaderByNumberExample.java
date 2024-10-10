import org.web3j.protocol.kaia.core.method.response.KlayGetHeaderByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetHeaderByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetHeaderByNumberExample() throws IOException {
        KlayGetHeaderByNumberResponse gr = w3.klayGetHeaderByNumber(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
