import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthBlockNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void ethBlockNumberExample() throws IOException {
        EthBlockNumber br = w3.ethBlockNumber().send();
        br.getResult();
    }
}
