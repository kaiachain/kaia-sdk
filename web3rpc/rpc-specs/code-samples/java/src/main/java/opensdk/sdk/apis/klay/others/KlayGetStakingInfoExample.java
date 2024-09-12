import org.web3j.protocol.kaia.core.method.response.KlayGetStakingInfoResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetStakingInfoExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayGetStakingInfoExample() throws IOException {
        String blockTag = "latest";

        KlayGetStakingInfoResponse response = w3
                .klayGetStakingInfo(blockTag)
                .send();
        response.getResult();
    }
}
