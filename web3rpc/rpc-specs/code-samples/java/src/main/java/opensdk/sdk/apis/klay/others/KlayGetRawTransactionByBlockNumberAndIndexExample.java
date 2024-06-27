import org.web3j.protocol.klaytn.core.method.response.KlayGetRawTransactionByBlockNumberAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetRawTransactionByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayGetRawTransactionByBlockNumberAndIndexExample() throws IOException {
        String blockTag = "0x27";
        String index = "0x0";

        KlayGetRawTransactionByBlockNumberAndIndexResponse response = w3
                .klayGetRawTransactionByBlockNumberAndIndex(blockTag, index)
                .send();
        response.getResult();


    }
}
