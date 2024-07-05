package opensdk.sdk.apis.klay.miscellaneous;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetTotalSupplyResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay GetTotalSupply Test")
public class KlayGetTotalSupplyTest {
	private final Web3j w3 = Web3j.build(new HttpService(UrlConstants.KEN_RPC));

	@Test
	@DisplayName("RPC klay_getTotalSupply")
	void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
		String blockNumber = "latest";
		KlayGetTotalSupplyResponse response = w3.klayGetTotalSupply (blockNumber).send();

		assertNotNull(response);
		assertNull(response.getError());
	}
}
