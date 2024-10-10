import org.web3j.protocol.kaia.core.method.response.DebugChaindbCompactResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugChaindbCompactExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugChaindbCompactExample() throws IOException {
        DebugChaindbCompactResponse response = w3.debugChaindbCompact().send();
        response.getResult();
    }
}
