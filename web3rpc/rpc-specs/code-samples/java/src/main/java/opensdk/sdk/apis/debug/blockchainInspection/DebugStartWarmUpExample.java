import org.web3j.protocol.kaia.core.method.response.DebugStartWarmUpResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStartWarmUpExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStartWarmUpExample() throws IOException {
        DebugStartWarmUpResponse response = w3.debugStartWarmUp().send();
        response.getResult();
    }
}
