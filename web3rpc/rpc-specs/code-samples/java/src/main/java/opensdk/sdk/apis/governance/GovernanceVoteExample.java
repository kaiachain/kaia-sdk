import org.web3j.protocol.kaia.core.method.response.GovernanceVoteResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceVoteExample {
      private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceVoteExample() throws IOException {
        String key = "governance.governancemode";
        String value = "ballot";

        GovernanceVoteResponse response = w3.governanceVote(key, value).send();
        response.getResult();
    }
}
