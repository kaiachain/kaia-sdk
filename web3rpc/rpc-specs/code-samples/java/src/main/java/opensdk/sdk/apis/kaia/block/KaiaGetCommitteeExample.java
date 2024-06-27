import org.web3j.protocol.klaytn.core.method.response.KaiaGetCommitteeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetCommitteeExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetCommitteeExample() throws IOException {
        KaiaGetCommitteeResponse gr = w3.kaiaGetCommittee(
            "0x1b4")
        .send();
        gr.getResult();
    }
}
