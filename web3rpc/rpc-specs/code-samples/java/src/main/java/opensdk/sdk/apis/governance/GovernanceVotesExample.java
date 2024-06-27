import org.web3j.protocol.klaytn.core.method.response.GovernanceVotesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class GovernanceVotesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void governanceVotesExample() throws IOException {
        GovernanceVotesResponse response = w3.governanceVotes().send();
        response.getResult();
    }
}
