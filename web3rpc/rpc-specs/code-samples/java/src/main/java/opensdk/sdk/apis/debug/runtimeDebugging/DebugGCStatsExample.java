import org.web3j.protocol.klaytn.core.method.response.DebugGcStatsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugGCStatsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugGCStatsExample() throws IOException {
        DebugGcStatsResponse response = w3.debugGcStats().send();
        response.getResult();
    }
}
