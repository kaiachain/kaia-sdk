import org.web3j.protocol.klaytn.core.method.response.FilterOptions;
import org.web3j.protocol.klaytn.core.method.response.KaiaGetLogsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaGetLogsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaGetLogsExample() throws IOException {
        FilterOptions options = new FilterOptions();
        options.setFromBlock("latest");
        options.setToBlock("latest");
        options.setAddress("0x87ac99835e67168d4f9a40580f8f5c33550ba88b");
        KaiaGetLogsResponse response = w3.kaiaGetLogs(options).send();
        response.getResult();
    }

}
