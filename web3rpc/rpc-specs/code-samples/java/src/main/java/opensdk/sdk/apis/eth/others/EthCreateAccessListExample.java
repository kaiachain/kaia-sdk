//import org.web3j.protocol.klaytn.core.method.response.EthCreateAccessListResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;

import java.io.IOException;
import java.math.BigInteger;

public class EthCreateAccessListExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));    
    void ethCreateAccessListExample() throws IOException {
        Transaction args = Transaction.createFunctionCallTransaction("0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312",null
                ,new BigInteger("3b9aca00",16)
                ,new BigInteger("3d0900",16)
                ,"0x00f5f5f3a25f142fafd0af24a754fafa340f32c7"
                ,"0x20965255");
        String blockNumberOrHash = "latest";
//        EthCreateAccessListResponse response = w3.ethCreateAccessList(args,blockNumberOrHash).send();
//        response.getResult();
    }
    
}
