import org.web3j.protocol.kaia.core.method.response.DebugStopGoTraceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStopGoTraceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStopGoTraceExample() throws IOException {
        DebugStopGoTraceResponse response = w3.debugStopGoTrace().send();
        response.getResult();
    }
}
