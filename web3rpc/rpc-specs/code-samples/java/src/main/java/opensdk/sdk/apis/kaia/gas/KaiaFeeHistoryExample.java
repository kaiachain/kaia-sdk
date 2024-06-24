
import org.web3j.protocol.klaytn.core.method.response.KaiaFeeHistoryResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.util.List;

public class KaiaFeeHistoryExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaFeeHistoryExample() throws IOException {
        KaiaFeeHistoryResponse fr = w3.kaiaFeeHistory(
            "0x10",
            "latest",
            List.of(0.1, 0.2, 0.3))
        .send();
        fr.getResult();
    }
}
