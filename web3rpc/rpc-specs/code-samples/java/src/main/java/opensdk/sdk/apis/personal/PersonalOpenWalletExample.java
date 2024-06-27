import org.web3j.protocol.klaytn.core.method.response.PersonalOpenWalletResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;

import java.io.IOException;

public class PersonalOpenWalletExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void personalOpenWalletExample() throws IOException {
        String url = "keystore:///home/sotatek/klay-node/kcn-v1.10.2-0-linux-amd64/kcn-linux-amd64/data/keystore/UTC--2" +
                "023-04-13T03-23-36.992476555Z--8cd4b6b24f2cd0b83d49876f932254823e875547";
        String passphrase = "passphrase";
        PersonalOpenWalletResponse response = w3.personalOpenWallet(url, passphrase).send();
        response.getResult();
    }
}
