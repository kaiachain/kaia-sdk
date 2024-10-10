import org.web3j.protocol.kaia.core.method.response.KaiaUninstallFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaUninstallFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaUninstallFilterExample() throws IOException {
        String filter = "0xd32fd16b6906e67f6e2b65dcf48fc272";
        KaiaUninstallFilterResponse response = w3.kaiaUninstallFilter(filter).send();
        response.getResult();
    }
}
