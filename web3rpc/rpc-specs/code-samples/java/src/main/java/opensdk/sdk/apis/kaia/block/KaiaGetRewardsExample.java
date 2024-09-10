import org.web3j.protocol.kaia.core.method.response.KaiaGetRewardsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetRewardsExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGetRewardsExample() throws IOException {
        KaiaGetRewardsResponse gr = w3.kaiaGetRewards(
            "0x1000")
        .send();
        gr.getResult();
    }
}
