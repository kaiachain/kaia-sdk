/*
 * Copyright 2019 Web3 Labs Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
package org.web3j.crypto;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import org.web3j.protocol.kaia.Web3j;
import org.web3j.crypto.transaction.account.AccountKey;
import org.web3j.crypto.transaction.type.ITransaction;
import org.web3j.crypto.transaction.type.TxType;
import org.web3j.crypto.transaction.type.TxType.Type;
import org.web3j.crypto.transaction.type.AbstractTxType;
import org.web3j.crypto.transaction.type.TxTypeAccountUpdate;
import org.web3j.crypto.transaction.type.TxTypeCancel;
import org.web3j.crypto.transaction.type.TxTypeChainDataAnchoring;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegate;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedAccountUpdate;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedAccountUpdateWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedCancel;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedCancelWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedChainDataAnchoring;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedChainDataAnchoringWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedSmartContractDeploy;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedSmartContractDeployWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedSmartContractExecution;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedSmartContractExecutionWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedValueTransfer;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedValueTransferMemo;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedValueTransferMemoWithRatio;
import org.web3j.crypto.transaction.type.TxTypeFeeDelegatedValueTransferWithRatio;
import org.web3j.crypto.transaction.type.TxTypeSmartContractDeploy;
import org.web3j.crypto.transaction.type.TxTypeSmartContractExecution;
import org.web3j.crypto.transaction.type.TxTypeValueTransfer;
import org.web3j.crypto.transaction.type.TxTypeValueTransferMemo;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthChainId;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.utils.Numeric;
import java.io.IOException;

/**
 * Transaction class used for signing transactions locally.<br>
 * For the specification, refer to p4 of the
 * <a href="http://gavwood.com/paper.pdf">yellow
 * paper</a>.
 */
public class KaiaRawTransaction extends RawTransaction {
    private byte[] value; 
    private Set<KaiaSignatureData> signatureData;

    public KaiaRawTransaction(ITransaction transaction, Set<KaiaSignatureData> signatureData) {
        super(transaction);
        this.signatureData = signatureData;
    }

    public KaiaRawTransaction(ITransaction transaction, KaiaSignatureData signatureData) {
        super(transaction);
        this.signatureData = new HashSet<>(Arrays.asList(signatureData));
    }

    public KaiaRawTransaction(ITransaction transaction, byte[] value, Set<KaiaSignatureData> signatureData) {
        super(transaction);
        this.value = value;
        this.signatureData = signatureData;
    }

    public KaiaRawTransaction(ITransaction transaction, byte[] value, KaiaSignatureData signatureData) {
        super(transaction);
        this.value = value;
        this.signatureData = new HashSet<>(Arrays.asList(signatureData));
    }

    public KaiaSignatureData getSignatureData() {
        try {
            return signatureData.iterator().next();
        } catch (Exception e) {
            throw new RuntimeException("Called without signature data");
        }
    }

    protected KaiaRawTransaction(ITransaction transaction) {
        super(transaction);
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey) {

        if (type == Type.ACCOUNT_UPDATE) {
            return new KaiaRawTransaction(
                    TxTypeAccountUpdate.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey));
        }

