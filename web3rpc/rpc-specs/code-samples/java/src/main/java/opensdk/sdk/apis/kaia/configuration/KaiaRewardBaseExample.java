
import org.web3j.protocol.klaytn.core.method.response.KaiaRewardbaseResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaRewardBaseExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaRewardBaseExample() throws IOException {
        KaiaRewardbaseResponse response = w3.kaiaRewardbase().send();
        response.getResult();
    }
    
}
