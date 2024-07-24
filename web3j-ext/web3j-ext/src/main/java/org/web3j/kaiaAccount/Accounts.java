package org.web3j.kaiaAccount;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.web3j.crypto.KaiaCredentials;

public class Accounts {
    private final List<KaiaCredentials> CredentialLists = new ArrayList<>();

    public Accounts() {
    }

    public boolean add(KaiaCredentials credentials) {
        return CredentialLists.add(credentials);
    }

    public boolean add(String privKey) {
        return CredentialLists.add(KaiaCredentials.create(privKey));
    }

    public boolean remove(KaiaCredentials credentials) {
        return CredentialLists.remove(credentials);
    }

    public List<KaiaCredentials> getList() {
        return this.CredentialLists;
    }

    public List<KaiaCredentials> credentialsByKey(BigInteger privKey) {
        List<KaiaCredentials> returnKaiaCredentials = new ArrayList<>();
        for (KaiaCredentials element : CredentialLists) {
            if (element.getEcKeyPair().getPrivateKey().equals(privKey)) {
                returnKaiaCredentials.add(element);
            }
        }
        return returnKaiaCredentials;
    }

    public List<KaiaCredentials> credentialsByPubKey(BigInteger pubKey) {
        List<KaiaCredentials> returnKaiaCredentials = new ArrayList<>();
        for (KaiaCredentials element : CredentialLists) {
            if (element.getEcKeyPair().getPublicKey().equals(pubKey)) {
                returnKaiaCredentials.add(KaiaCredentials.create(element.getEcKeyPair(), element.getAddress()));
            }
        }
        return returnKaiaCredentials;
    }

    public List<KaiaCredentials> credentialsByAddress(String address) {
        List<KaiaCredentials> returnKaiaCredentials = new ArrayList<>();
        for (KaiaCredentials element : CredentialLists) {
            if (address.equals(element.getAddress())) {
                returnKaiaCredentials.add(element);
            }
        }
        return returnKaiaCredentials;
    }

}
