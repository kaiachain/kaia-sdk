import org.web3j.protocol.klaytn.core.method.response.KaiaGetTransactionByBlockHashAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetTransactionByBlockHashAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetTransactionByBlockHashAndIndexExample() throws IOException {
        KaiaGetTransactionByBlockHashAndIndexResponse response = w3.kaiaGetTransactionByBlockHashAndIndex(
                "0x451cafae98d61b7458b5cef54402830941432278184453e3ca490eb687317e68",
                "0x0"
        ).send();
        response.getResult();
    }
}
