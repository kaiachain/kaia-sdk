//import org.web3j.protocol.kaia.core.method.response.GovernanceGetStakingInfoResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceGetStakingInfoExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceGetStakingInfoExample() throws IOException {
        String blockNum = "latest";

//        GovernanceGetStakingInfoResponse response = w3.governanceGetStakingInfo(blockNum).send();
//        response.getResult();
    }
}
