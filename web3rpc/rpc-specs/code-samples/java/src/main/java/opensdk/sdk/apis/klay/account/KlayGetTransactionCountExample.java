import org.web3j.protocol.klaytn.core.method.response.KlayGetTransactionCountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetTransactionCountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetTransactionCountExample() throws IOException {
        KlayGetTransactionCountResponse response = w3.klayGetTransactionCount(
                "0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"
        ).send();
        response.getResult();
    }

}
