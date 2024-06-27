//import org.web3j.protocol.klaytn.core.method.response.EthGetRawTransactionByBlockNumberAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthGetRawTransactionByBlockNumberAndIndexExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetRawTransactionByBlockNumberAndIndexExample() throws IOException {
//        EthGetRawTransactionByBlockNumberAndIndexResponse er = w3.ethGetRawTransactionByBlockNumberAndIndex(
//            118593751,
//            "0x0")
//        .send();
//        er.getResult();
    }
}
