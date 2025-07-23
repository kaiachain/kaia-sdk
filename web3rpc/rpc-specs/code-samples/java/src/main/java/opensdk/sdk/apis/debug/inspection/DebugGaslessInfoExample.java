import org.web3j.protocol.kaia.core.method.response.DebugGaslessInfoResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugGaslessInfoExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugGaslessInfoExample() throws IOException {
        DebugGaslessInfoResponse ar = w3.debugGaslessInfo().send();
        ar.getResult();
    }
}
