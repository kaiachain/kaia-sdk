//import org.web3j.protocol.klaytn.core.method.response.EthGetHeaderByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthGetHeaderByHashExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetHeaderByHashExample() throws IOException {
//        EthGetHeaderByHashResponse br = w3.ethGetHeaderByHash(
//            "0x21509a5aa2c03e9c99e3320cc7805c601b370c6a4529b29000fd8e2360d8c659")
//        .send();
//        br.getResult();
    }
}
