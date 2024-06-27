import org.web3j.protocol.klaytn.core.method.response.DebugSetMutexProfileFractionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugSetMutexProfileFractionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugSetMutexProfileFractionExample() throws IOException {
        int rate = 2;

        DebugSetMutexProfileFractionResponse response = w3.debugSetMutexProfileFraction(rate).send();
        response.getResult();
    }
}
