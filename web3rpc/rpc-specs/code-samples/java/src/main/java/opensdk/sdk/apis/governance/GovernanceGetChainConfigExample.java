import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.GovernanceGetChainConfigResponse;

import java.io.IOException;

public class GovernanceGetChainConfigExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void governanceGetChainConfigExample() throws IOException {
        GovernanceGetChainConfigResponse response = w3.governanceGetChainConfig().send();
        response.getResult();
    }
}
