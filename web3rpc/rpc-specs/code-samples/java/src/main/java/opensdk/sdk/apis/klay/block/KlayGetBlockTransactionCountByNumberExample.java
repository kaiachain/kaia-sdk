import org.web3j.protocol.kaia.core.method.response.KlayGetBlockTransactionCountByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetBlockTransactionCountByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetBlockTransactionCountByNumberExample() throws IOException {
        KlayGetBlockTransactionCountByNumberResponse gr = w3.klayGetBlockTransactionCountByNumber(
            "0xe8")
        .send();
        gr.getResult();
    }
}
