//import org.web3j.protocol.klaytn.core.method.response.EthGetRawTransactionByBlockHashAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthGetRawTransactionByBlockHashAndIndexExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetRawTransactionByBlockHashAndIndexExample() throws IOException {
//        EthGetRawTransactionByBlockHashAndIndexResponse er = w3.ethGetRawTransactionByBlockHashAndIndex(
//            "0x4c4cbf242a80183d2ea2daf047c578d5fc89c0b14c4262606c8b6bb0b36715be",
//            "0x0")
//        .send();
//        er.getResult();
    }
}
