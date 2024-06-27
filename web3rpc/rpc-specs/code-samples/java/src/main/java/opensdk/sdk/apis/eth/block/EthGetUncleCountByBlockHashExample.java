import org.web3j.protocol.core.methods.response.EthGetUncleCountByBlockHash;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthGetUncleCountByBlockHashExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetUncleCountByBlockHashExample() throws IOException {
        EthGetUncleCountByBlockHash response = w3.ethGetUncleCountByBlockHash(
            "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a"
        ).send();
        response.getResult();
    }
}
