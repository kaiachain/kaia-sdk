import java.io.IOException;

import org.web3j.protocol.klaytn.core.method.response.KaiaSyncingResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

public class KaiaSyncingExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));  void kaiaSyncingExample() throws IOException {
    KaiaSyncingResponse response = w3.kaiaSyncing().send();
    response.getResult();
  }
}
