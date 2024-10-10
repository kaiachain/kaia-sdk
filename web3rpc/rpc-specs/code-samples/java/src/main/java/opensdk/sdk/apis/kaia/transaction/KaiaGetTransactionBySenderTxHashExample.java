import org.web3j.protocol.kaia.core.method.response.KaiaGetTransactionBySenderTxHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetTransactionBySenderTxHashExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaGetTransactionBySenderTxHashExample() throws IOException {
        KaiaGetTransactionBySenderTxHashResponse response = w3.kaiaGetTransactionBySenderTxHash(
                "0x21b2919b89278ca786226f10edbaadced7381dbd73df546a4823547aaebffa58"
        ).send();
        response.getResult();
    }
}
