package opensdk.sdk.apis.eth.configuration;

import java.io.IOException;

import org.web3j.protocol.core.methods.response.EthProtocolVersion;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

public class EthProtocolVersionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));  
    void ethProtocolVersionExample() throws IOException {
    EthProtocolVersion response = w3.ethProtocolVersion().send();
    response.getResult();
  }
}
