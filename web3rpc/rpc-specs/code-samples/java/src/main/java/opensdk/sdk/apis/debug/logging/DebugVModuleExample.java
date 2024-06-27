import org.web3j.protocol.klaytn.core.method.response.DebugVmoduleResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugVModuleExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugVModuleExample() throws IOException {
        String module = "p2p=4";

        DebugVmoduleResponse response = w3.debugVmodule(module).send();
        response.getResult();
    }
}
