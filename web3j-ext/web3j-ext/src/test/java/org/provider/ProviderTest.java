package org.provider;

import org.base.BaseTesting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.kaia.core.method.response.KaiaChainIDResponse;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Provider Tests")
public class ProviderTest extends BaseTesting {
    @Test
    @DisplayName("test kaia namespace")
    void testKaiaNamespace() throws IOException {
        KaiaChainIDResponse chainId = this.getWeb3j().kaiaChainID().send();
        assertEquals(chainId.getResult(), "0x3e9");
    }
}
