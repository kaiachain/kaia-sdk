import org.web3j.protocol.kaia.core.method.response.DebugStacksResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStacksExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStacksExample() throws IOException {
        DebugStacksResponse response = w3.debugStacks().send();
        response.getResult();
    }
}
