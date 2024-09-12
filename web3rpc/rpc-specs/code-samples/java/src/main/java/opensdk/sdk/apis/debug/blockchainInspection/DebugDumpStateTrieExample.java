import org.web3j.protocol.kaia.core.method.response.DebugDumpStateTrieResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugDumpStateTrieExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugDumpStateTrieExample() throws IOException {
        DebugDumpStateTrieResponse response = w3.debugDumpStateTrie("0x80").send();
        response.getResult();
    }
}
