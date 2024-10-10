import org.web3j.protocol.kaia.core.method.response.DebugVmoduleResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugVModuleExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugVModuleExample() throws IOException {
        String module = "p2p=4";

        DebugVmoduleResponse response = w3.debugVmodule(module).send();
        response.getResult();
    }
}
