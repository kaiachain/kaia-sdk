import org.web3j.protocol.klaytn.core.method.response.DebugTraceBadBlockResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugTraceBadBlockExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugTraceBadBlockExample() throws IOException {
        String blockHash = "0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6";

        DebugTraceBadBlockResponse response = w3.debugTraceBadBlock(blockHash, null).send();
        response.getResult();
    }
}
