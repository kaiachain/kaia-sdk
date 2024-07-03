import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.PersonalDeriveAccountResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class PersonalDeriveAccountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));  void personalDeriveAccountExample() throws IOException {
    String url = "url";
    String path = "path";
    boolean pin =true;
    PersonalDeriveAccountResponse response = w3.personalDeriveAccount(url, path, pin).send();
    response.getResult();
  }
}
