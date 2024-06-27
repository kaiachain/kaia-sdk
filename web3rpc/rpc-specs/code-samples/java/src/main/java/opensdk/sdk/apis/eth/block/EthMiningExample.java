import org.web3j.protocol.core.methods.response.EthMining;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthMiningExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethMiningExample() throws IOException {
        EthMining response = w3.ethMining().send();
        response.getResult();
    }
}
