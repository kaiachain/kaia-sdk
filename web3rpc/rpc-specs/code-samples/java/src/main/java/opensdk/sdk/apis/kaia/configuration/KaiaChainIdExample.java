import org.web3j.protocol.klaytn.core.method.response.KaiaChainIDResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaChainIdExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaChainIdExample() throws IOException {
        KaiaChainIDResponse cr = w3.kaiaChainID().send();
        cr.getResult();
    }
}
