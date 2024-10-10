import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthEtherbaseExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethEtherbaseExample() throws IOException {
//        EthEtherbaseResponse response = w3.ethEtherbase().send();
//        response.getResult();
    }
}
