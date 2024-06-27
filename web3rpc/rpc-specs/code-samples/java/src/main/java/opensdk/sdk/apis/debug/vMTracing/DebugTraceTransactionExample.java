import org.web3j.protocol.klaytn.core.method.response.DebugTraceTransactionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugTraceTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugTraceTransactionExample() throws IOException {
        String txHash = "0x21b2919b89278ca786226f10edbaadced7381dbd73df546a4823547aaebffa58";

        DebugTraceTransactionResponse response = w3.debugTraceTransaction(txHash, null).send();
        response.getResult();
    }
}
