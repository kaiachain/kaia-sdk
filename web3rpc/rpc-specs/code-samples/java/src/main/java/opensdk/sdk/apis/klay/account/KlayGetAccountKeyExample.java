import org.web3j.protocol.klaytn.core.method.response.KlayGetAccountKeyResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetAccountKeyExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void klayGetAccountKeyExample() throws IOException {
        String address = "0x3111a0577f322e8fb54f78d9982a26ae7ca0f722";
        String blockNumberOrHashOrTag = "latest";
        KlayGetAccountKeyResponse response = w3.klayGetAccountKey(address, blockNumberOrHashOrTag).send();
        response.getResult();
    }
}
