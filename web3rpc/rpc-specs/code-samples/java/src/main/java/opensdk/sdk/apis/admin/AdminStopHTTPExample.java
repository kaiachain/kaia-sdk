import org.web3j.protocol.kaia.core.method.response.AdminStopHTTPResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStopHTTPExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminStopHttpExample() throws IOException {
        AdminStopHTTPResponse response = w3.adminStopHTTP().send();
        response.getResult();
    }
}
