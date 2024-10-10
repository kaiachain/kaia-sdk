import org.web3j.protocol.core.methods.response.EthLog;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthGetFilterLogsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void ethGetFilterLogsExample() throws IOException {
        EthLog response = w3.ethGetFilterLogs(BigInteger.valueOf(10)).send();
        response.getResult();
    }
}
