import org.web3j.protocol.klaytn.core.method.response.DebugMutexProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugMutexProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugMutexProfileExample() throws IOException {
        String file = "mutex.profile";
        int seconds = 5;

        DebugMutexProfileResponse response = w3.debugMutexProfile(file, seconds).send();
        response.getResult();
    }
}
