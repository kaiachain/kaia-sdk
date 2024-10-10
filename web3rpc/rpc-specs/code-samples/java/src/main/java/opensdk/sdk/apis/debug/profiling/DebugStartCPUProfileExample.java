import org.web3j.protocol.kaia.core.method.response.DebugStartCPUProfileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStartCPUProfileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStartCPUProfileExample() throws IOException {
        String file = "cpu.profile";

        DebugStartCPUProfileResponse response = w3.debugStartCPUProfile(file).send();
        response.getResult();
    }
}
