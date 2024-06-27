import org.web3j.protocol.klaytn.core.method.response.KlayNodeAddressResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetNodeAddressExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayGetNodeAddressExample() throws IOException {
        KlayNodeAddressResponse response = w3.klayNodeAddress().send();
        response.getResult();
    }
}
