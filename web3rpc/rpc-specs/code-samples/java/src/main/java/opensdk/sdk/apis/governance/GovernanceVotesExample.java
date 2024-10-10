import org.web3j.protocol.kaia.core.method.response.GovernanceVotesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceVotesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceVotesExample() throws IOException {
        GovernanceVotesResponse response = w3.governanceVotes().send();
        response.getResult();
    }
}
