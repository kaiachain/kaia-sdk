import org.web3j.protocol.kaia.core.method.response.DebugTraceBlockFromFileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugTraceBlockFromFileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        String fileName = "/home/kaia/block.rlp";

        DebugTraceBlockFromFileResponse response = w3.debugTraceBlockFromFile(fileName, null).send();
        response.getResult();
    }
}
