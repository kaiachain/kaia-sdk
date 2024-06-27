import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetTotalSupplyResponse;

import java.io.IOException;

public class KlayGetTotalSupplyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));

    void klayGetTotalSupply() throws IOException {
        String blockNumber = "latest";
        KlayGetTotalSupplyResponse response = w3.klayGetTotalSupply(blockNumber).send();
        response.getResult();
    }
}
