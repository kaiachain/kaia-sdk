
import org.web3j.protocol.klaytn.core.method.response.KaiaGetTransactionCountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetTransactionCountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetTransactionCountExample() throws IOException {
        KaiaGetTransactionCountResponse response = w3.kaiaGetTransactionCount(
                "0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"
        ).send();
        response.getResult();
    }

}
