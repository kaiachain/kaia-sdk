import org.web3j.protocol.kaia.core.method.response.KaiaSha3Response;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaSha3Example {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void kaiaSha3Example() throws IOException {
        String data = "0x11223344";
        KaiaSha3Response response = w3.kaiaSha3(data).send();
        response.getResult();
    }
}
