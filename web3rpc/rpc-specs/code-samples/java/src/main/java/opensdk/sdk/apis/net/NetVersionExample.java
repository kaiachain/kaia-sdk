import org.web3j.protocol.core.methods.response.NetVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class NetVersionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        NetVersion response = w3.netVersion().send();
        response.getResult();
    }
}
