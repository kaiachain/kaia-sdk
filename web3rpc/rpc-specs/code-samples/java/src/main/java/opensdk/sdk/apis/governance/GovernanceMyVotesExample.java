import org.web3j.protocol.kaia.core.method.response.GovernanceMyVotesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceMyVotesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceMyVotesExample() throws IOException {
        GovernanceMyVotesResponse response = w3.governanceMyVotes().send();
        response.getResult();
    }
}
