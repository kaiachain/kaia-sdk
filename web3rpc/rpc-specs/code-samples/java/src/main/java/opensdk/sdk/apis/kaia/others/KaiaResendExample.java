import java.io.IOException;


import org.web3j.protocol.klaytn.core.method.response.KaiaResendResponse;
import org.web3j.protocol.klaytn.core.method.response.SendArgs;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

public class KaiaResendExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaResendExample() throws IOException {
        SendArgs oldTrx = new SendArgs();
        oldTrx.setFrom("0x65b47be3457ff26f2911cf89fd079cef0475a2e6");
        oldTrx.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        oldTrx.setValue("0x1");
        oldTrx.setGas("0x9999");
        oldTrx.setNonce("0xd3");
        oldTrx.setMaxPriorityFeePerGas("0x5d21dba00");
        oldTrx.setMaxFeePerGas("0x5d21dba00");
        String gasPrice = "0xba43b7500";
        String gasLimit = "0xe8d4a50fff";

        KaiaResendResponse response = w3.kaiaResend(oldTrx, gasPrice, gasLimit).send();
        response.getResult();
    }
}
