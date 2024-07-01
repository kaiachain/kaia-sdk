
import org.web3j.protocol.klaytn.core.method.response.KaiaGetBalanceResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetBalanceExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetBalanceExample() throws IOException {
        KaiaGetBalanceResponse gr = w3.kaiaGetBalance(
            "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
            "latest")
        .send();
        gr.getResult();
    }
}
