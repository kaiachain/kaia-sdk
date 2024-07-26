import org.web3j.protocol.kaia.core.method.response.AdminImportChainResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class AdminImportChainExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void adminImportChainExample() throws IOException {
        String fileName = "/tmp/chain.txt";

        AdminImportChainResponse response = w3.adminImportChain(fileName).send();
        response.getResult();
    }
}
