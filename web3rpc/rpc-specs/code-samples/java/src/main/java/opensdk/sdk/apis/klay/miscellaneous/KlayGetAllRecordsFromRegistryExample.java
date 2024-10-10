import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayGetAllRecordsFromRegistryResponse;

import java.io.IOException;

public class KlayGetAllRecordsFromRegistryExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));

    void klayGetAllRecordsFromRegistry() throws IOException {
        String blockNumber = "latest";
        KlayGetAllRecordsFromRegistryResponse response = w3.klayGetAllRecordsFromRegistry(blockNumber).send();
        response.getResult();
    }
}
