import org.web3j.protocol.kaia.core.method.response.KlayGetCommitteeSizeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetCommitteeSizeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetCommitteeSizeExample() throws IOException {
        KlayGetCommitteeSizeResponse gr = w3.klayGetCommitteeSize(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
