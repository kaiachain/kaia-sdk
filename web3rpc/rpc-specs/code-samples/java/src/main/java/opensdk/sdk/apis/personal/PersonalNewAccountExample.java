import org.web3j.protocol.kaia.core.method.response.PersonalNewAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class PersonalNewAccountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void personalNewAccountExample() throws IOException {
        PersonalNewAccountResponse response = w3.personalNewAccount("helloWorld").send();
        response.getResult();
    }
}
