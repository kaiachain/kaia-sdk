//import org.web3j.protocol.kaia.core.method.response.KaiaGasPriceAtResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGasPriceAtExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGasPriceAtExample() throws IOException {
//        KaiaGasPriceAtResponse gr = w3.kaiaGasPriceAt(
//            "0x64")
//        .send();
//        gr.getResult();
    }
}
