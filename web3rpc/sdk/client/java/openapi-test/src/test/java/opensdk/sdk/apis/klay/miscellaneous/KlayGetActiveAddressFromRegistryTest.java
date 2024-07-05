package opensdk.sdk.apis.klay.miscellaneous;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetActiveAddressFromRegistryResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay GetActiveAddressFromRegistry Test")
public class KlayGetActiveAddressFromRegistryTest {
	private Web3j w3 = Web3j.build(new HttpService(UrlConstants.KEN_RPC));

	@Test
	@DisplayName("RPC klay_GetActiveAddressFromRegistry")
	void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
		String blockNumber = "latest";
		KlayGetActiveAddressFromRegistryResponse response = w3.klayGetActiveAddressFromRegistry("KIP113", blockNumber)
				.send();
		assertNotNull(response);
		assertNull(response.getError());
	}
}
