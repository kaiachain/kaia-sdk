import org.web3j.protocol.klaytn.core.method.response.KlayGetBlockWithConsensusInfoByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KlayGetBlockWithConsensusInfoByHashExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayGetBlockWithConsensusInfoByHashExample() throws IOException {
        KlayGetBlockWithConsensusInfoByHashResponse gr = w3.klayGetBlockWithConsensusInfoByHash(
                        "0xba647d41423faeebe8a7c64737d284fc2eba6f0388a3e1ebf6243db509ec1577")
                .send();
        gr.getResult();
    }
}
