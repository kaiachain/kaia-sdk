import org.web3j.protocol.core.methods.response.EthSign;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class EthSignExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethSignExample() throws IOException, ExecutionException, InterruptedException {
        String address = "0x413ba0e5f6f00664598b5c80042b1308f4ff1408";
        EthSign response = w3.ethSign(address, "0xdeadbeaf").send();
        response.getResult();
    }
    
}
