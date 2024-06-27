import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KaiaRecoverFromMessageResponse;

import java.io.IOException;

public class KaiaRecoverFromMessageExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaRecoverFromMessage() throws IOException {
        String address = "0xA2a8854b1802D8Cd5De631E690817c253d6a9153";
        String message = "0xdeadbeef";
        String signature = "0x1e6338d6e4a8d688a25de78cf2a92efec9a92e52eb8425acaaee8c3957e68cdb3f91bdc483f0ed05a0da26eca3be4c566d087d90dc2ca293be23b2a9de0bcafc1c";
        String blockNumber = "latest";
        KaiaRecoverFromMessageResponse response = w3.kaiaRecoverFromMessage(address, message, signature, blockNumber).send();
        response.getResult();
    }
}
