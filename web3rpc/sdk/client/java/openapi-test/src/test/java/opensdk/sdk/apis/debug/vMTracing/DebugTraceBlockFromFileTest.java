package opensdk.sdk.apis.debug.vMTracing;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.DebugTraceBlockFromFileResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@DisplayName("Debug RPC Test")
public class DebugTraceBlockFromFileTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC debug_traceBlockFromFile")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        String fileName = "/home/kaia/block.rlp";

        DebugTraceBlockFromFileResponse response = w3.debugTraceBlockFromFile(fileName, null).send();

        assertNotNull(response);
        assertNull(response.getError());

        assertNotNull(response.getResult());
        if (!response.getResult().isEmpty()) {
            assertNotNull(response.getResult().get(0).getGas());
        }
    }
}
