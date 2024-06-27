//import org.web3j.protocol.klaytn.core.method.response.EthGetHeaderByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthGetHeaderByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetHeaderByNumberExample() throws IOException {
//        EthGetHeaderByNumberResponse br = w3.ethGetHeaderByNumber("0x1b4").send();
//        br.getResult();
    }
}
