import org.web3j.protocol.kaia.core.method.response.KlayGetBlockReceiptsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthGetBlockReceiptsExampleGetBlockReceiptsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void EthGetBlockReceiptsExample() throws IOException {
        String blockHash = "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577";
        KlayGetBlockReceiptsResponse response = w3.ethGetBlockReceipts(blockHash).send();
        response.getResult();
    }

}
