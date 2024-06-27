import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.GovernanceGetRewardsAccumulatedResponse;

import java.io.IOException;

public class GovernanceGetRewardsAccumulatedExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void governanceGetRewardsAccumulatedExample() throws IOException {
        int firstBlock = 123400489;
        int lastBlock = 123416489;
        GovernanceGetRewardsAccumulatedResponse response = w3.governanceGetRewardsAccumulated(firstBlock, lastBlock).send();
        response.getResult();
    }
}
