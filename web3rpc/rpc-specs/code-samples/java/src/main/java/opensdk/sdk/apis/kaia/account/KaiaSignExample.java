import org.web3j.protocol.klaytn.core.method.response.KaiaSignResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;


public class KaiaSignExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaSignExample() throws IOException {
        String address = "0x487f2dfef230c2120b8cc55c5087b103146536ec";
        String message = "0xdeadbeaf";
        KaiaSignResponse response = w3.kaiaSign(address, message).send();
        response.getResult();
    }
}
