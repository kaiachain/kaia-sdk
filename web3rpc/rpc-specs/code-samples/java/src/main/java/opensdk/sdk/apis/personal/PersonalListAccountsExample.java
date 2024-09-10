import org.web3j.protocol.kaia.core.method.response.PersonalListAccountsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class PersonalListAccountsExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void personalListAccountsExample() throws IOException {
        PersonalListAccountsResponse response = w3.personalListAccounts()
                .send();
        response.getResult();
    }
}
