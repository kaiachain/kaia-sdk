import org.web3j.protocol.core.methods.response.EthGasPrice;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthGasPriceExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void ethGasPriceExample() throws IOException {
        EthGasPrice br = w3.ethGasPrice().send();
        br.getResult();
    }
}
