import org.web3j.protocol.kaia.core.method.response.PersonalListWalletsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class PersonalListWalletsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void personalListWalletsExample() throws IOException {
        PersonalListWalletsResponse response = w3.personalListWallets()
                .send();
        response.getResult();
    }
}
