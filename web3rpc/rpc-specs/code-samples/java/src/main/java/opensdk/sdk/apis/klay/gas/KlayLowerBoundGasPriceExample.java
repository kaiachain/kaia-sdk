import org.web3j.protocol.kaia.core.method.response.KlayLowerBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayLowerBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayLowerBoundGasPriceExample() throws IOException {
        KlayLowerBoundGasPriceResponse response = w3.klayLowerBoundGasPrice().send();
        response.getResult();
    }
}
