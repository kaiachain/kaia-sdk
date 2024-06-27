import org.web3j.protocol.klaytn.core.method.response.KlayGetCouncilSizeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetCouncilSizeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetCouncilSizeExample() throws IOException {
        KlayGetCouncilSizeResponse gr = w3.klayGetCouncilSize(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
