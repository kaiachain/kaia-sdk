import java.util.List;

import org.web3j.protocol.kaia.core.method.response.FilterOptions;
import org.web3j.protocol.kaia.core.method.response.KlayNewFilterResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KlayNewFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));    void klayNewFilterExample() throws IOException {
        FilterOptions filterOptions = new FilterOptions();
        filterOptions.setFromBlock("latest");
        filterOptions.setToBlock("latest");
        filterOptions.setAddress("0x87ac99835e67168d4f9a40580f8f5c33550ba88b");
        filterOptions.setTopics(List.of("0xd596fdad182d29130ce218f4c1590c4b5ede105bee36690727baa6592bd2bfc8"));
        KlayNewFilterResponse response = w3.klayNewFilter(filterOptions).send();
        response.getResult();
    }

}
