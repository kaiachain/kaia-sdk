import org.web3j.protocol.kaia.core.method.response.KaiaGetCouncilSizeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetCouncilSizeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGetCouncilSizeExample() throws IOException {
        KaiaGetCouncilSizeResponse gr = w3.kaiaGetCouncilSize(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
