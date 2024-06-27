import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthGetBalanceExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetBalanceExample() throws IOException {
        EthGetBalance br = w3.ethGetBalance(
                        "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
                        DefaultBlockParameter.valueOf("latest"))
                .send();
        br.getResult();
    }
}
