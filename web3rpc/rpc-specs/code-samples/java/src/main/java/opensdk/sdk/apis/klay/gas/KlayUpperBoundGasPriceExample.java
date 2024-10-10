import org.web3j.protocol.kaia.core.method.response.KlayUpperBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayUpperBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayUpperBoundGasPriceExample() throws IOException {
        KlayUpperBoundGasPriceResponse response = w3.klayUpperBoundGasPrice().send();
        response.getResult();
    }
}
