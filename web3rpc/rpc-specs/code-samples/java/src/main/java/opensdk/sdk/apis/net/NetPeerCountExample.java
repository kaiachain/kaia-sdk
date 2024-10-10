import org.web3j.protocol.core.methods.response.NetPeerCount;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class NetPeerCountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void netPeerCountExample() throws IOException {
        NetPeerCount response = w3.netPeerCount().send();
        response.getResult();

    }
}
