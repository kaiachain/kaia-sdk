import org.web3j.protocol.klaytn.core.method.response.DebugFreeOSMemoryResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugFreeOSMemoryExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugFreeOSMemoryExample() throws IOException {
        DebugFreeOSMemoryResponse response = w3.debugFreeOSMemory().send();
        response.getResult();
    }
}
