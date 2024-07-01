import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KaiaEncodeAccountKeyResponse;

import java.io.IOException;

public class KaiaEncodeAccountKeyExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaEncodeAccountKeyExample() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("keyType", 0);
        node.putNull("key");

        KaiaEncodeAccountKeyResponse response = w3.kaiaEncodeAccountKey(node).send();

        response.getResult();
    }
}
