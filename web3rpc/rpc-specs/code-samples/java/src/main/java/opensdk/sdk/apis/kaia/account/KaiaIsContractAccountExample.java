import org.web3j.protocol.klaytn.core.method.response.KaiaIsContractAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaIsContractAccountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        KaiaIsContractAccountResponse response = w3.kaiaIsContractAccount(
                "0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"
        ).send();
        response.getResult();
    }
}
