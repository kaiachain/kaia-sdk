
import org.web3j.protocol.klaytn.core.method.response.KaiaGetAccountKeyResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetAccountKeyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaGetAccountKeyExample() throws IOException {
        String address = "0x3111a0577f322e8fb54f78d9982a26ae7ca0f722";
        String blockNumberOrHashOrTag = "latest";
        KaiaGetAccountKeyResponse response = w3.kaiaGetAccountKey(address, blockNumberOrHashOrTag).send();
        response.getResult();
    }
}
