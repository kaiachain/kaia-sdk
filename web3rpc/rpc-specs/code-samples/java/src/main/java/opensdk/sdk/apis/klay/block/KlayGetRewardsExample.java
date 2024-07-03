import org.web3j.protocol.kaia.core.method.response.KlayGetRewardsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetRewardsExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetRewardsExample() throws IOException {
        KlayGetRewardsResponse gr = w3.klayGetRewards(
            "0x1000")
        .send();
        gr.getResult();
    }
}
