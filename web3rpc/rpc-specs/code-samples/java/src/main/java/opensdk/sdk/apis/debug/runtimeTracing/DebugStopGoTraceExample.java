import org.web3j.protocol.klaytn.core.method.response.DebugStopGoTraceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStopGoTraceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStopGoTraceExample() throws IOException {
        DebugStopGoTraceResponse response = w3.debugStopGoTrace().send();
        response.getResult();
    }
}
