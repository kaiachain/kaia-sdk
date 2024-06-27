import org.web3j.protocol.klaytn.core.method.response.KaiaGetHeaderByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetHeaderByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetHeaderByNumberExample() throws IOException {
        KaiaGetHeaderByNumberResponse gr = w3.kaiaGetHeaderByNumber(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
