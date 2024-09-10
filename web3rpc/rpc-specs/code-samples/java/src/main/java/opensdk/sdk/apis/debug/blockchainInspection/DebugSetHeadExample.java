import org.web3j.protocol.kaia.core.method.response.DebugSetHeadResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugSetHeadExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugSetHeadExample() throws IOException {
        DebugSetHeadResponse response = w3.debugSetHead("0x100").send();
        response.getResult();
    }
}
