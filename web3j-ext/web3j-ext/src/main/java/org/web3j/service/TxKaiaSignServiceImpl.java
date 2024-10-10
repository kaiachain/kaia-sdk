package org.web3j.service;

import org.web3j.crypto.Credentials;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaRawTransaction;
import org.web3j.crypto.KaiaTransactionEncoder;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.tx.ChainId;

/** Service to base sign transaction. */
public class TxKaiaSignServiceImpl {

    private final KaiaCredentials credentials;

    public TxKaiaSignServiceImpl(KaiaCredentials credentials) {
        this.credentials = credentials;
    }

    public TxKaiaSignServiceImpl(Credentials credentials) {
        this.credentials = KaiaCredentials.create(credentials.getEcKeyPair());
    }

    public byte[] sign(KaiaRawTransaction rawTransaction, long chainId) {
        final byte[] signedMessage;

        if (chainId > ChainId.NONE) {
            signedMessage = KaiaTransactionEncoder.signMessage(rawTransaction, chainId, credentials);
        } else {
            signedMessage = KaiaTransactionEncoder.signMessage(rawTransaction, credentials.convertToCredentials());
        }
        return signedMessage;
    }

    public byte[] sign(RawTransaction rawTransaction, long chainId) {
        final byte[] signedMessage;

        if (chainId > ChainId.NONE) {
            signedMessage = TransactionEncoder.signMessage(rawTransaction, chainId, credentials.convertToCredentials());
        } else {
            signedMessage = TransactionEncoder.signMessage(rawTransaction, credentials.convertToCredentials());
        }
        return signedMessage;
    }

    public String getAddress() {
        return credentials.getAddress();
    }
}
