import org.web3j.protocol.kaia.core.method.response.AdminSetMaxSubscriptionPerWSConnResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminSetMaxSubscriptionPerWSConnExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminSetMaxSubscriptionPerWSConnExample() throws IOException {
        int limit = 5;

        AdminSetMaxSubscriptionPerWSConnResponse response = w3.adminSetMaxSubscriptionPerWSConn(limit).send();
        response.getResult();
    }
}
