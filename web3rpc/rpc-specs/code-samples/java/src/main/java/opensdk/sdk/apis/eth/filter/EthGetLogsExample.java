import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.EthLog;

import java.io.IOException;

public class EthGetLogsExample {
      private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    
      void ethGetLogsExample() throws IOException {
        EthFilter filterOption = new EthFilter(
            DefaultBlockParameter.valueOf("latest"),
            DefaultBlockParameter.valueOf("latest"),
            "0x87ac99835e67168d4f9a40580f8f5c33550ba88b");
        EthLog response = w3.ethGetLogs(filterOption).send();
        response.getResult();
    }
}
