import org.web3j.protocol.klaytn.core.method.response.PersonalUnlockAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalUnlockAccountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalUnlockAccountExample() throws IOException {
        String address = "0xb1ab1f758e0d6398c568936400ea94825c4ebdc2";
        String passphrase = "helloWorld";
        int duration = 30;

        PersonalUnlockAccountResponse response = w3.personalUnlockAccount(address, passphrase, duration)
                .send();
        response.getResult();
    }
}
