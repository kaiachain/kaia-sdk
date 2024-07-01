package org.web3j.example.transactions;

import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import java.io.IOException;
import java.math.BigInteger;

import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.KaiaTransactionEncoder;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedValueTransferMemo;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.utils.Numeric;
import org.web3j.protocol.kaia.core.method.response.TransactionReceipt;

public class FeeDelegatedValueTransferMemoExample {

	public static void run() throws Exception {
		Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
		KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);
		KaiaCredentials credentials_feepayer = KaiaCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);

		BigInteger GAS_PRICE = BigInteger.valueOf(50000000000L);
		BigInteger GAS_LIMIT = BigInteger.valueOf(6721950);
		String from = credentials.getAddress();
		EthChainId EthchainId = web3j.ethChainId().send();
		long chainId = EthchainId.getChainId().longValue();
		String to = "0x000000000000000000000000000000000000dead";
		BigInteger nonce = web3j.ethGetTransactionCount(from, DefaultBlockParameterName.LATEST).send()
				.getTransactionCount();
		BigInteger value = BigInteger.valueOf(100);
		String data = "Kaia Web3j";
		byte[] payload = data.getBytes();

		TxType.Type type = Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO;

		KaiaRawTransaction raw = KaiaRawTransaction.createTransaction(
				type,
				nonce,
				GAS_PRICE,
				GAS_LIMIT,
				to,
				value,
				from,
				payload);

		// Sign as sender
		byte[] signedMessage = KaiaTransactionEncoder.signMessage(raw, chainId, credentials);

		// Sign same message as Fee payer
		signedMessage = KaiaTransactionEncoder.signMessageAsFeePayer(raw, chainId, credentials_feepayer);

		String hexValue = Numeric.toHexString(signedMessage);
		EthSendTransaction transactionResponse = web3j.ethSendRawTransaction(hexValue).send();
		System.out.println("TxHash : \n " + transactionResponse.getResult());
		String txHash = transactionResponse.getResult();
		try {
			Thread.sleep(2000);
		} catch (Exception e) {
			System.out.println(e);
		}
		TransactionReceipt receipt = web3j.kaiaGetTransactionReceipt(txHash).send().getResult();
		System.out.println("Receipt from kaia_getTransactionReceipt : \n" + receipt);
		web3j.shutdown();

		TxTypeFeeDelegatedValueTransferMemo rawTransaction = TxTypeFeeDelegatedValueTransferMemo
				.decodeFromRawTransaction(hexValue);
		System.out.println("TxType : " + rawTransaction.getKaiaType());

	}

}
