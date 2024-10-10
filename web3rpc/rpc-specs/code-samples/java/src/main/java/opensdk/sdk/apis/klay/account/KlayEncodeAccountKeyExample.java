import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.kaia.core.method.response.KlayEncodeAccountKeyResponse;

import java.io.IOException;

public class KlayEncodeAccountKeyExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void klayEncodeAccountKeyExample() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode node = objectMapper.createObjectNode();
        node.put("keyType", 0);
        node.putNull("key");

        KlayEncodeAccountKeyResponse response = w3.klayEncodeAccountKey(node).send();

        response.getResult();
    }
}
