import org.web3j.protocol.kaia.core.method.response.DebugIsPProfRunningResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugIsPProfRunningExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugIsPProfRunningExample() throws IOException {
        DebugIsPProfRunningResponse response = w3.debugIsPProfRunning().send();
        response.getResult();
    }
}
