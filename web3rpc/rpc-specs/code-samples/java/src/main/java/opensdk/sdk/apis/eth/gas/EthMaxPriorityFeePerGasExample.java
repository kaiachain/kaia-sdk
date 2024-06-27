import org.web3j.protocol.core.methods.response.EthMaxPriorityFeePerGas;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class EthMaxPriorityFeePerGasExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethMaxPriorityFeePerGasExample() throws IOException {
        EthMaxPriorityFeePerGas response = w3.ethMaxPriorityFeePerGas().send();
        response.getResult();
    }
}
