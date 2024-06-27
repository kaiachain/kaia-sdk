import org.web3j.protocol.klaytn.core.method.response.DebugGetModifiedAccountsByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugGetModifiedAccountsByHashExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugGetModifiedAccountsByHashExample() throws IOException {
        String startBlockHash = "0xcc1ac1e244f9f83b812b5d77ada1c399f02ea7b61e72ff31789d9ef6dad45442";
        String endBlockHash = "0x437e92b2d30a0a828dfdd23b837a8ddf8c8b79c222e191d16c47afbf5a6aaed7";

        DebugGetModifiedAccountsByHashResponse response = w3.debugGetModifiedAccountsByHash(startBlockHash, endBlockHash).send();
        response.getResult();
    }
}
