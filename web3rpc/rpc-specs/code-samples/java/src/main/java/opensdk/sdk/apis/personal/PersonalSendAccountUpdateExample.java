import org.web3j.protocol.klaytn.core.method.response.PersonalSendAccountUpdateResponse;
import org.web3j.protocol.klaytn.core.method.response.TransactionObject;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalSendAccountUpdateExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalSendAccountUpdateExample() throws IOException {
        TransactionObject transactionObject = new TransactionObject();
        transactionObject.setFrom("0x1d4e05bb72677cb8fa576149c945b57d13f855e4");
        transactionObject.setKey("0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8");

        String passphrase = "gr8=B!0@uc$b";

        PersonalSendAccountUpdateResponse response = w3.personalSendAccountUpdate(transactionObject, passphrase).send();
        response.getResult();
    }
}
