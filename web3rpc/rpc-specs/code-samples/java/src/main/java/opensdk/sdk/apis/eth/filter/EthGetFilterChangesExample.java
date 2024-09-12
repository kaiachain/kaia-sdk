import java.io.IOException;
import java.math.BigInteger;


import org.web3j.protocol.core.methods.response.EthLog;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class EthGetFilterChangesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void ethGetFilterChangesExample() throws IOException {
        EthLog response = w3.ethGetFilterChanges(BigInteger.valueOf(10)).send();
        response.getResult();
    }
}
