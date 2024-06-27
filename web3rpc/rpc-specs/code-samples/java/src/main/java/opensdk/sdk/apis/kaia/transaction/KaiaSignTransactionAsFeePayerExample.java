import org.web3j.protocol.klaytn.core.method.response.KaiaSignTransactionAsFeePayerResponse;
import org.web3j.protocol.klaytn.core.method.response.KaiatnTransactionTypes;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class KaiaSignTransactionAsFeePayerExample   {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaSignTransactionAsFeePayerExample() throws IOException {
        KaiatnTransactionTypes type = new KaiatnTransactionTypes();
        String address = "0x487f2dfef230c2120b8cc55c5087b103146536ec";
        String nonce = "0x1";
        type.setTypeInt(17);
        type.setFrom(address);
        type.setTo("0x44711E89b0c23845b5B2ed9D3716BA42b8a3e075");
        type.setValue("0xf4");
        type.setGas("0x76c0");
        type.setGasPrice("0x5d21dba00");
        type.setInput("0xb3f98adc0000000000000000000000000000000000000000000000000000000000000001");
        type.setFeePayer(address);
        type.setNonce(nonce);
        KaiaSignTransactionAsFeePayerResponse response = w3.kaiaSignTransactionAsFeePayer(type).send();
        response.getResult();
    }
}
