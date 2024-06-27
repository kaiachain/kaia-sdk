import org.web3j.protocol.klaytn.core.method.response.KaiaNodeAddressResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetNodeAddressExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetNodeAddressExample() throws IOException {
        KaiaNodeAddressResponse response = w3.kaiaNodeAddress().send();
        response.getResult();
    }
}
