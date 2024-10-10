import org.web3j.protocol.kaia.core.method.response.KlayGetBlockWithConsensusInfoByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayGetBlockWithConsensusInfoByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetBlockWithConsensusInfoByNumberExample() throws IOException {
        KlayGetBlockWithConsensusInfoByNumberResponse gr = w3.klayGetBlockWithConsensusInfoByNumber(
            "0xe8")
        .send();
        gr.getResult();
    }
}
