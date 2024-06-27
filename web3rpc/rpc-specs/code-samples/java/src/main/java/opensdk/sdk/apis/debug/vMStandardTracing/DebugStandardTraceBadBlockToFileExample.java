import org.web3j.protocol.klaytn.core.method.response.DebugStandardTraceBadBlockToFileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStandardTraceBadBlockToFileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStandardTraceBlockToFileExample() throws IOException {
        String blockHash = "0x1d5ba00e313a81ae6d409d459c153327072665d9ea2f47608369722baf0cfbb6";

        DebugStandardTraceBadBlockToFileResponse response = w3.debugStandardTraceBadBlockToFile(blockHash, null).send();
        response.getResult();
    }
}
