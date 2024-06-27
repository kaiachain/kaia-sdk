import org.web3j.protocol.klaytn.core.method.response.KaiaGetCommitteeSizeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetCommitteeSizeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetCommitteeSizeExample() throws IOException {
        KaiaGetCommitteeSizeResponse gr = w3.kaiaGetCommitteeSize(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
