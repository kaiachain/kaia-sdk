import org.web3j.protocol.kaia.core.method.response.KaiaGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGasPriceExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGasPriceExample() throws IOException {
        KaiaGasPriceResponse gr = w3.kaiaGasPrice().send();
        gr.getResult();
    }
}
