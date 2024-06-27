import org.web3j.protocol.core.methods.response.EthTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthGetTransactionByBlockHashAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetTransactionByBlockHashAndIndexExample() throws IOException {
        EthTransaction response = w3.ethGetTransactionByBlockHashAndIndex(
                        "0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
                        BigInteger.valueOf(0))
                .send();
        response.getResult();
    }
}
