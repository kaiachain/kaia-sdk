import org.web3j.protocol.core.methods.response.EthHashrate;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthHashrateExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethHashrateExample() throws IOException {
        EthHashrate response = w3.ethHashrate().send();
        response.getResult();
    }
    
}
