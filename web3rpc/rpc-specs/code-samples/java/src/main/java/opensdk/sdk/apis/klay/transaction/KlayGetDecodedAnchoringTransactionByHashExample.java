import org.web3j.protocol.kaia.core.method.response.KlayGetDecodedAnchoringTransactionByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetDecodedAnchoringTransactionByHashExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetDecodedAnchoringTransactionByHashExample() throws IOException {
        KlayGetDecodedAnchoringTransactionByHashResponse gr = w3.klayGetDecodedAnchoringTransactionByHash(
            "0x026b64e16b86633c0199f78f37a64840d3601d83e5c799f115b63024764524ca")
        .send();
        gr.getResult();
    }
}
