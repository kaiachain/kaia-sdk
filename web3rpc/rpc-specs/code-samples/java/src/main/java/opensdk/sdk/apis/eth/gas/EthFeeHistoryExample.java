import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthFeeHistory;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.util.List;

public class EthFeeHistoryExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethFeeHistoryExample() throws IOException {
        EthFeeHistory br = w3.ethFeeHistory(
            16,
            DefaultBlockParameter.valueOf("latest"),
            List.of(0.1, 0.2, 0.3))
        .send();
        br.getResult();
    }
}
