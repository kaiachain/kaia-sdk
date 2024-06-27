import org.web3j.protocol.klaytn.core.method.response.NetNetworkIDResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class NetNetworkIDExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        NetNetworkIDResponse response = w3.netNetworkID().send();
        response.getResult();
    }
}
