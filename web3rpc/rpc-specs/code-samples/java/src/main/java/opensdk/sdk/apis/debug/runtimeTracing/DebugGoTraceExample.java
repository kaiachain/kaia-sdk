import org.web3j.protocol.kaia.core.method.response.DebugGoTraceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugGoTraceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugGoTraceExample() throws IOException {
        String file = "go.trace";
        int seconds = 5;

        DebugGoTraceResponse response = w3.debugGoTrace(file, seconds).send();
        response.getResult();
    }
}
