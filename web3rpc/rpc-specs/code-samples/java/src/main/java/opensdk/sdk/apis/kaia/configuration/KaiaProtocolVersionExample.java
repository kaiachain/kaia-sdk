import org.web3j.protocol.kaia.core.method.response.KaiaProtocolVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaProtocolVersionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaProtocolVersionExample() throws IOException {
        KaiaProtocolVersionResponse response = w3.kaiaProtocolVersion().send();
        response.getResult();
    }
}
