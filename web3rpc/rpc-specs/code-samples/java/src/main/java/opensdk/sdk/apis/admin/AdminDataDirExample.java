import org.web3j.protocol.kaia.core.method.response.AdminDatadirResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminDataDirExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminDataDirExample() throws IOException {
        AdminDatadirResponse response = w3.adminDatadir().send();
        response.getResult();
    }
}
