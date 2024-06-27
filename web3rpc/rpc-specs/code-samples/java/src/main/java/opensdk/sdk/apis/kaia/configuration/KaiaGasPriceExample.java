import org.web3j.protocol.klaytn.core.method.response.KaiaGasPriceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGasPriceExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGasPriceExample() throws IOException {
        KaiaGasPriceResponse gr = w3.kaiaGasPrice().send();
        gr.getResult();
    }
}
