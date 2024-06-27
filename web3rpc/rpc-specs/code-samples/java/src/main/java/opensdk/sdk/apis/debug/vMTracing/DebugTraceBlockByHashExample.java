import org.web3j.protocol.klaytn.core.method.response.DebugTraceBlockByHashResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugTraceBlockByHashExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugTraceBlockByHashExample() throws IOException {
        String blockHash = "0xed110b330152df2022d40fa3c38987643034aa56fc96079fb6c67b66a6ed4f19";

        DebugTraceBlockByHashResponse response = w3.debugTraceBlockByHash(blockHash, null).send();
        response.getResult();
    }
}
