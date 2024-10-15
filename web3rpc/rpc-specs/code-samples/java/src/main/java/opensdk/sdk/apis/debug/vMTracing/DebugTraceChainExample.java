import org.web3j.protocol.kaia.core.method.response.DebugTraceBadBlockResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugTraceChainExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));

    void debugTraceChainExample() throws IOException {
        String startBlockNumber = "1000";
        String endBlockNumber = "1001";
        Object traceObject = {"tracer":"revertTracer"}
        DebugTraceCallResponse response = w3.debugTraceChain(startBlockNumber, endBlockNumber,traceObject , null).send();
        
        response.getResult();
    }
}
