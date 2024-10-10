import org.web3j.protocol.core.methods.response.EthAccounts;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class EthAccountsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethAccountsExample() throws IOException {
        EthAccounts ar = w3.ethAccounts().send();
        ar.getResult();
    }
}
