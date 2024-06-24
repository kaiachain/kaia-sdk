
import org.web3j.protocol.klaytn.core.method.response.KaiaClientVersionResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaClientVersionExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaClientVersionExample() throws IOException {
        KaiaClientVersionResponse cr = w3.kaiaClientVersion().send();
        cr.getResult();
    }
}
