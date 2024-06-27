import org.web3j.protocol.klaytn.core.method.response.KaiaGetBlockWithConsensusInfoByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetBlockWithConsensusInfoByNumberExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetBlockWithConsensusInfoByNumberExample() throws IOException {
        KaiaGetBlockWithConsensusInfoByNumberResponse gr = w3.kaiaGetBlockWithConsensusInfoByNumber(
            "0xe8")
        .send();
        gr.getResult();
    }
}
