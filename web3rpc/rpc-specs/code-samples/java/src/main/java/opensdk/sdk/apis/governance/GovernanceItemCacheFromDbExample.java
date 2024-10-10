import org.web3j.protocol.kaia.core.method.response.GovernanceItemCacheFromDbResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class GovernanceItemCacheFromDbExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void governanceItemCacheFromDbExample() throws IOException {
        int blockNum = 0;

        GovernanceItemCacheFromDbResponse response = w3.governanceItemCacheFromDb(blockNum).send();
        response.getResult();
    }
}
