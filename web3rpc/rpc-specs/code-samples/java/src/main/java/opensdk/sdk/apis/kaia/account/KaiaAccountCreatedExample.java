
import org.web3j.protocol.klaytn.core.method.response.KaiaAccountCreatedResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaAccountCreatedExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaAccountCreatedExample() throws IOException {
        KaiaAccountCreatedResponse ar = w3.kaiaAccountCreated(
            "0xa4f42d4d2a3a13874406435500950c9bf2d783db",
            "latest")
        .send();
        ar.getResult();
    }
}
