import org.web3j.protocol.kaia.core.method.response.GovernancePendingChangesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernancePendingChangesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governancePendingChangesExample() throws IOException {
        GovernancePendingChangesResponse response = w3.governancePendingChanges().send();
        response.getResult();
    }
}
