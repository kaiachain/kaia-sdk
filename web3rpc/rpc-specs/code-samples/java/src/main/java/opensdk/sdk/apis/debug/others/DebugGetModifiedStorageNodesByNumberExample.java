import java.io.IOException;

import org.web3j.protocol.kaia.core.method.response.DebugGetModifiedStorageNodesByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class DebugGetModifiedStorageNodesByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));  void debugGetModifiedStorageNodesByNumberExample() throws IOException {
    String address = "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6";
    Integer startBlockNum = 100;
    Integer endBlockNum = 200;
    DebugGetModifiedStorageNodesByNumberResponse response = w3.debugGetModifiedStorageNodesByNumber(
        address, startBlockNum, endBlockNum).send();
    response.getResult();
  }

}
