import org.web3j.protocol.klaytn.core.method.response.PersonalSendValueTransferResponse;
import org.web3j.protocol.klaytn.core.method.response.TransactionObject;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class PersonalSendValueTransferExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalSendValueTransferExample() throws IOException, ExecutionException, InterruptedException {
        TransactionObject transactionObject = new TransactionObject();
        transactionObject.setFrom("0x1d4e05bb72677cb8fa576149c945b57d13f855e4");
        transactionObject.setTo("0xafa3f8684e54059998bc3a7b0d2b0da075154d66");
        transactionObject.setValue("0x1230000000");

        String passphrase = "helloWorld";

        PersonalSendValueTransferResponse response = w3.personalSendValueTransfer(transactionObject, passphrase).send();
        response.getResult();
    }

}
