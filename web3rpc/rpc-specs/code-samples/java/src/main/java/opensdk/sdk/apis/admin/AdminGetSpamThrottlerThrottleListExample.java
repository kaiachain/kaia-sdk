import org.web3j.protocol.kaia.core.method.response.AdminGetSpamThrottlerThrottleListResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminGetSpamThrottlerThrottleListExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminGetSpamThrottlerThrottleListExample() throws IOException {
        AdminGetSpamThrottlerThrottleListResponse response = w3.adminGetSpamThrottlerThrottleList().send();
        response.getResult();
    }
}
