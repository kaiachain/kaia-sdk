import org.web3j.protocol.klaytn.core.method.response.DebugDumpBlockResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugDumpBlockExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugDumpBlockExample() throws IOException {
        DebugDumpBlockResponse response = w3.debugDumpBlock("0x80").send();
        response.getResult();
    }
}
