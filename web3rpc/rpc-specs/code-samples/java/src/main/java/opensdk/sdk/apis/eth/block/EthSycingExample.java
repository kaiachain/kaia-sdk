import org.web3j.protocol.core.methods.response.EthSyncing;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class EthSycingExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethSycingExample() throws IOException {
        EthSyncing response = w3.ethSyncing().send();
        response.getResult();
    }
}
