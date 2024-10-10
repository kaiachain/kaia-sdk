import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.GovernanceGetParamsResponse;

import java.io.IOException;

public class GovernanceGetParamsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceGetParamsExample() throws IOException {
        int blockTag = 0;
        GovernanceGetParamsResponse response = w3.governanceGetParams(blockTag).send();
        response.getResult();
    }
}
