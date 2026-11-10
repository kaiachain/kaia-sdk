import org.web3j.protocol.kaia.core.method.response.KlayIsConsoleLogEnabledResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayIsConsoleLogEnabledExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void klayIsConsoleLogEnabledExample() throws IOException {
        KlayIsConsoleLogEnabledResponse response = w3.klayIsConsoleLogEnabled().send();
        response.getResult();
    }
}
