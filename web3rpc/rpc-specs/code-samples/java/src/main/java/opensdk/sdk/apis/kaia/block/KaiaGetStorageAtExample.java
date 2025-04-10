import org.web3j.protocol.kaia.core.method.response.KaiaGetStorageAtResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaGetStorageAtExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaGetStorageAtExample() throws IOException {
        KaiaGetStorageAtResponse gr = w3.kaiaGetStorageAt(
            "0x295a70b2de5e3953354a6a8344e616ed314d7251",
            "0x0",
            "latest")
        .send();
        gr.getResult();
    }
}
