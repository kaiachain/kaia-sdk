import org.web3j.protocol.kaia.core.method.response.DebugSetBlockProfileRateResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugSetBlockProfileRateExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugSetBlockProfileRateExample() throws IOException {
        int rate = 3;

        DebugSetBlockProfileRateResponse response = w3.debugSetBlockProfileRate(rate).send();
        response.getResult();
    }
}
