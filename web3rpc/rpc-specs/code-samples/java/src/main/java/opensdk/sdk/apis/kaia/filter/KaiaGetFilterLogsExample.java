
import org.web3j.protocol.klaytn.core.method.response.KaiaGetFilterLogsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetFilterLogsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetFilterLogsExample() throws IOException {
        String quantity = "0x16";

        KaiaGetFilterLogsResponse response = w3.kaiaGetFilterLogs(quantity).send();
        response.getResult();
    }
}
