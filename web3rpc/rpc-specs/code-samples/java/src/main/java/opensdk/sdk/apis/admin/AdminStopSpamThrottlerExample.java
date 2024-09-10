import org.web3j.protocol.kaia.core.method.response.AdminStopSpamThrottlerResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStopSpamThrottlerExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminStopSpamThrottlerExample() throws IOException {
        AdminStopSpamThrottlerResponse response = w3.adminStopSpamThrottler().send();
        response.getResult();
    }
}
