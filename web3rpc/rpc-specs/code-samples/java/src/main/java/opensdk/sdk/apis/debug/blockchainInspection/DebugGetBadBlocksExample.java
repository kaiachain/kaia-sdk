import org.web3j.protocol.kaia.core.method.response.DebugGetBadBlocksResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugGetBadBlocksExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugGetBadBlocksExample() throws IOException {
        DebugGetBadBlocksResponse response = w3.debugGetBadBlocks().send();
        response.getResult();
    }
}
