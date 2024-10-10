import org.web3j.protocol.kaia.core.method.response.DebugVerbosityByNameResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugVerbosityByNameExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugVerbosityByNameExample() throws IOException {
        String name = "API";
        int level = 3;

        DebugVerbosityByNameResponse response = w3.debugVerbosityByName(name, level).send();
        response.getResult();
    }
}
