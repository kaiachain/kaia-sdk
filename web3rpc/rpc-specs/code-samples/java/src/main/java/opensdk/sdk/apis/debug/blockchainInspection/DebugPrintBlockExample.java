import org.web3j.protocol.kaia.core.method.response.DebugPrintBlockResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugPrintBlockExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugPrintBlockExample() throws IOException {
        String blockNumber = "0x80";

        DebugPrintBlockResponse response = w3.debugPrintBlock(blockNumber).send();
        response.getResult();
    }
}
