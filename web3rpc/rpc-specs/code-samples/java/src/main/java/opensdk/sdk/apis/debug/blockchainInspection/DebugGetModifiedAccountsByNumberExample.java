import org.web3j.protocol.klaytn.core.method.response.DebugGetModifiedAccountsByNumberResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugGetModifiedAccountsByNumberExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugGetModifiedAccountsByNumberExample() throws IOException {
        int startBlockNum = 171904;
        int endBlockNum = 172160;
        DebugGetModifiedAccountsByNumberResponse response = w3.debugGetModifiedAccountsByNumber(startBlockNum, endBlockNum).send();
        response.getResult();
    }
}
