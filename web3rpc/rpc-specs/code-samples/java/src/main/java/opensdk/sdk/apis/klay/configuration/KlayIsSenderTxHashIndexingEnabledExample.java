import org.web3j.protocol.klaytn.core.method.response.KlayIsSenderTxHashIndexingEnabledResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayIsSenderTxHashIndexingEnabledExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayIsSenderTxHashIndexingEnabledExample() throws IOException {
        KlayIsSenderTxHashIndexingEnabledResponse response = w3.klayIsSenderTxHashIndexingEnabled().send();
        response.getResult();
    }
}
