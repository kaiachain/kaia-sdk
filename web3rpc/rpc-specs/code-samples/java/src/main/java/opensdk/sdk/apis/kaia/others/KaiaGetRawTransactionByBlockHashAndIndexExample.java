
import org.web3j.protocol.klaytn.core.method.response.KaiaGetRawTransactionByBlockHashAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetRawTransactionByBlockHashAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetRawTransactionByBlockHashAndIndexExample() throws IOException {
        String blockHash = "0x29b6cd965c7d9a53a6f068da259dce1d3810ba79fff8eebac5d4da14754e67e6";
        String index = "0x20965255";
        KaiaGetRawTransactionByBlockHashAndIndexResponse response = w3
                .kaiaGetRawTransactionByBlockHashAndIndex( blockHash , index)
                .send();
        response.getResult();

    }
}
