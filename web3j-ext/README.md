# Web3j extension for Klaytn

## Requirements
### Setting Java
- Use java version: 11 <= v <= 18
- Visit https://adoptopenjdk.net/ site
- Download OpenJDK

## Install Web3j Klaytn extension

To add the [Gradle Library](https://docs.gradle.org/current/userguide/getting_started.html) to your project:
```shell

repositories { 
    mavenCentral() 
}

dependencies {
    implementation "foundation.klaytn:web3j-ext:v0.9.3"
    implementation "foundation.klaytn:web3rpc-java:v0.9.0"
    implementation "org.web3j:core:4.9.8"
}
````
## Usage
See [example](./web3j-ext/src/main/java/org/web3j/example).

## Quickstart
For basic web3j usage, you can learn through [Web3j tutorial](https://docs.web3j.io/4.10.0/quickstart/) .

### Send Fee Delegated Transaction on Baobab Test network
If you want to know more about the concept of fee delegated transaction supported by Klaytn network, please refer to [Klaytn docs](https://docs.klaytn.foundation/content/klaytn/design/transactions).

Check FeeDelegatedValueTransferExample.java file in web3j-ext [examples](https://github.com/klaytn/web3klaytn/tree/dev/web3j-ext/web3j-ext/src/main/java/org/web3j/example).
```file
package org.web3j.example;

import java.io.IOException;
import java.math.BigInteger;
import org.web3j.crypto.KlayCredentials;
import org.web3j.crypto.KlayRawTransaction;
import org.web3j.crypto.KlayTransactionEncoder;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeValueTransfer;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;


public class FeeDelegatedValueTransferExample implements keySample {

    public static void run() throws Exception {
        Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
        KlayCredentials credentials = KlayCredentials.create(keySample.LEGACY_KEY_privkey);
        KlayCredentials credentials_feepayer = KlayCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        EthChainId EthchainId = web3j.ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = "0x000000000000000000000000000000000000dead";
        BigInteger nonce = web3j.ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        BigInteger value = BigInteger.valueOf(100);

        TxType.Type type = Type.FEE_DELEGATED_VALUE_TRANSFER;

        KlayRawTransaction raw = KlayRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from);

        // Sign as sender
        byte[] signedMessage = KlayTransactionEncoder.signMessage(raw, chainId, credentials);

        // Sign same message as Fee payer
        signedMessage = KlayTransactionEncoder.signMessageAsFeePayer(raw, chainId, credentials_feepayer);

        String hexValue = Numeric.toHexString(signedMessage);
        EthSendTransaction transactionResponse = web3j.ethSendRawTransaction(hexValue).send();
        System.out.println("TxHash : \n " + transactionResponse.getResult());
        String txHash = transactionResponse.getResult();

        int DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH = 40;
        int DEFAULT_BLOCK_TIME = 1 * 1000;
        long DEFAULT_POLLING_FREQUENCY = DEFAULT_BLOCK_TIME;
        TransactionReceiptProcessor transactionReceiptProcessor = new PollingTransactionReceiptProcessor(web3j,
                DEFAULT_POLLING_FREQUENCY, DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH);
        org.web3j.protocol.core.methods.response.TransactionReceipt ethReceipt = transactionReceiptProcessor
                .waitForTransactionReceipt(txHash);
        System.out.println("Receipt from eth_getTransactionReceipt : \n" + ethReceipt);
        TransactionReceipt receipt = web3j.klayGetTransactionReceipt(txHash).send().getResult();
        System.out.println("Receipt from klay_getTransactionReceipt : \n" + receipt);
        web3j.shutdown();

        TxTypeFeeDelegatedValueTransfer rawTransaction = TxTypeFeeDelegatedValueTransfer
                .decodeFromRawTransaction(hexValue);
        System.out.println("TxType : " + rawTransaction.getKlayType());
    }
}
````

Run examples

```file
import org.web3j.example.FeeDelegatedValueTransferExample;

public class quickstart {
        public static void main(String[] args) throws Exception {
            FeeDelegatedValueTransferExample.run();
        }
}
````
