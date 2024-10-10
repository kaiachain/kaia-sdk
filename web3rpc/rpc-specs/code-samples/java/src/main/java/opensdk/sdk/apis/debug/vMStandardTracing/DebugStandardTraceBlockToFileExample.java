import org.web3j.protocol.kaia.core.method.response.DebugStandardTraceBlockToFileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStandardTraceBlockToFileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStandardTraceBlockToFileExample() throws IOException {
        String blockHash = "0xf1b4df5d4457d4771740887eeb46de3fc26ae4cddf93d69b1b237c2366ff12eb";

        DebugStandardTraceBlockToFileResponse response = w3.debugStandardTraceBlockToFile(blockHash, null).send();
        response.getResult();
    }
}
