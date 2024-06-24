
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KaiaForkStatusResponse;

import java.io.IOException;

public class KaiaForkStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaForkStatusExample() throws IOException {
        int forkNumber = 20;
        KaiaForkStatusResponse response = w3.kaiaForkStatus(forkNumber).send();
        response.getResult();
    }
}
