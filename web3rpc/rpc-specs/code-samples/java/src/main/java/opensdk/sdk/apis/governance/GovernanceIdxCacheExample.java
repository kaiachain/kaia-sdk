import org.web3j.protocol.kaia.core.method.response.GovernanceIdxCacheResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceIdxCacheExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceIdxCacheExample() throws IOException {
        GovernanceIdxCacheResponse response = w3.governanceIdxCache().send();
        response.getResult();
    }
}
