import org.web3j.protocol.kaia.core.method.response.KlayUninstallFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayUninstallFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayUninstallFilterExample() throws IOException {
        String filter = "0xd32fd16b6906e67f6e2b65dcf48fc272";
        KlayUninstallFilterResponse response = w3.klayUninstallFilter(filter).send();
        response.getResult();
    }
}
