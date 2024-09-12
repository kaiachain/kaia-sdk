import org.web3j.protocol.kaia.core.method.response.KlayRewardbaseResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayRewardBaseExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayRewardBaseExample() throws IOException {
        KlayRewardbaseResponse response = w3.klayRewardbase().send();
        response.getResult();
    }
    
}
