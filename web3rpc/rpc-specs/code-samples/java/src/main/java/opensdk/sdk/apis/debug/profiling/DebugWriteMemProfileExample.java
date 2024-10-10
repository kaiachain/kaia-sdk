import org.web3j.protocol.kaia.core.method.response.DebugWriteMemProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugWriteMemProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugWriteMemProfileExample() throws IOException {
        String file = "mem.profile";

        DebugWriteMemProfileResponse response = w3.debugWriteMemProfile(file).send();
        response.getResult();
    }
}
