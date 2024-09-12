import org.web3j.protocol.kaia.core.method.response.DebugSetVMLogTargetResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class DebugSetVMLogTargetExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void debugSetVMLogTargetExample() throws IOException {
        int target = 3;

        DebugSetVMLogTargetResponse response = w3.debugSetVMLogTarget(target).send();
        response.getResult();
    }
}
