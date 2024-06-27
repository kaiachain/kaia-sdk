import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetStorageAt;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.math.BigInteger;

public class EthGetStorageAtExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethGetStorageAtExample() throws IOException {
        String address = "0x295a70b2de5e3953354a6a8344e616ed314d7251";
        BigInteger position = BigInteger.valueOf(0);
        DefaultBlockParameter block = DefaultBlockParameter.valueOf("latest");
        EthGetStorageAt br = w3.ethGetStorageAt(address,position,block).send();
        br.getResult();
    }
}
