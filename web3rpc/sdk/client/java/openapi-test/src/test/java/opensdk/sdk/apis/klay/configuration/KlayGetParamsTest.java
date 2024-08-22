package opensdk.sdk.apis.governance;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetParamsResponse;

import java.io.IOException;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay RPC Test")
public class KlayGetParamsTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC klay_getParams")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        int blockNumber = 0;
        KlayGetParamsResponse response = w3.klayGetParams(blockNumber).send();
        assertNotNull(response);
        assertNull(response.getError());
        assertNotNull(response.getResult());
        if (response.getResult() instanceof LinkedHashMap<?,?>) {
            LinkedHashMap<?,?> result = (LinkedHashMap<?, ?>) response.getResult();
            assertTrue(result.containsKey("governance.governingnode"));
        }
    }
}
