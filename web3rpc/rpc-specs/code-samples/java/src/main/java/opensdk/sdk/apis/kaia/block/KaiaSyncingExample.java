import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.KaiaSyncingResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class KaiaSyncingExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));  void kaiaSyncingExample() throws IOException {
    KaiaSyncingResponse response = w3.kaiaSyncing().send();
    response.getResult();
  }
}
