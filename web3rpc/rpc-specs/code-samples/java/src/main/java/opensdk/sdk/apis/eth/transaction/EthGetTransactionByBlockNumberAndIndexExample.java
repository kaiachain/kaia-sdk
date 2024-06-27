import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthGetTransactionByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void ethGetTransactionByBlockNumberAndIndexExample() throws IOException {
        EthTransaction response = w3
            .ethGetTransactionByBlockNumberAndIndex(
                DefaultBlockParameter.valueOf(new BigInteger("27", 16)), 
                new BigInteger("0", 16))
            .send();
        response.getResult();
    }
}
