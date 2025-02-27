import org.web3j.protocol.kaia.core.method.response.DebugBlockProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugBlockProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugBlockProfileExample() throws IOException {
        String file = "block.profile";
        int seconds = 4;

        DebugBlockProfileResponse response = w3.debugBlockProfile(file, seconds).send();
        response.getResult();
    }
}
