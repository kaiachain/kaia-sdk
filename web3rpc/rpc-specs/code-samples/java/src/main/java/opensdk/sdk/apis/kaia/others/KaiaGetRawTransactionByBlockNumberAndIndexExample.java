import org.web3j.protocol.klaytn.core.method.response.KaiaGetRawTransactionByBlockNumberAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetRawTransactionByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetRawTransactionByBlockNumberAndIndexExample() throws IOException {
        String blockTag = "0x27";
        String index = "0x0";

        KaiaGetRawTransactionByBlockNumberAndIndexResponse response = w3
                .kaiaGetRawTransactionByBlockNumberAndIndex(blockTag, index)
                .send();
        response.getResult();


    }
}
