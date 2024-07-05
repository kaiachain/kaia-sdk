import org.web3j.protocol.kaia.core.method.response.AdminStartStateMigrationResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminStartStateMigrationExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminStartStateMigrationExample() throws IOException {
        AdminStartStateMigrationResponse response = w3.adminStartStateMigration().send();
        response.getResult();
    }
}
