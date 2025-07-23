import org.web3j.protocol.kaia.core.method.response.KaiaSendRawTransactionsResponse;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;

import java.io.IOException;

public class KaiaSendRawTransactionsExample {
    private Web3j w3 = Web3j.build(new HttpService("https://public-en-kairos.node.kaia.io"));
    void kaiaSendRawTransactionsExample() throws IOException {
        ArrayList<String> signedTransactionData = new ArrayList<>();
        signedTransactionData.add("0x01f8ae8203e98085066720b300830186a094cb00ba2cab67a3771f9ca1fa48fda8881b45775080b844095ea7b30000000000000000000000004b41783732810b731569e4d944f59372f411bea2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc080a0a288a06b1f6dc556e9e651d30cc8b985e58ecb418facb9666d5c49af5f4331f7a04068642611bf8f99d31e61e4386cc91130d3b55c386ec97b02a9c98d01aa61af");
        signedTransactionData.add("0xf9010c0585066720b3008307a120944b41783732810b731569e4d944f59372f411bea280b8a480426901000000000000000000000000cb00ba2cab67a3771f9ca1fa48fda8881b457750000000000000000000000000000000000000494a02fda18ed1ce00000000000000000000000000000000000000004596784b50f8f800000000000000000000000000000000000000000000032e6c90c04f80000000000000000000000000000000000000000000000000000000000683570348207f5a01ea30dd90c2b2938c664236c910b0ee41e9fa949c4917e726b91a1c543095304a07afd83df326fbe3f0a305433139165d5b3872378e1a9129bc3ab3ab68da186a2");

        KaiaSendRawTransactionsResponse response = w3.kaiaSendRawTransactions(signedTransactionData).send();
        response.getResult();
    }
}
