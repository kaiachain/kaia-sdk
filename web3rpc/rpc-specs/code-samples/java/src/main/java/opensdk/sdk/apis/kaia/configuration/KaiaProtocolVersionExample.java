
import org.web3j.protocol.klaytn.core.method.response.KaiaProtocolVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaProtocolVersionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaProtocolVersionExample() throws IOException {
        KaiaProtocolVersionResponse response = w3.kaiaProtocolVersion().send();
        response.getResult();
    }
}
