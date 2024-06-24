package opensdk.sdk.apis.governance;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.GovernanceChainConfigResponse;

import java.io.IOException;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Governance RPC Test")
public class GovernanceGetChainConfigTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC governance_getChainConfig")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        GovernanceChainConfigResponse response = w3.governanceGetChainConfig().send();
        assertNotNull(response);
        assertNull(response.getError());
        assertNotNull(response.getResult());
        if (response.getResult() instanceof LinkedHashMap<?, ?>) {
            LinkedHashMap<?, ?> result = (LinkedHashMap<?, ?>) response.getResult();
            assertTrue(result.containsKey("chainId"));
        }
    }
}
