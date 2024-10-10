import org.web3j.protocol.kaia.core.method.response.KlayAccountsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayAccountsExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayAccountsExample() throws IOException {
        KlayAccountsResponse ar = w3.klayAccounts().send();
        ar.getResult();
    }
}
