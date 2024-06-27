import org.web3j.protocol.klaytn.core.method.response.KaiaGetCouncilResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetCouncilExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetCouncilExample() throws IOException {
        KaiaGetCouncilResponse gr = w3.kaiaGetCouncil(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
