package org.web3j.protocol.klaytn;

import java.util.Arrays;
import java.util.concurrent.ScheduledExecutorService;

import org.web3j.protocol.Web3jService;
import org.web3j.protocol.core.JsonRpc2_0Web3j;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.utils.Async;
import org.web3j.protocol.klaytn.Web3j;
import org.web3j.protocol.klaytn.core.AdminApi;
import org.web3j.protocol.klaytn.core.DebugApi;
import org.web3j.protocol.klaytn.core.GovernanceApi;
import org.web3j.protocol.klaytn.core.KlayApi;
import org.web3j.protocol.klaytn.core.MainbridgeApi;
import org.web3j.protocol.klaytn.core.NetApi;
import org.web3j.protocol.klaytn.core.PersonalApi;
import org.web3j.protocol.klaytn.core.SubbridgeApi;
import org.web3j.protocol.klaytn.core.TxpoolApi;
import org.web3j.protocol.klaytn.core.KaiaApi;

public class Web3j extends JsonRpc2_0Web3j implements KaiaApi, KlayApi, GovernanceApi, AdminApi, NetApi, PersonalApi, TxpoolApi,
        DebugApi, MainbridgeApi, SubbridgeApi {
    public static final int DEFAULT_BLOCK_TIME = 15 * 1000;

    public Web3j(Web3jService web3jService) {
        this(web3jService, DEFAULT_BLOCK_TIME, Async.defaultExecutorService());
    }

    public Web3j(
            Web3jService web3jService,
            long pollingInterval,
            ScheduledExecutorService scheduledExecutorService) {
        super(web3jService, pollingInterval, scheduledExecutorService);
    }

    /**
     * Construct a new Web3j instance.
     *
     * @param web3jService web3j service instance - i.e. HTTP or IPC
     * @return new Web3j instance
     */
    public static Web3j build(Web3jService web3jService) {
        return new Web3j(web3jService);
    }

    /**
     * Construct a new Web3j instance.
     *
     * @param web3jService             web3j service instance - i.e. HTTP or IPC
     * @param pollingInterval          polling interval for responses from network
     *                                 nodes
     * @param scheduledExecutorService executor service to use for scheduled tasks.
     *                                 <strong>You are
     *                                 responsible for terminating this thread
     *                                 pool</strong>
     * @return new Web3j instance
     */
    public static Web3j build(
            Web3jService web3jService,
            long pollingInterval,
            ScheduledExecutorService scheduledExecutorService) {
        return new Web3j(web3jService, pollingInterval, scheduledExecutorService);
    }

    @Override
    public Request<?, EthSendTransaction> ethSendRawTransaction(String signedTransactionData) {
        long txType = 0;
        try {
            txType = Long.parseUnsignedLong(signedTransactionData.substring(2, 4), 16);
        } catch (NumberFormatException e) {
        }

        // Klaytn transaction type
        if (8 <= txType && txType <= 74) {
            return new Request<>(
                    "klay_sendRawTransaction",
                    Arrays.asList(signedTransactionData),
                    web3jService,
                    org.web3j.protocol.core.methods.response.EthSendTransaction.class);
        }
        return super.ethSendRawTransaction(signedTransactionData);
    }

    @Override
    public Web3jService getWeb3Service() {
        return this.getService();
    }

    @Override
    public Web3jService getService() {
        return this.web3jService;
    }
}
