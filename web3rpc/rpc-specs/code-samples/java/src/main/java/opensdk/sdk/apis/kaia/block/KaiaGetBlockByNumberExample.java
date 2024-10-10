import org.web3j.protocol.kaia.core.method.response.KaiaGetBlockByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetBlockByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGetBlockByNumberExample() throws IOException {
        KaiaGetBlockByNumberResponse gr = w3.kaiaGetBlockByNumber(
            "0x1b4",
            true)
        .send();
        gr.getResult();
    }
}
