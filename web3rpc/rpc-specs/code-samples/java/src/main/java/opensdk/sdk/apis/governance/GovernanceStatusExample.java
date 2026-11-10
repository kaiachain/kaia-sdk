import org.web3j.protocol.kaia.core.method.response.GovernanceStatusResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceIdxCacheExample() throws IOException {
        GovernanceStatusResponse response = w3.governanceStatus().send();
        response.getResult();
    }
}
