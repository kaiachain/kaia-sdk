import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthBlockNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void ethBlockNumberExample() throws IOException {
        EthBlockNumber br = w3.ethBlockNumber().send();
        br.getResult();
    }
}
