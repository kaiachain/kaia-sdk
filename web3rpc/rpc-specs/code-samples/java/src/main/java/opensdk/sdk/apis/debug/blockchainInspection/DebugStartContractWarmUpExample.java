import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.DebugStartContractWarmUpResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class DebugStartContractWarmUpExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));  void debugStartContractWarmUpExample() throws IOException {
    String address = "0xfD1d63a152f7A7Ef14bd157C1c73c5bC3239EA5D";

    DebugStartContractWarmUpResponse response = w3.debugStartContractWarmUp(address).send();
    response.getResult();
  }
}
