
import org.web3j.protocol.klaytn.core.method.response.KaiaUpperBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaUpperBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaUpperBoundGasPriceExample() throws IOException {
        KaiaUpperBoundGasPriceResponse response = w3.kaiaUpperBoundGasPrice().send();
        response.getResult();
    }
}
