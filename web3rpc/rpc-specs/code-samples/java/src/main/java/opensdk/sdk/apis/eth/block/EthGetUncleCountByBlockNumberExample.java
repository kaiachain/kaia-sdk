import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetUncleCountByBlockNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.math.BigInteger;

public class EthGetUncleCountByBlockNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetUncleCountByBlockNumberExample() throws IOException {
        EthGetUncleCountByBlockNumber response = w3.ethGetUncleCountByBlockNumber(
            DefaultBlockParameter.valueOf(new BigInteger("e8", 16))
        ).send();
        response.getResult();
    }
}
