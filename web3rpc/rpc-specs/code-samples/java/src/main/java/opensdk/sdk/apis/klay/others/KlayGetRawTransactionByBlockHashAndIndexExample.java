import org.web3j.protocol.klaytn.core.method.response.KlayGetRawTransactionByBlockHashAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetRawTransactionByBlockHashAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayGetRawTransactionByBlockHashAndIndexExample() throws IOException {
        String blockHash = "0x29b6cd965c7d9a53a6f068da259dce1d3810ba79fff8eebac5d4da14754e67e6";
        String index = "0x20965255";
        KlayGetRawTransactionByBlockHashAndIndexResponse response = w3
                .klayGetRawTransactionByBlockHashAndIndex( blockHash , index)
                .send();
        response.getResult();

    }
}
