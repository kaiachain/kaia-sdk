import org.web3j.protocol.core.methods.response.EthSubmitWork;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthSubmitWorkExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethSubmitWorkExample() throws IOException {
        EthSubmitWork response = w3.ethSubmitWork(
            "0x0000000000000001", 
            "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", 
            "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef")
        .send();
        response.getResult();
    }
}
