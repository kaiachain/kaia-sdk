import org.web3j.protocol.klaytn.core.method.response.DebugBacktraceAtResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugBacktraceAtExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugBacktraceAtExample() throws IOException {
        String location = "server.go:443";

        DebugBacktraceAtResponse response = w3.debugBacktraceAt(location).send();
        response.getResult();
    }
}
