import org.web3j.protocol.kaia.core.method.response.AdminStartWSResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStartWSExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminStartWSExample() throws IOException {
        String host = "127.0.0.1";
        int port = 8552;
        String cors = "";
        String apis = "klay";

        AdminStartWSResponse response = w3.adminStartWS(host, port, cors, apis).send();
        response.getResult();
    }
}
