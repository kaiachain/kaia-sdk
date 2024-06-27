import org.web3j.protocol.klaytn.core.method.response.DebugChaindbPropertyResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugChaindbPropertyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugChaindbPropertyExample() throws IOException {
        String property = "0xe17d821e9a8a8736b9aea8c2de1f3a4934ac0a2f";

        DebugChaindbPropertyResponse response = w3.debugChaindbProperty(property).send();
        response.getResult();
    }
}
