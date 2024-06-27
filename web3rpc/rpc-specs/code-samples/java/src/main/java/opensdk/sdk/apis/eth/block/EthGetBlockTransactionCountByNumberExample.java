import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetBlockTransactionCountByNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.math.BigInteger;

public class EthGetBlockTransactionCountByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetBlockTransactionCountByNumberExample() throws IOException {
        EthGetBlockTransactionCountByNumber r = w3.ethGetBlockTransactionCountByNumber(
            DefaultBlockParameter.valueOf(BigInteger.valueOf(232))
        ).send();
        r.getResult();
    }
}
