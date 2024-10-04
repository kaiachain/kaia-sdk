package org.provider;

import org.base.BaseTesting;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.kaia.core.method.response.*;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@DisplayName("Provider Tests")
public class ProviderTest extends BaseTesting {
    @Test
    @DisplayName("test kaia/klay namespace")
    void testKaiaAndKlayNamespace() throws IOException {
        KaiaChainIDResponse mockKaiaChainIdResponse = new KaiaChainIDResponse();
        mockKaiaChainIdResponse.setId(123);


        KlayChainIDResponse mockKlayChainIdResponse = new KlayChainIDResponse();
        mockKlayChainIdResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockKaiaChainIdResponse);
        KaiaChainIDResponse kaiaChainId = this.getMockedWeb3j().kaiaChainID().send();
        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockKlayChainIdResponse);
        KlayChainIDResponse klayChainId = this.getMockedWeb3j().klayChainID().send();
        assertEquals(kaiaChainId.getId(), 123);
        assertEquals(klayChainId.getId(), 123);
    }

    @Test
    @DisplayName("test admin namespace")
    void testAdminNamespace() throws IOException {

        AdminNodeConfigResponse mockedResponse = new AdminNodeConfigResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        AdminNodeConfigResponse response = this.getMockedWeb3j().adminNodeConfig().send();

        assertEquals(response.getId(), 123);
    }

    @Test
    @DisplayName("test net namespace")
    void testNetNamespace() throws IOException {
        NetNetworkIDResponse mockedResponse = new NetNetworkIDResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        NetNetworkIDResponse response = this.getMockedWeb3j().netNetworkID().send();

        assertEquals(response.getId(), 123);
    }

    @Test
    @DisplayName("test personal namespace")
    void testPersonalNamespace() throws IOException {

        PersonalListAccountsResponse mockedResponse = new PersonalListAccountsResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        PersonalListAccountsResponse response = this.getMockedWeb3j().personalListAccounts().send();

        assertEquals(response.getId(), 123);
    }

    @Test
    @DisplayName("test governance namespace")
    void testGovernanceNamespace() throws IOException {
        GovernanceGetChainConfigResponse mockedResponse = new GovernanceGetChainConfigResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        GovernanceGetChainConfigResponse response = this.getMockedWeb3j().governanceGetChainConfig().send();

        assertEquals(response.getId(), 123);
    }

    @Test
    @DisplayName("test debug namespace")
    void testDebugNamespace() throws IOException {
        DebugGcStatsResponse mockedResponse = new DebugGcStatsResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        DebugGcStatsResponse response = this.getMockedWeb3j().debugGcStats().send();

        assertEquals(response.getId(), 123);
    }

    @Test
    @DisplayName("test txPool namespace")
    void testTxPoolNamespace() throws IOException {
        TxpoolInspectResponse mockedResponse = new TxpoolInspectResponse();
        mockedResponse.setId(123);

        when(this.getWeb3jService().send(any(Request.class), any())).thenReturn(mockedResponse);
        TxpoolInspectResponse response = this.getMockedWeb3j().txpoolInspect().send();

        assertEquals(response.getId(), 123);
    }
}
