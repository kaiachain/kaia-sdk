import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.GovernanceTotalVotingPowerResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class GovernanceTotalVotingPowerExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
  void governanceTotalVotingPowerExample() throws IOException {
    GovernanceTotalVotingPowerResponse response = w3.governanceTotalVotingPower().send();
    response.getResult();
  }
}
