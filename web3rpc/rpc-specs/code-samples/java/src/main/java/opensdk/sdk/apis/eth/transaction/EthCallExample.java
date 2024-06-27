import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;

import java.io.IOException;

public class EthCallExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethCallExample() throws IOException {
        EthCall cr = w3.ethCall(
                        Transaction.createEthCallTransaction(
                                "0xca7a99380131e6c76cfa622396347107aeedca2d",
                                "0xbE3892d33620bE5aca8c75D39e7401871194d290",
                                "0x2e64cec1"),
                        DefaultBlockParameter.valueOf("latest"))
                .send();
        cr.getResult();
    }
}
