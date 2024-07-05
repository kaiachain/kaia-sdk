package org.web3j.example.utils;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import org.web3j.crypto.KaiaWelletUtils;
import org.web3j.crypto.KaiaCredentials;
import java.io.IOException;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;
import org.web3j.example.keySample;

public class DecryptKeystoreV3Example implements keySample {

    public static void run() throws Exception {
        String password = "Ilovekaia";

        String[] keyFiles = { "/Legacy_V3.json", "/Public_V3.json" };
        for (String keyFile : keyFiles) {

            String json = getResourceJSON(keyFile);

            // Convert keystore to list of KaiaCredentials
            KaiaCredentials credentials = KaiaWelletUtils.loadJsonKaiaCredentials(password, json);

            System.out.println("Load KaiaCredentials from keystore file: " + keyFile);
            String address = credentials.getAddress();
            String privateKey = credentials.getEcKeyPair().getPrivateKey().toString(16);
            System.out.println("\tKaiaCredential : " + "Address: " + address + ", Private Key: 0x" + privateKey);
        }

    }

    static String getResourceJSON(String resourcePath) throws IOException {
        InputStream inputStream = DecryptKeystoreV3Example.class.getResourceAsStream(resourcePath);
        if (inputStream == null) {
            throw new IllegalArgumentException("resource not found: " + resourcePath);
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            // String value for keystore JSON
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));

        } catch (IOException e) {
            // IOException을 호출자에게 전파
            throw e;
        }
    }
}
