import org.web3j.protocol.klaytn.core.method.response.DebugStartCollectingTrieStatsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStartCollectingTrieStatsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        String address = "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b";

        DebugStartCollectingTrieStatsResponse response = w3.debugStartCollectingTrieStats(address).send();
        response.getResult();
    }
}
