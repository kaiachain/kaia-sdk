//import org.web3j.protocol.klaytn.core.method.response.PersonalSignTransactionResponse;
import org.web3j.protocol.klaytn.core.method.response.TransactionObject;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalSignTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalSignTransactionExample() throws IOException {
        TransactionObject transactionObject = new TransactionObject();
        transactionObject.setFrom("0x413ba0e5f6f00664598b5c80042b1308f4ff1408");
        transactionObject.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        transactionObject.setValue("0x1");
        transactionObject.setGas("0x9999");
        transactionObject.setNonce("0x1");
        transactionObject.setGasPrice("0x25000000000");

        String password = "helloWorld";

//        PersonalSignTransactionResponse response = w3.personalSignTransaction(transactionObject, password).send();
//        response.getResult();
    }
}
