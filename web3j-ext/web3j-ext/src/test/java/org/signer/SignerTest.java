package org.signer;

import org.base.BaseTesting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.crypto.KaiaSignatureData;
import org.web3j.crypto.Sign;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Signer Tests")
public class SignerTest extends BaseTesting {
    @Test
    @DisplayName("test signPrefixedMessage")
    void exampleTestCase() {
        String message = "0xdeadbeef";

        Sign.SignatureData signature = KaiaSignatureData.signPrefixedMessage(message, this.getCredentials());
        String result = KaiaSignatureData.getSignatureString(signature);

        assertNotNull(result);
    }
}
