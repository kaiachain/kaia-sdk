package org.web3j.crypto;

import java.io.File;
import java.io.IOException;
import org.web3j.crypto.WalletFile.Crypto;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class KaiaWelletUtils {

    private static final int CURRENT_VERSION = 3;
    private static final String CIPHER = "aes-128-ctr";
    static final String AES_128_CTR = "pbkdf2";
    static final String SCRYPT = "scrypt";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public KaiaCredentials loadKaiaCredentials(String password, String source)
            throws IOException, CipherException {
        return loadCredentials(password, new File(source));
    }

    public KaiaCredentials loadCredentials(String password, File source)
            throws IOException, CipherException {
        WalletFile walletFile = objectMapper.readValue(source, WalletFile.class);
        return KaiaCredentials.create(Wallet.decrypt(password, walletFile), walletFile.getAddress());
    }

    public static KaiaCredentials loadJsonKaiaCredentials(String password, String content)
            throws IOException, CipherException {
        WalletFile walletFile = objectMapper.readValue(content, WalletFile.class);
        return KaiaCredentials.create(Wallet.decrypt(password, walletFile), walletFile.getAddress());
    }

    public static List<List<KaiaCredentials>> loadKaiaCredentialsFromV4(String password, String source)
            throws Exception {
        return loadKaiaCredentialsFromV4(password, new File(source));
    }

    public static List<List<KaiaCredentials>> loadKaiaCredentialsFromV4(String password, File jsonFile)
            throws Exception {
        JsonNode rootNode = objectMapper.readTree(jsonFile);
        return loadKaiaCredentialsV4(password, rootNode);
    }

    public static List<List<KaiaCredentials>> loadJsonKaiaCredentialsFromV4(String password, String content)
            throws Exception {
        JsonNode rootNode = objectMapper.readTree(content);
        return loadKaiaCredentialsV4(password, rootNode);
    }

    static List<List<KaiaCredentials>> loadKaiaCredentialsV4(String password, JsonNode rootNode) throws Exception {

        // Extracting the address
        String address = rootNode.get("address").asText();

        List<List<KaiaCredentials>> cryptoLists = new ArrayList<>();
        JsonNode keyringNode = rootNode.get("keyring");

        // Check if 'keyring' is an array of arrays(=roleBased) or a single array
        if (keyringNode.isArray()) {
            if (keyringNode.has(0) && keyringNode.get(0).isArray()) {
                // It's a nested array
                for (JsonNode arrayNode : keyringNode) {
                    List<KaiaCredentials> cryptos = new ArrayList<>();
                    for (JsonNode cryptoNode : arrayNode) {
                        Crypto crypto = objectMapper.treeToValue(cryptoNode, Crypto.class);
                        cryptos.add(decryptKaiaCredentials(crypto, password, address));
                    }
                    cryptoLists.add(cryptos);
                }
            } else {
                // It's a single array, create one list with all the elements
                List<KaiaCredentials> cryptos = new ArrayList<>();
                for (JsonNode cryptoNode : keyringNode) {
                    Crypto crypto = objectMapper.treeToValue(cryptoNode, Crypto.class);
                    cryptos.add(decryptKaiaCredentials(crypto, password, address));
                }
                cryptoLists.add(cryptos);
            }
        }

        return cryptoLists;
    }

    static KaiaCredentials decryptKaiaCredentials(Crypto crypto, String password, String address)
            throws CipherException {
        WalletFile temp = new WalletFile();
        temp.setCrypto(crypto);
        temp.setVersion(CURRENT_VERSION);
        ECKeyPair privkey = Wallet.decrypt(password, temp);

        return KaiaCredentials.create(privkey, address);

    }
}
