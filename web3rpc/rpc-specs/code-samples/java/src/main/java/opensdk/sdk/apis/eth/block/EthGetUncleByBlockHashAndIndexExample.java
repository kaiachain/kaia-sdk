import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;
import java.math.BigInteger;

public class EthGetUncleByBlockHashAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetUncleByBlockHashAndIndexExample() throws IOException {
        String blockHash = "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a";
        BigInteger uncleIndex = BigInteger.valueOf(1);
        EthBlock response = w3.ethGetUncleByBlockHashAndIndex(blockHash, uncleIndex).send();
        response.getResult();
    }
}
