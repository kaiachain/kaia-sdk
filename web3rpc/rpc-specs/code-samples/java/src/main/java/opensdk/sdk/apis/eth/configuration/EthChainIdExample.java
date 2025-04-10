import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class EthChainIdExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethChainIdExample() throws IOException {
        EthChainId br = w3.ethChainId().send();
        br.getResult();
    }
}
