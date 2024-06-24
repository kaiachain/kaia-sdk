
import org.web3j.protocol.klaytn.core.method.response.KaiaGetDecodedAnchoringTransactionByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetDecodedAnchoringTransactionByHashExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetDecodedAnchoringTransactionByHashExample() throws IOException {
        KaiaGetDecodedAnchoringTransactionByHashResponse gr = w3.kaiaGetDecodedAnchoringTransactionByHash(
            "0x026b64e16b86633c0199f78f37a64840d3601d83e5c799f115b63024764524ca")
        .send();
        gr.getResult();
    }
}
