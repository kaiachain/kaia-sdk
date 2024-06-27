import org.web3j.protocol.klaytn.core.method.response.DebugStopPProfResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStopPProfExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStopPProfExample() throws IOException {
        DebugStopPProfResponse response = w3.debugStopPProf().send();
        response.getResult();
    }
}
