package org.base;

import org.mockito.Mockito;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.example.keySample;
import org.web3j.protocol.Web3jService;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.kaia.Web3j;


public abstract class BaseTesting {
    private final Web3jService web3jService = Mockito.mock(HttpService.class);
    private final Web3j mockedWeb3j = Web3j.build(web3jService);
    private final Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
    private final KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);

    public Web3j getMockedWeb3j() {
        return mockedWeb3j;
    }

    public Web3j getWeb3j() {
        return web3j;
    }

    public Web3jService getWeb3jService() {
        return web3jService;
    }

    public KaiaCredentials getCredentials() {
        return credentials;
    }
}
