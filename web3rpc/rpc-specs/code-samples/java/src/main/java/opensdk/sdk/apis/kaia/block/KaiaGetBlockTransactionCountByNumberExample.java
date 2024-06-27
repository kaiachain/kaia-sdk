import org.web3j.protocol.klaytn.core.method.response.KaiaGetBlockTransactionCountByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetBlockTransactionCountByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetBlockTransactionCountByNumberExample() throws IOException {
        KaiaGetBlockTransactionCountByNumberResponse gr = w3.kaiaGetBlockTransactionCountByNumber(
            "0xe8")
        .send();
        gr.getResult();
    }
}
