import java.io.IOException;
import java.math.BigInteger;

//import org.web3j.protocol.kaia.core.method.response.EthResendResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;

public class EthResendExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
  void ethResendExample() throws IOException {
    String gasPrice = "0xba43b7500";
    String gasLimit = "0xe8d4a50fff";
    Transaction sendArgs = new Transaction(
      "0x65b47be3457ff26f2911cf89fd079cef0475a2e6",
      new BigInteger("d" , 16),
      null ,
      new BigInteger("9999" , 16),
      "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
      new BigInteger("1",16),
      null , 
      null ,
      new BigInteger("5d21dba00" , 16),
      new BigInteger("5d21dba00" , 16));
//    EthResendResponse response = w3.ethResend(sendArgs, gasPrice, gasLimit).send();
//    response.getResult();
  }
}
