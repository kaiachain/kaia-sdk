import org.web3j.protocol.klaytn.core.method.response.DebugSetVMLogTargetResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugSetVMLogTargetExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugSetVMLogTargetExample() throws IOException {
        int target = 3;

        DebugSetVMLogTargetResponse response = w3.debugSetVMLogTarget(target).send();
        response.getResult();
    }
}
