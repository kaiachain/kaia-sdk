import org.web3j.protocol.kaia.core.method.response.DebugTraceBlockByNumberRangeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugTraceBlockByNumberRangeExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugTraceBlockByNumberRangeExample() throws IOException {
        int startBlockNum = 21;
        int endBlockNum = 30;

        DebugTraceBlockByNumberRangeResponse response = w3.debugTraceBlockByNumberRange(startBlockNum, endBlockNum, null).send();
        response.getResult();
    }
}
