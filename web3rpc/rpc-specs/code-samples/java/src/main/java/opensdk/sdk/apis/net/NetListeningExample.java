import org.web3j.protocol.core.methods.response.NetListening;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class NetListeningExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void netListeningExample() throws IOException {
        NetListening response = w3.netListening().send();
        response.getResult();
    }
    
}
