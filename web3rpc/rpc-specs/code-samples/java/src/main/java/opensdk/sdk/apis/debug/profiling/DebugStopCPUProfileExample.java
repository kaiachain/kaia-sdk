import org.web3j.protocol.klaytn.core.method.response.DebugStopCPUProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStopCPUProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStopCPUProfileExample() throws IOException {
        DebugStopCPUProfileResponse response = w3.debugStopCPUProfile().send();
        response.getResult();
    }
}
