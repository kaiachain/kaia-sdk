import org.web3j.protocol.kaia.core.method.response.DebugMemStatsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugMemStatsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugMemStatsExample() throws IOException {
        DebugMemStatsResponse response = w3.debugMemStats().send();
        response.getResult();
    }
}
