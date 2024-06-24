
import org.web3j.protocol.klaytn.core.method.response.KaiaGetCouncilSizeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetCouncilSizeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetCouncilSizeExample() throws IOException {
        KaiaGetCouncilSizeResponse gr = w3.kaiaGetCouncilSize(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
