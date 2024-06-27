import org.web3j.protocol.klaytn.core.method.response.DebugChaindbCompactResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugChaindbCompactExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugChaindbCompactExample() throws IOException {
        DebugChaindbCompactResponse response = w3.debugChaindbCompact().send();
        response.getResult();
    }
}
