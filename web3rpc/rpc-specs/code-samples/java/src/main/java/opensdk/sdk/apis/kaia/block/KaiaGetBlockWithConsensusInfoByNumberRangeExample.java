import org.web3j.protocol.klaytn.core.method.response.KaiaGetBlockWithConsensusInfoByNumberRangeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class KaiaGetBlockWithConsensusInfoByNumberRangeExample {
    private Web3j w3 = new Web3j(new HttpService("https://api.baobab.klaytn.net:8651"));
    void kaiaGetBlockWithConsensusInfoByNumberRangeExample() throws IOException {
        Integer blockNumber = 1;
        Integer numberRange = 1;
        KaiaGetBlockWithConsensusInfoByNumberRangeResponse response = w3
            .kaiaGetBlockWithConsensusInfoByNumberRange(
                blockNumber,
                numberRange)
            .send();
        response.getResult();
    }
}
