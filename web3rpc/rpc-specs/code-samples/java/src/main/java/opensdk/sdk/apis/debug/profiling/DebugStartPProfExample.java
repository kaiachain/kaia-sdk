import org.web3j.protocol.kaia.core.method.response.DebugStartPProfResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugStartPProfExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugStartPProfExample() throws IOException {
        String address = "localhost";
        int port = 6000;
        DebugStartPProfResponse response = w3.debugStartPProf(address, port).send();
        response.getResult();
    }
}
