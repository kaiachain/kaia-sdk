import org.web3j.protocol.klaytn.core.method.response.DebugSetGCPercentResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugSetGCPercentExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugSetGCPercentExample() throws IOException {
        int percent = 100;

        DebugSetGCPercentResponse response = w3.debugSetGCPercent(percent).send();
        response.getResult();
    }
}
