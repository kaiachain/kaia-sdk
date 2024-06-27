import org.web3j.protocol.klaytn.core.method.response.KaiaCallObject;
import org.web3j.protocol.klaytn.core.method.response.KaiaEstimateComputationCostResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaEstimateComputationCostExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaEstimateComputationCostExample() throws IOException {
        KaiaCallObject callObject = new KaiaCallObject();
        callObject.setFrom("0x73718c4980728857f3aa5148e9d1b471efa3a7dd");
        callObject.setTo("0x069942a3ca0dabf495dba872533134205764bc9c");
        callObject.setValue("0x0");
        callObject.setInput("0x2a31efc7000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000003039");
        callObject.setGas("0x9999");

        KaiaEstimateComputationCostResponse er = w3.kaiaEstimateComputationCost(
                        callObject,
                        "latest")
                .send();
        er.getResult();
    }
}
