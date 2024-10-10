import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.GovernanceMyVotingPowerResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class GovernanceMyVotingPowerExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));  void governanceMyVotingPowerExample() throws IOException {
    GovernanceMyVotingPowerResponse response = w3.governanceMyVotingPower().send();
    response.getResult();
  }
}