        else if (type == Type.FEE_DELEGATED_ACCOUNT_UPDATE) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedAccountUpdate.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from) {

        if (type == Type.CANCEL) {
            return new KaiaRawTransaction(
                    TxTypeCancel.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from));
        }

        else if (type == Type.FEE_DELEGATED_CANCEL) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedCancel.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from) {

        if (type == Type.VALUE_TRANSFER) {
            return new KaiaRawTransaction(
                    TxTypeValueTransfer.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransfer.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from));
        } else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload) {

        if (type == Type.VALUE_TRANSFER_MEMO) {
            return new KaiaRawTransaction(
                    TxTypeValueTransferMemo.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferMemo.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.SMART_CONTRACT_EXECUTION) {
            return new KaiaRawTransaction(
                    TxTypeSmartContractExecution.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_EXECUTION) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractExecution.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger option) {

        if (type == Type.SMART_CONTRACT_DEPLOY) {
            return new KaiaRawTransaction(
                    TxTypeSmartContractDeploy.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractDeploy.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferMemoWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractExecutionWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload,
                            option));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }

    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedAccountUpdateWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_CANCEL_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedCancelWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            feeRatio));
        } else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger codeFormat,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractDeployWithRatio.createTransaction(
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            codeFormat,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }

    }
    
    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload) {
            if (type == Type.CHAIN_DATA_ANCHORING) {
                return new KaiaRawTransaction(
                        TxTypeChainDataAnchoring.createTransaction(
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload));
            }
            else if (type == Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING) {
                return new KaiaRawTransaction(
                        TxTypeFeeDelegatedChainDataAnchoring.createTransaction(
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload));
            }
            else {
                throw new UnsupportedOperationException("Unsupported type transaction");
            }
    }
    
    public static KaiaRawTransaction createTransaction(
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload,
            BigInteger feeRatio) {
            if (type == Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO) {
                return new KaiaRawTransaction(
                        TxTypeFeeDelegatedChainDataAnchoringWithRatio.createTransaction(
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload,
                                feeRatio));
            }
    
            
            else {
                throw new UnsupportedOperationException("Unsupported type transaction");
            }
    }




    // with chainId

    public static KaiaRawTransaction createTransaction(
            long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey) {

        if (type == Type.ACCOUNT_UPDATE) {
            return new KaiaRawTransaction(
                    TxTypeAccountUpdate.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey));
        }

        else if (type == Type.FEE_DELEGATED_ACCOUNT_UPDATE) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedAccountUpdate.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from) {

        if (type == Type.CANCEL) {
            return new KaiaRawTransaction(
                    TxTypeCancel.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from));
        }

        else if (type == Type.FEE_DELEGATED_CANCEL) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedCancel.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
            long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from) {

        if (type == Type.VALUE_TRANSFER) {
            return new KaiaRawTransaction(
                    TxTypeValueTransfer.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransfer.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from));
        } else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
        long chainId,    
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload) {

        if (type == Type.VALUE_TRANSFER_MEMO) {
            return new KaiaRawTransaction(
                    TxTypeValueTransferMemo.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferMemo.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.SMART_CONTRACT_EXECUTION) {
            return new KaiaRawTransaction(
                    TxTypeSmartContractExecution.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_EXECUTION) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractExecution.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger option) {

        if (type == Type.SMART_CONTRACT_DEPLOY) {
            return new KaiaRawTransaction(
                    TxTypeSmartContractDeploy.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractDeploy.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferMemoWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload,
                            option));
        }

        else if (type == Type.FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractExecutionWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            payload,
                            option));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }

    }

    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            AccountKey accountKey,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedAccountUpdateWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            accountKey,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_CANCEL_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedCancelWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            from,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedValueTransferWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            to,
                            value,
                            from,
                            feeRatio));
        } else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }
    }

    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String to,
            BigInteger value,
            String from,
            byte[] payload,
            BigInteger codeFormat,
            BigInteger feeRatio) {

        if (type == Type.FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO) {
            return new KaiaRawTransaction(
                    TxTypeFeeDelegatedSmartContractDeployWithRatio.createTransaction(
                        chainId,
                            type,
                            nonce,
                            gasPrice,
                            gas,
                            value,
                            from,
                            payload,
                            codeFormat,
                            feeRatio));
        }

        else {
            throw new UnsupportedOperationException("Unsupported type transaction");
        }

    }
    
    public static KaiaRawTransaction createTransaction(
            long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload) {
            if (type == Type.CHAIN_DATA_ANCHORING) {
                return new KaiaRawTransaction(
                        TxTypeChainDataAnchoring.createTransaction(
                            chainId,
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload));
            }
            else if (type == Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING) {
                return new KaiaRawTransaction(
                        TxTypeFeeDelegatedChainDataAnchoring.createTransaction(
                            chainId,
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload));
            }
            else {
                throw new UnsupportedOperationException("Unsupported type transaction");
            }
    }
    
    public static KaiaRawTransaction createTransaction(
        long chainId,
            TxType.Type type,
            BigInteger nonce,
            BigInteger gasPrice,
            BigInteger gas,
            String from,
            byte[] payload,
            BigInteger feeRatio) {
            if (type == Type.FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO) {
                return new KaiaRawTransaction(
                        TxTypeFeeDelegatedChainDataAnchoringWithRatio.createTransaction(
                            chainId,
                                type,
                                nonce,
                                gasPrice,
                                gas,
                                from,
                                payload,
                                feeRatio));
            }
            else {
                throw new UnsupportedOperationException("Unsupported type transaction");
            }
    }

    public byte[] getRaw() {
        return value;
    }


    public KaiaRawTransaction fillTransaction(Web3j web3j) throws IOException {
        AbstractTxType tx = (AbstractTxType) this.getTransaction();
        TxType.Type type = tx.getKaiaType();

        EthChainId EthchainId = web3j.ethChainId().send();
        long chainId = EthchainId.getChainId().longValue();

        EthGetTransactionCount ethGetTransactionCount =
        web3j.ethGetTransactionCount(
                        tx.getFrom(), DefaultBlockParameterName.PENDING)
                .send();

        BigInteger nonce = ethGetTransactionCount.getTransactionCount();

        Object gasPriceResponse = web3j.kaiaGasPrice().send().getResult();
        if (gasPriceResponse == null) {
            throw new UnsupportedOperationException("Cannot get GasPrice");
        }
        BigInteger gasPrice = new BigInteger(Numeric.cleanHexPrefix((String) gasPriceResponse), 16);


        KaiaRawTransaction raw;
        if (!Type.isFeeDelegated(type) && !Type.isPartialFeeDelegated(type)) {
            switch (type) {
                case ACCOUNT_UPDATE:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getFrom(),
                        ((TxTypeAccountUpdate)tx).getAccountKey());                       
                    break;
                case CANCEL:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getFrom());                            
                    break;
                case SMART_CONTRACT_DEPLOY:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeSmartContractDeploy)tx).getPayload(),
                        ((TxTypeSmartContractDeploy)tx).getCodeFormat());                            
                    break;
                case SMART_CONTRACT_EXECUTION:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeSmartContractExecution)tx).getPayload());                            
                    break;
                case VALUE_TRANSFER:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom());
                    break;
                case VALUE_TRANSFER_MEMO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeValueTransferMemo)tx).getPayload());
                    break;
                case CHAIN_DATA_ANCHORING:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeChainDataAnchoring)tx).getAnchoredData());
                    break;  
                default:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom());
                    break;
            }
            return raw;
        }

        else {
            switch (type) {
                case FEE_DELEGATED_CANCEL:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getFrom());                            
                    break;
                case FEE_DELEGATED_CANCEL_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedCancelWithRatio) tx).getFeeRatio());                            
                    break;
                case FEE_DELEGATED_SMART_CONTRACT_DEPLOY:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedSmartContractDeploy)tx).getPayload(),
                        ((TxTypeFeeDelegatedSmartContractDeploy)tx).getCodeFormat());                            
                    break;
                case FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedSmartContractDeployWithRatio)tx).getPayload(),
                        ((TxTypeFeeDelegatedSmartContractDeployWithRatio)tx).getCodeFormat(),
                        ((TxTypeFeeDelegatedSmartContractDeployWithRatio)tx).getFeeRatio());                            
                    break;
                case FEE_DELEGATED_SMART_CONTRACT_EXECUTION:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedSmartContractExecution)tx).getPayload());                            
                    break;
                case FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedSmartContractExecution)tx).getPayload(),
                        ((TxTypeFeeDelegatedSmartContractExecution)tx).getFeeRatio());                            
                    break;
                case FEE_DELEGATED_VALUE_TRANSFER:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom());
                    break;
                case FEE_DELEGATED_VALUE_TRANSFER_MEMO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedValueTransferMemoWithRatio)tx).getPayload());
                    break;
                case FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedValueTransferWithRatio)tx).getFeeRatio());
                    break;
                case FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedValueTransferMemoWithRatio)tx).getPayload(),
                        ((TxTypeFeeDelegatedValueTransferMemoWithRatio)tx).getFeeRatio());
                    break;
                case FEE_DELEGATED_CHAIN_DATA_ANCHORING_WITH_RATIO:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedChainDataAnchoring)tx).getAnchoredData());
                    break;  
                case FEE_DELEGATED_CHAIN_DATA_ANCHORING:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom(),
                        ((TxTypeFeeDelegatedChainDataAnchoring)tx).getAnchoredData(),
                        ((TxTypeFeeDelegatedChainDataAnchoring)tx).getFeeRatio());
                    break;  
                default:
                    raw = KaiaRawTransaction.createTransaction(
                        chainId,
                        type,
                        nonce,
                        gasPrice,
                        tx.getGasLimit(),
                        tx.getTo(),
                        tx.getValue(),
                        tx.getFrom());
                    break;
            }
            return raw;
        }
    }

}
