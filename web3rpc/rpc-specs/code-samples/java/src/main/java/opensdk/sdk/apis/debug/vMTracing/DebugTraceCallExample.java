import org.web3j.protocol.kaia.core.method.response.DebugTraceBadBlockResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugTraceBadBlockExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));

    void debugTraceCallExample() throws IOException {
        Object tracerCallObject = {"to":"0x46eda75e7ca73cb1c2f83c3927211655420dbc44","data":"0x3fb5c1cb00000000000000000000000000000000000000000000000000000000000003e7"}
        String blockNumber = "latest"
        Object traceObject = {"tracer":"revertTracer"}
        DebugTraceCallResponse response = w3.debugTraceCall(tracerCallObject, blockNumber, traceObject, null).send();
        
        response.getResult();
    }
}
