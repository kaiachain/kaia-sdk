package org.utils;

import org.base.BaseTesting;
import org.base.UtilsHelper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.KaiaCredentials;
import org.web3j.crypto.KaiaWelletUtils;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.example.keySample;
import org.web3j.kaiaAccount.AccountStore;
import org.web3j.kaiaAccount.Accounts;
import org.web3j.utils.BytesUtils;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Utils Tests")
public class UtilsTest extends BaseTesting {
    @Test
    @DisplayName("test Constants")
    void testConstants() {
        assertNotNull(Type.ACCOUNT_UPDATE);
    }

    @Test
    @DisplayName("test Keystore v3")
    void testKeystoreV3() throws CipherException, IOException {
        String password = "Iloveklaytn";

        String[] keyFiles = {"/Legacy_V3.json", "/Public_V3.json"};
        for (String keyFile : keyFiles) {

            String json = UtilsHelper.getResourceJSON(keyFile);

            // Convert keystore to list of KaiaCredentials
            KaiaCredentials credentials = KaiaWelletUtils.loadJsonKaiaCredentials(password, json);
            String address = credentials.getAddress();
            String privateKey = credentials.getEcKeyPair().getPrivateKey().toString(16);
            assertNotNull(address);
            assertNotNull(privateKey);
        }
    }

    @Test
    @DisplayName("test Keystore v4")
    void testKeyStoreV4() throws Exception {
        String password = "Iloveklaytn";

        String[] keyFiles = {"/RoleBased_V4.json", "/Multi_V4.json", "/Public_V4.json"};
        for (String keyFile : keyFiles) {

            String json = UtilsHelper.getResourceJSON(keyFile);

            // Convert keystore to list of KaiaCredentials
            List<List<KaiaCredentials>> credentialsLists = KaiaWelletUtils.loadJsonKaiaCredentialsFromV4(password,
                    json);

            for (List<KaiaCredentials> credentialsList : credentialsLists) {
                for (KaiaCredentials credentials : credentialsList) {
                    String address = credentials.getAddress();
                    String privateKey = credentials.getEcKeyPair().getPrivateKey().toString(16);
                    assertNotNull(address);
                    assertNotNull(privateKey);
                }
            }
        }

    }

    @Test
    @DisplayName("test accountStore")
    void testAccountStore() throws IOException {
        KaiaCredentials credentials = KaiaCredentials.create(keySample.LEGACY_KEY_privkey);

        Accounts accounts = new Accounts();
        accounts.add(credentials);

        AccountStore accStore = new AccountStore();
        accStore.refresh(this.getWeb3j(), accounts);

        assertNotNull(accStore.getAccountInfo(keySample.LEGACY_KEY_address).get("address"));
        assertEquals(keySample.LEGACY_KEY_address, accStore.getAccountInfo(keySample.LEGACY_KEY_address).get("address"));
    }

    @Test
    @DisplayName("test Helpers")
    void testHelper() {
        assertTrue(BytesUtils.isHexStrict("0x123"));
        assertFalse(BytesUtils.isHexStrict("123"));
        byte[] left = {1, 2, 3};
        byte[] right = {4, 5, 6};
        assertEquals(Arrays.toString(BytesUtils.concat(left, right)), "[1, 2, 3, 4, 5, 6]");
    }

}

