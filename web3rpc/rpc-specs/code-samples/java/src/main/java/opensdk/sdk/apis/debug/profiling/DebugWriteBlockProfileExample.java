import org.web3j.protocol.kaia.core.method.response.DebugWriteBlockProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugWriteBlockProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugWriteBlockProfileExample() throws IOException {
        String file = "block.profile";

        DebugWriteBlockProfileResponse response = w3.debugWriteBlockProfile(file).send();
        response.getResult();
    }
}
