import org.web3j.protocol.klaytn.core.method.response.KlayIsParallelDBWriteResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayIsParallelDBWriteExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayIsParallelDBWriteExample() throws IOException {
        KlayIsParallelDBWriteResponse response = w3.klayIsParallelDBWrite().send();
        response.getResult();
    }
}
