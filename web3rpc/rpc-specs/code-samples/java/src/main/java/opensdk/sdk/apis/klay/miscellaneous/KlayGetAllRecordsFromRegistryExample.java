
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KlayGetAllRecordsFromRegistryResponse;

import java.io.IOException;

public class KlayGetAllRecordsFromRegistryExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));

    void klayGetAllRecordsFromRegistry() throws IOException {
        String blockNumber = "latest";
        KlayGetAllRecordsFromRegistryResponse response = w3.klayGetAllRecordsFromRegistry(blockNumber).send();
        response.getResult();
    }
}
