import org.web3j.protocol.kaia.core.method.response.KaiaLowerBoundGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaLowerBoundGasPriceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaLowerBoundGasPriceExample() throws IOException {
        KaiaLowerBoundGasPriceResponse response = w3.kaiaLowerBoundGasPrice().send();
        response.getResult();
    }
}
