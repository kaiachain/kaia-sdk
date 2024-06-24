package opensdk.sdk.apis.subbridge;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.SubbridgeParentOperatorNonceResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay RPC Test")
public class SubbridgeParentOperatorNonceTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC main_bridge")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        SubbridgeParentOperatorNonceResponse response = w3.subbridgeParentOperatorNonce().send();
        assertNotNull(response);
        assertNull(response.getError());
        assertNotNull(response.getResult());
    }
}
