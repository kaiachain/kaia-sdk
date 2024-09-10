import org.web3j.protocol.kaia.core.method.response.GovernanceShowTallyResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceShowTallyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceShowTallyExample() throws IOException {
        GovernanceShowTallyResponse response = w3.governanceShowTally().send();
        response.getResult();
    }
}
