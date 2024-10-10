import org.web3j.protocol.kaia.core.method.response.KlayGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGasPriceExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGasPriceExample() throws IOException {
        KlayGasPriceResponse gr = w3.klayGasPrice().send();
        gr.getResult();
    }
}
