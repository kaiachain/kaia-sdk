import org.web3j.protocol.kaia.core.method.response.AdminStateMigrationStatusResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStateMigrationStatusExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void adminStateMigrationStatusExample() throws IOException {
        AdminStateMigrationStatusResponse response = w3.adminStateMigrationStatus().send();
        response.getResult();
    }
}
