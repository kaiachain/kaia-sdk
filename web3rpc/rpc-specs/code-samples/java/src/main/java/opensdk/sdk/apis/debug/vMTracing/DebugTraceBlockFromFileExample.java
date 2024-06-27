import org.web3j.protocol.klaytn.core.method.response.DebugTraceBlockFromFileResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugTraceBlockFromFileExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void whenRequestValid_ThenCall200ResponseReturns() throws IOException {
        String fileName = "/home/sotatek/block.rlp";

        DebugTraceBlockFromFileResponse response = w3.debugTraceBlockFromFile(fileName, null).send();
        response.getResult();
    }
}
