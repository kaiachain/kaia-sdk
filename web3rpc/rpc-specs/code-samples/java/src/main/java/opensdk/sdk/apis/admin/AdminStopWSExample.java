import org.web3j.protocol.kaia.core.method.response.AdminStopWSResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStopWSExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminStopWSExample() throws IOException {
        AdminStopWSResponse response = w3.adminStopWS().send();
        response.getResult();
    }
}
