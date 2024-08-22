import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KaiaGetTotalSupplyResponse;

import java.io.IOException;

public class KaiaGetTotalSupplyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));

    void KaiaGetTotalSupply() throws IOException {
        String blockNumber = "latest";
        KaiaGetTotalSupplyResponse response = w3.kaiaGetTotalSupply(blockNumber).send();
        response.getResult();
    }
}
