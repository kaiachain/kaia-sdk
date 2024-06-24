
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.method.response.KaiaRecoverFromTransactionResponse;

import java.io.IOException;

public class KaiaRecoverFromTransactionExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void kaiaRecoverFromTransaction() throws IOException {
        String rlpEncoded = "0x08f88608850ba43b7400827b0c94c40b6909eb7085590e1c26cb3becc25368e249e9880de0b6b3a764000094e15cd70a41dfb05e7214004d7d054801b2a2f06bf847f845820fe9a090421871e8fd77e08b6a72760006a15184a96cfc39c7486ea948d11fd830ae8aa05876248aa8dc0783d782e584e6f8d9bf977c698210a0eab3e754192d0954de65";
        String blockNumber = "latest";
        KaiaRecoverFromTransactionResponse response = w3.kaiaRecoverFromTransaction(rlpEncoded, blockNumber).send();
        response.getResult();
    }
}
