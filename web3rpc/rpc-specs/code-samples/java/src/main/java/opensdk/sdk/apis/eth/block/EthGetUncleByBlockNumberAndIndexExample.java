import org.web3j.protocol.core.methods.response.EthBlock;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthGetUncleByBlockNumberAndIndexExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethGetUncleByBlockNumberAndIndexExample() throws IOException {
        EthBlock response = w3.ethGetUncleByBlockHashAndIndex(
                        "0xc9dbfbab67e9a0508bcb3f95ae408023668cef431b805592781a821926715b8a",
                        BigInteger.valueOf(1))
                .send();
        response.getResult();
    }
}
