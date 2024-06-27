//import org.web3j.protocol.klaytn.core.method.response.EthSignTransactionResponse;
//import org.web3j.protocol.klaytn.core.method.response.TransactionArgs;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class EthSignTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethSignTransactionExample() throws IOException {
//        TransactionArgs tx = new TransactionArgs();
//        tx.setFrom("0x487f2dfef230c2120b8cc55c5087b103146536ec");
//        tx.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
//        tx.setValue("0x1");
//        tx.setGas("0x9999");
//        tx.setMaxFeePerGas("0x5d21dba00");
//        tx.setMaxPriorityFeePerGas("0x5d21dba00");
//        tx.setNonce("0x1");
//        EthSignTransactionResponse transactionResponse = w3.ethSignTransaction(tx).send();
//        transactionResponse.getResult();
    }
}
