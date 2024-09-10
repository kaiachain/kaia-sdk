import org.web3j.protocol.core.methods.response.EthSubmitHashrate;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthSubmitHashrateExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void ethSubmitHashrateExample() throws IOException {
        String hashRate ="0x5";
        String id  = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
        EthSubmitHashrate response = w3.ethSubmitHashrate(hashRate , id).send();
        response.getResult();
    }
    
}
