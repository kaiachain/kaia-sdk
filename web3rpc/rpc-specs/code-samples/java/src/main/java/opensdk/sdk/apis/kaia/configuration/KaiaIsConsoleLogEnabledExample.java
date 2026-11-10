import org.web3j.protocol.kaia.core.method.response.KaiaIsConsoleLogEnabledResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaIsConsoleLogEnabledExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void kaiaIsConsoleLogEnabledExample() throws IOException {
        KaiaIsConsoleLogEnabledResponse response = w3.kaiaIsConsoleLogEnabled().send();
        response.getResult();
    }
}
