package org.web3j.example.transactions;

import java.io.IOException;
import java.math.BigInteger;
import org.web3j.crypto.KlayCredentials;
import org.web3j.crypto.KlayRawTransaction;
import org.web3j.crypto.KlayTransactionEncoder;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeSmartContractDeploy;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;

/**
 * 
 */
public class FeeDelegatedSmartContractDeployExample implements keySample {
    /**
     * 
     */
    public static void run() throws Exception {

        Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
        KlayCredentials credentials = KlayCredentials.create(keySample.LEGACY_KEY_privkey);
        KlayCredentials credentials_feepayer = KlayCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);

        BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
        BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
        String from = credentials.getAddress();
        BigInteger nonce = web3j.ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
                .getTransactionCount();
        String data = "0x60c0604052600c60809081526b48656c6c6f20576f726c642160a01b60a05260009061002b90826100dd565b5034801561003857600080fd5b5061019c565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061006857607f821691505b60208210810361008857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156100d857600081815260208120601f850160051c810160208610156100b55750805b601f850160051c820191505b818110156100d4578281556001016100c1565b5050505b505050565b81516001600160401b038111156100f6576100f661003e565b61010a816101048454610054565b8461008e565b602080601f83116001811461013f57600084156101275750858301515b600019600386901b1c1916600185901b1785556100d4565b600085815260208120601f198616915b8281101561016e5788860151825594840194600190910190840161014f565b508582101561018c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61019a806101ab6000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063cfae321714610030575b600080fd5b61003861004e565b60405161004591906100dc565b60405180910390f35b6000805461005b9061012a565b80601f01602080910402602001604051908101604052809291908181526020018280546100879061012a565b80156100d45780601f106100a9576101008083540402835291602001916100d4565b820191906000526020600020905b8154815290600101906020018083116100b757829003601f168201915b505050505081565b600060208083528351808285015260005b81811015610109578581018301518582016040015282016100ed565b506000604082860101526040601f19601f8301168501019250505092915050565b600181811c9082168061013e57607f821691505b60208210810361015e57634e487b7160e01b600052602260045260246000fd5b5091905056fea264697066735822122002272dad43feb87cde6d15be86d8d1af21672f2443deb524dce07ca0210d1cec64736f6c63430008120033";
        EthChainId EthchainId = web3j.ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();
        String to = null;
        byte[] payload = Numeric.hexStringToByteArray(data);

        BigInteger value = BigInteger.ZERO;
        BigInteger codeFormat = BigInteger.ZERO;

        TxType.Type type = Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY;

        KlayRawTransaction raw = KlayRawTransaction.createTransaction(
                type,
                nonce,
                GAS_PRICE,
                GAS_LIMIT,
                to,
                value,
                from,
                payload,
                codeFormat);

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

        TxTypeSmartContractDeploy rawTransaction = TxTypeSmartContractDeploy.decodeFromRawTransaction(signedMessage);
        System.out.println("TxType : " + rawTransaction.getKlayType());
    }

}
