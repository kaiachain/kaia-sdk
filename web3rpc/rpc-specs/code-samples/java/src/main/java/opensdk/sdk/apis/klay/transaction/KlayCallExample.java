import org.web3j.protocol.klaytn.core.method.response.KlayCallObject;
import org.web3j.protocol.klaytn.core.method.response.KlayCallResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.klaytn.Web3j;
import java.io.IOException;

public class KlayCallExample {

    private Web3j w3 = Web3j.build(new HttpService("https://public-en-baobab.klaytn.net"));
    void klayCallExample() throws IOException {
        KlayCallObject callObject = new KlayCallObject();
        callObject.setFrom("0x3f71029af4e252b25b9ab999f77182f0cd3bc085");
        callObject.setTo("0x87ac99835e67168d4f9a40580f8f5c33550ba88b");
        callObject.setGas("0x100000");
        callObject.setGasPrice("0x5d21dba00");
        callObject.setValue("0x0");
        callObject.setInput("0x8ada066e");

        KlayCallResponse cr = w3.klayCall(
            callObject,
            "latest")
        .send();
        cr.getResult();
    }
}
