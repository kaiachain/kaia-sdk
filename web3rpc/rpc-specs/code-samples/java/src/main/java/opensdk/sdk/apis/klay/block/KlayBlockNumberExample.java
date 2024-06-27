import org.web3j.protocol.klaytn.core.method.response.KlayBlockNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayBlockNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayBlockNumberExample() throws IOException {
        KlayBlockNumberResponse br = w3.klayBlockNumber().send();
        br.getResult();
    }
}
