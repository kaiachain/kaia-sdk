import org.web3j.protocol.kaia.core.method.response.KaiaAccountsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaAccountsExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaAccountsExample() throws IOException {
        KaiaAccountsResponse ar = w3.kaiaAccounts().send();
        ar.getResult();
    }
}
