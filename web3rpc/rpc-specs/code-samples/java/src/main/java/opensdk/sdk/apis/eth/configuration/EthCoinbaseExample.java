import org.web3j.protocol.core.methods.response.EthCoinbase;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class EthCoinbaseExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethCoinbaseExample() throws IOException {
        EthCoinbase br = w3.ethCoinbase().send();
        br.getResult();
    }
}
