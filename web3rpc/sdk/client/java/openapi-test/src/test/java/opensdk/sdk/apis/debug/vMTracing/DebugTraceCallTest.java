package opensdk.sdk.apis.debug.vMTracing;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import org.web3j.protocol.klaytn.core.method.response.DebugTraceCallResponse;

@DisplayName("Debug RPC Test")
public class DebugTraceCallTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.BAOBAB_RPC));

    @Disabled
    @Test
    @DisplayName("RPC debug_traceCall")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        // Create the tracerCallObject map
        Map<String, Object> tracerCallObject = new HashMap<>();
        tracerCallObject.put("to", "0x46eda75e7ca73cb1c2f83c3927211655420dbc44");
        tracerCallObject.put("data", "0x3fb5c1cb00000000000000000000000000000000000000000000000000000000000003e7");

        String blockNumber = "latest";

        // Create the traceObject map
        Map<String, Object> traceObject = new HashMap<>();
        traceObject.put("tracer", "revertTracer");

        // Perform the debug_traceCall
        DebugTraceCallResponse response = w3.debugTraceCall (tracerCallObject, blockNumber, traceObject).send();

        // Assert the response
        assertNotNull(response);
        assertNull(response.getError());
        assertNotNull(response.getResult());
    }
}
