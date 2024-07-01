import java.util.List;

import org.web3j.protocol.klaytn.core.method.response.FilterOptions;
import org.web3j.protocol.klaytn.core.method.response.KaiaNewFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaNewFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaNewFilterExample() throws IOException {
        FilterOptions filterOptions = new FilterOptions();
        filterOptions.setFromBlock("latest");
        filterOptions.setToBlock("latest");
        filterOptions.setAddress("0x87ac99835e67168d4f9a40580f8f5c33550ba88b");
        filterOptions.setTopics(List.of("0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"));
        KaiaNewFilterResponse response = w3.kaiaNewFilter(filterOptions).send();
        response.getResult();
    }

}
