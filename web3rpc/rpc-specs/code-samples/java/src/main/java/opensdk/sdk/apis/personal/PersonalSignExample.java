//import org.web3j.protocol.klaytn.core.method.response.PersonalSignResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalSignExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalSignExample() throws IOException {
        String message = "0xdead";
        String address = "0xb44b66f0d6ea803175f921018cba7e914fed25b9";
        String passphrase = "helloWorld";

//        PersonalSignResponse response = w3.personalSign(message, address, passphrase)
//                .send();
//        response.getResult();
    }
}
