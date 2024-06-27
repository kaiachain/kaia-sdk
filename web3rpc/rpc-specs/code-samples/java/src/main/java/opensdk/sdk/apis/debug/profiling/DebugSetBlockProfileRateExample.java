import org.web3j.protocol.klaytn.core.method.response.DebugSetBlockProfileRateResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugSetBlockProfileRateExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugSetBlockProfileRateExample() throws IOException {
        int rate = 3;

        DebugSetBlockProfileRateResponse response = w3.debugSetBlockProfileRate(rate).send();
        response.getResult();
    }
}
