import org.web3j.protocol.kaia.core.method.response.PersonalLockAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class PersonalLockAccountExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void personalLockAccountExample() throws IOException {
        PersonalLockAccountResponse response = w3.personalLockAccount("0xda04fb00e2cb5745cef7d8c4464378202a1673ef")
                .send();
        response.getResult();
    }
}
