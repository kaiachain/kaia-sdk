
import org.web3j.protocol.klaytn.core.method.response.KaiaGetTransactionByBlockNumberAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetTransactionByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetTransactionByBlockNumberAndIndexExample() throws IOException {
        KaiaGetTransactionByBlockNumberAndIndexResponse response = w3.kaiaGetTransactionByBlockNumberAndIndex(
                "0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
                "0x0"
        ).send();
        response.getResult();
    }
}
