import org.web3j.protocol.kaia.core.method.response.DebugGetBlockRlpResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugGetBlockRlpExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugGetBlockRlpExample() throws IOException {
        DebugGetBlockRlpResponse response = w3.debugGetBlockRlp("earliest").send();
        response.getResult();
    }
}
