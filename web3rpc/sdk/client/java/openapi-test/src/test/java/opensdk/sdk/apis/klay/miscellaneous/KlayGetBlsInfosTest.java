package opensdk.sdk.apis.klay.miscellaneous;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetBlsInfosResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay getBlsInfos Test")
public class KlayGetBlsInfosTest {
	private Web3j w3 = Web3j.build(new HttpService(UrlConstants.KEN_RPC));

	@Test
	@DisplayName("RPC klay_getBlsInfos")
	void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
		String blockNumber = "latest";
		KlayGetBlsInfosResponse response = w3.klayGetBlsInfos(blockNumber).send();

		assertNotNull(response);
		assertNull(response.getError());
	}
}
