import org.web3j.protocol.kaia.core.method.response.KlayGetBlockByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetBlockByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetBlockByNumberExample() throws IOException {
        KlayGetBlockByNumberResponse gr = w3.klayGetBlockByNumber(
            "0x1b4",
            true)
        .send();
        gr.getResult();
    }
}
