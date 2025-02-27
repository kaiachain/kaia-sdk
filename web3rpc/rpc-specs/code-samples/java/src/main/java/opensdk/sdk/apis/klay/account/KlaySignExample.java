import org.web3j.protocol.kaia.core.method.response.KlaySignResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;


public class KlaySignExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klaySignExample() throws IOException {
        String address = "0x487f2dfef230c2120b8cc55c5087b103146536ec";
        String message = "0xdeadbeaf";
        KlaySignResponse response = w3.klaySign(address, message).send();
        response.getResult();
    }
}
