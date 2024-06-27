import org.web3j.protocol.klaytn.core.method.response.KlayGetStorageAtResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetStorageAtExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetStorageAtExample() throws IOException {
        KlayGetStorageAtResponse gr = w3.klayGetStorageAt(
            "0x295a70b2de5e3953354a6a8344e616ed314d7251",
            "0x0",
            "latest")
        .send();
        gr.getResult();
    }
}
