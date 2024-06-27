import org.web3j.protocol.klaytn.core.method.response.KlayGetChainConfigResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetChainConfigExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayGetChainConfigExample() throws IOException {
        Integer blogNumberOrTag = 100;
        KlayGetChainConfigResponse response = w3.klayGetChainConfig(blogNumberOrTag).send();
        response.getResult();
    }
}
