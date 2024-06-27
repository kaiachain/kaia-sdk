import org.web3j.protocol.klaytn.core.method.response.DebugGetBlockRlpResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugGetBlockRlpExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugGetBlockRlpExample() throws IOException {
        DebugGetBlockRlpResponse response = w3.debugGetBlockRlp("earliest").send();
        response.getResult();
    }
}
