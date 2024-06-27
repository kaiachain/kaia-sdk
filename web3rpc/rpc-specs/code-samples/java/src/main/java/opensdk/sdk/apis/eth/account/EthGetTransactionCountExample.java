import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthGetTransactionCountExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetTransactionCountExample() throws IOException {
        String address = "0xc94770007dda54cF92009BFF0dE90c06F603a09f";
        DefaultBlockParameter blockTag = DefaultBlockParameter.valueOf("latest");
        EthGetTransactionCount response = w3.ethGetTransactionCount(
            address,
            blockTag
        ).send();
        response.getResult();
    }
}
