import org.web3j.protocol.kaia.core.method.response.KaiaUpperBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaUpperBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaUpperBoundGasPriceExample() throws IOException {
        KaiaUpperBoundGasPriceResponse response = w3.kaiaUpperBoundGasPrice().send();
        response.getResult();
    }
}
