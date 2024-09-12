import org.web3j.protocol.kaia.core.method.response.DebugVerbosityResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugVerbosityExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugVerbosityExample() throws IOException {
        int level = 3;

        DebugVerbosityResponse response = w3.debugVerbosity(level).send();
        response.getResult();
    }
}
