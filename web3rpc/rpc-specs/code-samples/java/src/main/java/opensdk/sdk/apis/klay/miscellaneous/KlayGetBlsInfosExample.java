import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayGetBlsInfosResponse;

import java.io.IOException;

public class KlayGetBlsInfosExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));

    void klayGetBlsInfos() throws IOException {
        String blockNumber = "latest";
        KlayGetBlsInfosResponse response = w3.klayGetBlsInfos(blockNumber).send();
        response.getResult();
    }
}
