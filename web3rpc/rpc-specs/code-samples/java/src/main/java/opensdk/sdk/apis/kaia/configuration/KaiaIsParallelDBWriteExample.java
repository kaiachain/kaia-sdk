
import org.web3j.protocol.klaytn.core.method.response.KaiaIsParallelDBWriteResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaIsParallelDBWriteExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaIsParallelDBWriteExample() throws IOException {
        KaiaIsParallelDBWriteResponse response = w3.kaiaIsParallelDBWrite().send();
        response.getResult();
    }
}
