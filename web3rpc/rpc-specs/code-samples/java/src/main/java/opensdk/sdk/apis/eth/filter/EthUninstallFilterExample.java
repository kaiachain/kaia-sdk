import org.web3j.protocol.core.methods.response.EthUninstallFilter;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthUninstallFilterExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void ethUninstallFilterExample() throws IOException {
        EthUninstallFilter response = w3.ethUninstallFilter(
            BigInteger.valueOf(11))
        .send();
        response.getResult();
    }
}
