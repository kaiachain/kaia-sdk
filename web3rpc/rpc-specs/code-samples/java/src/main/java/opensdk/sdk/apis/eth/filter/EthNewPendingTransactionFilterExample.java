import org.web3j.protocol.core.methods.response.EthFilter;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class EthNewPendingTransactionFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethNewPendingTransactionFilterExample() throws IOException {
        EthFilter response = w3.ethNewPendingTransactionFilter().send();
        response.getResult();
    }
}
