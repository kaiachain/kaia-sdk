package opensdk.sdk.apis.klay.miscellaneous;

import opensdk.sdk.apis.constant.UrlConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetProofResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Klay getProof Test")
public class KlayGetProofTest {
	private Web3j w3 = Web3j.build(new HttpService(UrlConstants.BAOBAB_RPC));
	@Test
	@DisplayName("RPC klay_getProof")
	void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
		String account = "0x0000000000000000000000000000000000000400";
		String[] keys = {"0xdeadbeef"};
		String blockNumber = "latest";
		KlayGetProofResponse response = w3.klayGetProof (account, keys, blockNumber).send();

		assertNotNull(response);
		assertNull(response.getError());
		assertInstanceOf(String.class, response.getResult().getCodeHash ().toString ());
	}
}
