import org.web3j.protocol.klaytn.core.method.response.KlayUpperBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayUpperBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayUpperBoundGasPriceExample() throws IOException {
        KlayUpperBoundGasPriceResponse response = w3.klayUpperBoundGasPrice().send();
        response.getResult();
    }
}
