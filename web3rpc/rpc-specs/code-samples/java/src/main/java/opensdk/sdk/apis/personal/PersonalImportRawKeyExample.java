import org.web3j.protocol.klaytn.core.method.response.PersonalImportRawKeyResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalImportRawKeyExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalImportRawKeyExample() throws IOException {
        PersonalImportRawKeyResponse response = w3.
            personalImportRawKey(
                "45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                "mypassword")
            .send();
        response.getResult();
    }
}
