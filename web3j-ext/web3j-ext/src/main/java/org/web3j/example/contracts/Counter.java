package org.web3j.example.contracts;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>
 * Auto generated code.
 * <p>
 * <strong>Do not modify!</strong>
 * <p>
 * Please use the <a href="https://docs.web3j.io/command_line.html">web3j
 * command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen
 * module</a> to update.
 *
 * <p>
 * Generated with web3j version 1.4.2.
 */
@SuppressWarnings("rawtypes")
public class Counter extends Contract {
    public static final String BINARY = "608060405234801561001057600080fd5b506040516101df3803806101df83398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b6101808061005f6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633fb5c1cb146100465780638381f58a1461005b578063d09de08a14610076575b600080fd5b61005961005436600461010a565b61007e565b005b61006460005481565b60405190815260200160405180910390f35b6100596100b9565b60008190556040518181527f331bb01bcf77ec721a35a558a7984e8e6ca33b507d3ee1dd13b76f64381e54d49060200160405180910390a150565b6000805490806100c883610123565b91905055507f331bb01bcf77ec721a35a558a7984e8e6ca33b507d3ee1dd13b76f64381e54d460005460405161010091815260200190565b60405180910390a1565b60006020828403121561011c57600080fd5b5035919050565b60006001820161014357634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220f91bec736773721934846fd0ee0f44b6c7363b850d33f559cab8baff7007a33264736f6c63430008120033\n";

    public static final String FUNC_INCREMENT = "increment";

    public static final String FUNC_NUMBER = "number";

    public static final String FUNC_SETNUMBER = "setNumber";

    public static final Event SETNUMBER_EVENT = new Event("SetNumber",
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {
            }));;

    @Deprecated
    protected Counter(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice,
            BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Counter(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Counter(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice,
            BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Counter(String contractAddress, Web3j web3j, TransactionManager transactionManager,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<SetNumberEventResponse> getSetNumberEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(SETNUMBER_EVENT,
                transactionReceipt);
        ArrayList<SetNumberEventResponse> responses = new ArrayList<SetNumberEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            SetNumberEventResponse typedResponse = new SetNumberEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.number = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<SetNumberEventResponse> setNumberEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, SetNumberEventResponse>() {
            @Override
            public SetNumberEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(SETNUMBER_EVENT, log);
                SetNumberEventResponse typedResponse = new SetNumberEventResponse();
                typedResponse.log = log;
                typedResponse.number = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<SetNumberEventResponse> setNumberEventFlowable(DefaultBlockParameter startBlock,
            DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(SETNUMBER_EVENT));
        return setNumberEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> increment() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_INCREMENT,
                Arrays.<Type>asList(),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> number() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NUMBER,
                Arrays.<Type>asList(),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {
                }));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> setNumber(BigInteger newNumber) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETNUMBER,
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(newNumber)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Counter load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice,
            BigInteger gasLimit) {
        return new Counter(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Counter load(String contractAddress, Web3j web3j, TransactionManager transactionManager,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new Counter(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Counter load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new Counter(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Counter load(String contractAddress, Web3j web3j, TransactionManager transactionManager,
            ContractGasProvider contractGasProvider) {
        return new Counter(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Counter> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider, BigInteger initNumber) {
        String encodedConstructor = FunctionEncoder
                .encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initNumber)));
        return deployRemoteCall(Counter.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<Counter> deploy(Web3j web3j, TransactionManager transactionManager,
            ContractGasProvider contractGasProvider, BigInteger initNumber) {
        String encodedConstructor = FunctionEncoder
                .encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initNumber)));
        return deployRemoteCall(Counter.class, web3j, transactionManager, contractGasProvider, BINARY,
                encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Counter> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice,
            BigInteger gasLimit, BigInteger initNumber) {
        String encodedConstructor = FunctionEncoder
                .encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initNumber)));
        return deployRemoteCall(Counter.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Counter> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice,
            BigInteger gasLimit, BigInteger initNumber) {
        String encodedConstructor = FunctionEncoder
                .encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(initNumber)));
        return deployRemoteCall(Counter.class, web3j, transactionManager, gasPrice, gasLimit, BINARY,
                encodedConstructor);
    }

    public static class SetNumberEventResponse extends BaseEventResponse {
        public BigInteger number;
    }
}
