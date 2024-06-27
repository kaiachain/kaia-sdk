import org.web3j.protocol.klaytn.core.method.response.KaiaNewBlockFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaNewBlockFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaNewBlockFilterExample() throws IOException {
        KaiaNewBlockFilterResponse response = w3.kaiaNewBlockFilter().send();
        response.getResult();
    }
}
