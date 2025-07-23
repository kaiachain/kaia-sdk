import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KaiaGetBlsInfosResponse;

import java.io.IOException;

public class KaiaGetBlsInfosExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));

    void kaiaGetBlsInfos() throws IOException {
        String blockNumber = "latest";
        KaiaGetBlsInfosResponse response = w3.kaiaGetBlsInfos(blockNumber).send();
        response.getResult();
    }
}
