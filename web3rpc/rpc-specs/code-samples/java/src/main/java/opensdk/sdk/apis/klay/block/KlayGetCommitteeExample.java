import org.web3j.protocol.klaytn.core.method.response.KlayGetCommitteeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetCommitteeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetCommitteeExample() throws IOException {
        KlayGetCommitteeResponse gr = w3.klayGetCommittee(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
