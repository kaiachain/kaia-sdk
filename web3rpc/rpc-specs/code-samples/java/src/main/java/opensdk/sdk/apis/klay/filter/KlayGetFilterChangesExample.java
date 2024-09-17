import org.web3j.protocol.kaia.core.method.response.KlayGetFilterChangesResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetFilterChangesExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetFilterChangesExample() throws IOException {
        KlayGetFilterChangesResponse response = w3.klayGetFilterChanges("0x1aa7b9746d4192e90fb0acd89c514375").send();
        response.getResult();
    }
}
