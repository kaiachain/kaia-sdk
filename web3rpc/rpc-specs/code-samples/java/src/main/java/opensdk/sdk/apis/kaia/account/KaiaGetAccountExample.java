import org.web3j.protocol.klaytn.core.method.response.KaiaGetAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetAccountExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetAccountExample() throws IOException {
        KaiaGetAccountResponse ar = w3.kaiaGetAccount(
            "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec",
            "latest")
        .send();
        ar.getResult();
    }
}
