import org.web3j.protocol.core.methods.response.EthMaxPriorityFeePerGas;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class EthMaxPriorityFeePerGasExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
    void ethMaxPriorityFeePerGasExample() throws IOException {
        EthMaxPriorityFeePerGas response = w3.ethMaxPriorityFeePerGas().send();
        response.getResult();
    }
}
