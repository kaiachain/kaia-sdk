import org.web3j.protocol.klaytn.core.method.response.DebugStartGoTraceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStartGoTraceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStartGoTraceExample() throws IOException {
        String file = "go.trace";

        DebugStartGoTraceResponse response = w3.debugStartGoTrace(file).send();
        response.getResult();
    }
}
