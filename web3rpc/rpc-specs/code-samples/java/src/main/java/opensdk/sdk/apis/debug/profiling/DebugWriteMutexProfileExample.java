import org.web3j.protocol.klaytn.core.method.response.DebugWriteMutexProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugWriteMutexProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugWriteMutexProfileExample() throws IOException {
        String file = "mutex.profile";

        DebugWriteMutexProfileResponse response = w3.debugWriteMutexProfile(file).send();
        response.getResult();
    }
}
