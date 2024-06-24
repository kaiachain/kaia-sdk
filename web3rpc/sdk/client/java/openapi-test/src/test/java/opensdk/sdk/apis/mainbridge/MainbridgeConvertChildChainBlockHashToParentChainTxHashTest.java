package opensdk.sdk.apis.mainbridge;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.MainbridgeConvertChildChainBlockHashToParentChainTxHashResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Eth RPC Test")
public class MainbridgeConvertChildChainBlockHashToParentChainTxHashTest {
    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC main_bridge")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        MainbridgeConvertChildChainBlockHashToParentChainTxHashResponse response = w3.mainbridgeConvertChildChainBlockHashToParentChainTxHash (
                "0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880").send();
        assertNotNull(response);
        assertNull(response.getError());
        assertNotNull(response.getResult());
    }
}
