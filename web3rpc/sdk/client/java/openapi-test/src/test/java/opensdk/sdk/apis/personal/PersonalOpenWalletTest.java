package opensdk.sdk.apis.personal;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import opensdk.sdk.apis.constant.UrlConstants;
import org.web3j.protocol.klaytn.core.method.response.PersonalOpenWalletResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

@DisplayName("Personal RPC Test")
public class PersonalOpenWalletTest {

    private Web3j w3 = Web3j.build(new HttpService(UrlConstants.RPC));

    @Test
    @DisplayName("RPC personal_openWallet")
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        String url = "keystore:///home/kaia/klay-node/kcn-v1.10.2-0-linux-amd64/kcn-linux-amd64/data/keystore/UTC--2" +
                "023-04-13T03-23-36.992476555Z--8cd4b6b24f2cd0b83d49876f932254823e875547";
        String passphrase = "passphrase";
        PersonalOpenWalletResponse response = w3.personalOpenWallet(url, passphrase).send();
        assertNotNull(response);
        assertNull(response.getError());
        assertNull(response.getResult());
    }
}
