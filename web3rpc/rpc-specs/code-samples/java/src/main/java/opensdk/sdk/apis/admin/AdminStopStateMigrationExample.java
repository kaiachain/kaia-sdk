import org.web3j.protocol.kaia.core.method.response.AdminStopStateMigrationResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStopStateMigrationExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminStopStateMigrationExample() throws IOException {
        AdminStopStateMigrationResponse response = w3.adminStopStateMigration().send();
        response.getResult();
    }
}
