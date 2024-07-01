
import org.web3j.protocol.klaytn.core.method.response.KaiaGetStakingInfoResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetStakingInfoExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetStakingInfoExample() throws IOException {
        String blockTag = "latest";

        KaiaGetStakingInfoResponse response = w3
                .kaiaGetStakingInfo(blockTag)
                .send();
        response.getResult();
    }
}
