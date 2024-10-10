import org.web3j.protocol.kaia.core.method.response.KaiaClientVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaClientVersionExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaClientVersionExample() throws IOException {
        KaiaClientVersionResponse cr = w3.kaiaClientVersion().send();
        cr.getResult();
    }
}
