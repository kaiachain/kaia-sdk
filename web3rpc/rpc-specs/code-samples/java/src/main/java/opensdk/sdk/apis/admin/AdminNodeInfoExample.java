import org.web3j.protocol.core.methods.response.admin.AdminNodeInfo;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminNodeInfoExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminNodeInfoExample() throws IOException {
        AdminNodeInfo response = w3.adminNodeInfo().send();
        response.getResult();
    }
}
