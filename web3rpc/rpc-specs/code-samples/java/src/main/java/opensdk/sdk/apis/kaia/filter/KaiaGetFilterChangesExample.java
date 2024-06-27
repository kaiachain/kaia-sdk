import org.web3j.protocol.klaytn.core.method.response.KaiaGetFilterChangesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetFilterChangesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetFilterChangesExample() throws IOException {
        KaiaGetFilterChangesResponse response = w3.kaiaGetFilterChanges("0x1aa7b9746d4192e90fb0acd89c514375").send();
        response.getResult();
    }
}
