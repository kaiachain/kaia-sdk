import org.web3j.protocol.klaytn.core.method.response.DebugMetricsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugMetricsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugMetricsExample() throws IOException {
        boolean raw = true;

        DebugMetricsResponse response = w3.debugMetrics(raw).send();
        response.getResult();
    }
}
