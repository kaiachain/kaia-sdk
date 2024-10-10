import org.web3j.protocol.kaia.core.method.response.KlayGetBlockWithConsensusInfoByNumberRangeResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import java.io.IOException;

public class KlayGetBlockWithConsensusInfoByNumberRangeExample {
    private Web3j w3 = new Web3j(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayGetBlockWithConsensusInfoByNumberRangeExample() throws IOException {
        Integer blockNumber = 1;
        Integer numberRange = 1;
        KlayGetBlockWithConsensusInfoByNumberRangeResponse response = w3
            .klayGetBlockWithConsensusInfoByNumberRange(
                blockNumber,
                numberRange)
            .send();
        response.getResult();
    }
}
