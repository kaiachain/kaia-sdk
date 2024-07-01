package org.web3j.example.utils;

import java.io.IOException;
import java.util.List;

import org.web3j.crypto.KaiaCredentials;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;
import org.web3j.kaiaAccount.AccountStore;
import org.web3j.kaiaAccount.Accounts;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;

/**
 * 
 */
public class AccountStoreExample implements keySample {

        public static void run() throws Exception {
                Web3j web3j = Web3j.build(new HttpService(keySample.BAOBAB_URL));
                KaiaCredentials cred_legacy = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);
                KaiaCredentials cred_legacy2 = KaiaCredentials.create(keySample.LEGACY_KEY_FEEPAYER_privkey);
                KaiaCredentials cred_public = KaiaCredentials.create(keySample.PUBLIC_KEY_privkey);
                KaiaCredentials cred_multi = KaiaCredentials.create(keySample.MULTI_KEY_privkey1,
                                keySample.MULTI_KEY_address);
                KaiaCredentials cred_multi_with_orig_addr = KaiaCredentials.create(keySample.MULTI_KEY_privkey1);
                KaiaCredentials cred_rolebased = KaiaCredentials.create(keySample.ROLEBASED_KEY_transactionkey,
                                keySample.ROLEBASED_KEY_address);

                Accounts accounts = new Accounts();
                accounts.add(cred_legacy);
                accounts.add(cred_legacy2);
                accounts.add(cred_public);
                accounts.add(cred_multi);
                accounts.add(cred_multi_with_orig_addr);
                accounts.add(cred_rolebased);
                accounts.add(ROLEBASED_KEY_transactionkey); // transactionkey with original address

                accounts.remove(cred_legacy2);

                List<KaiaCredentials> result = accounts.credentialsByAddress(LEGACY_KEY_FEEPAYER_address);
                System.out.println("Accounts list has " + result.size() + " Kaiacredentials for address="
                                + LEGACY_KEY_FEEPAYER_address);
                List<KaiaCredentials> result2 = accounts.credentialsByKey(Numeric.toBigInt(MULTI_KEY_privkey1));
                System.out.println("Accounts list has " + result2.size() + " Kaiacredentials for given private key");
                List<KaiaCredentials> result3 = accounts.getList();
                System.out.println("Accounts list has " + result3.size() + " Kaiacredentials for all");

                AccountStore accStore = new AccountStore();
                accStore.refresh(web3j, accounts);

                System.out.println("result : \n" + accStore.getAccountInfos());

                System.out.println("result for address : " + ROLEBASED_KEY_address + "\n"
                                + accStore.getAccountInfo(ROLEBASED_KEY_address));

        }

}
