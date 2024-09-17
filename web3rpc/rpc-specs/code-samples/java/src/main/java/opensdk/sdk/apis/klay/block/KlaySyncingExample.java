import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.KlaySyncingResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class KlaySyncingExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));  void klaySyncingExample() throws IOException {
    KlaySyncingResponse response = w3.klaySyncing().send();
    response.getResult();
  }
}
