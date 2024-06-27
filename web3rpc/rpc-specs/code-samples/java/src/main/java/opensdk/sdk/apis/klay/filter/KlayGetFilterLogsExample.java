import org.web3j.protocol.klaytn.core.method.response.KlayGetFilterLogsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetFilterLogsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetFilterLogsExample() throws IOException {
        String quantity = "0x16";

        KlayGetFilterLogsResponse response = w3.klayGetFilterLogs(quantity).send();
        response.getResult();
    }
}
