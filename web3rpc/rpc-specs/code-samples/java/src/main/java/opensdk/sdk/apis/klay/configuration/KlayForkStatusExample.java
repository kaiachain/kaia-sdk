import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayForkStatusResponse;

import java.io.IOException;

public class KlayForkStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayForkStatusExample() throws IOException {
        int forkNumber = 20;
        KlayForkStatusResponse response = w3.klayForkStatus(forkNumber).send();
        response.getResult();
    }
}
