import org.web3j.protocol.kaia.core.method.response.KlayAccountCreatedResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayAccountCreatedExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayAccountCreatedExample() throws IOException {
        KlayAccountCreatedResponse ar = w3.klayAccountCreated(
            "0xa4f42d4d2a3a13874406435500950c9bf2d783db",
            "latest")
        .send();
        ar.getResult();
    }
}
