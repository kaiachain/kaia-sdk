import org.web3j.protocol.kaia.core.method.response.DebugFreeOSMemoryResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugFreeOSMemoryExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugFreeOSMemoryExample() throws IOException {
        DebugFreeOSMemoryResponse response = w3.debugFreeOSMemory().send();
        response.getResult();
    }
}
