import org.web3j.protocol.klaytn.core.method.response.KaiaSignTransactionResponse;
import org.web3j.protocol.klaytn.core.method.response.KaiatnTransactionTypes;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class KaiaSignTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    void kaiaSignTransactionExample() throws IOException, ExecutionException, InterruptedException {
        KaiatnTransactionTypes type = new KaiatnTransactionTypes();
        String address = "0x487f2dfef230c2120b8cc55c5087b103146536ec";
        String nonce = "0x20";
        type.setFrom(address);
        type.setTo("0x8c9f4468ae04fb3d79c80f6eacf0e4e1dd21deee");
        type.setValue("0x10000");
        type.setGas("0x1000000");
        type.setGasPrice("0x25000000000");
        type.setNonce(nonce);
        KaiaSignTransactionResponse response = w3.kaiaSignTransaction(type).send();
        response.getResult();
    }
}
