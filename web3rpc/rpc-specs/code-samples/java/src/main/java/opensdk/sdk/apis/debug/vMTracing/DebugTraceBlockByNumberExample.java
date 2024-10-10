import org.web3j.protocol.kaia.core.method.response.DebugTraceBlockByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugTraceBlockByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugTraceBlockByNumberExample() throws IOException {
        int blockNum = 21;

        DebugTraceBlockByNumberResponse response = w3.debugTraceBlockByNumber(blockNum, null).send();
        response.getResult();
    }
}
