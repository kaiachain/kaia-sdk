import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.math.BigInteger;

public class EthGetBlockByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetBlockByNumberExample() throws IOException {
        EthBlock er = w3.ethGetBlockByNumber(
            DefaultBlockParameter.valueOf(new BigInteger("8f668", 16)),
            false)
        .send();
        er.getResult();
    }
}
