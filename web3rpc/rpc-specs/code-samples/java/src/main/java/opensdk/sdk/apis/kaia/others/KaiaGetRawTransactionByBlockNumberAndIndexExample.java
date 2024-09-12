import org.web3j.protocol.kaia.core.method.response.KaiaGetRawTransactionByBlockNumberAndIndexResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetRawTransactionByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaGetRawTransactionByBlockNumberAndIndexExample() throws IOException {
        String blockTag = "0x27";
        String index = "0x0";

        KaiaGetRawTransactionByBlockNumberAndIndexResponse response = w3
                .kaiaGetRawTransactionByBlockNumberAndIndex(blockTag, index)
                .send();
        response.getResult();


    }
}
