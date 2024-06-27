import org.web3j.protocol.klaytn.core.method.response.DebugStorageRangeAtResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class DebugStorageRangeAtExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void debugStorageRangeAtExample() throws IOException {
        String blockHash = "0x90c81195698bc9f282bbdec386b0afb4dcc28e43aae834894281c3ecb3c88d21";
        int txIndex = 1;
        String contractAddress = "0x73a7d19d14f7dfac5b799e405e22133b2adc57a6";
        String keyStart = "0x12";
        int maxResult = 1;

        DebugStorageRangeAtResponse response = w3.debugStorageRangeAt(blockHash, txIndex, contractAddress, keyStart, maxResult).send();
        response.getResult();
    }
}
