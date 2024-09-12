import org.web3j.protocol.kaia.core.method.response.AdminGetSpamThrottlerWhiteListResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminGetSpamThrottlerWhiteListExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminGetSpamThrottlerWhiteListExample() throws IOException {
        AdminGetSpamThrottlerWhiteListResponse response = w3.adminGetSpamThrottlerWhiteList().send();
        response.getResult();
    }
}
