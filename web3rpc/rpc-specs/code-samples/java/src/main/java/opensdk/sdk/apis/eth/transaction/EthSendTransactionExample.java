import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;
import java.math.BigInteger;

public class EthSendTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void ethSendTransactionExample() throws IOException {
        // TransactionArgs tx = new TransactionArgs();
        // tx.setFrom("0x487f2dfef230c2120b8cc55c5087b103146536ec");
        // tx.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        // tx.setValue("0x1");
        // tx.setGas("0x9999");
        // tx.setMaxFeePerGas("0x5d21dba00");
        // tx.setMaxPriorityFeePerGas("0x5d21dba00");
        Transaction tx = new Transaction(
            "0x413ba0e5f6f00664598b5c80042b1308f4ff1408",
            null,
            null,
            new BigInteger("9999",16),
            "0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee",
            new BigInteger("1",16),
            null,
            null,
            new BigInteger("5d21dba00",16),
            new BigInteger("5d21dba00",16));
        EthSendTransaction transactionResponse = w3.ethSendTransaction(tx).send();
        transactionResponse.getResult();
    }
}
