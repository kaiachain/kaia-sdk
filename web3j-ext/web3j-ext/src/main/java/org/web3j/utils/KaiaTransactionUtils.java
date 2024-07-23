package org.web3j.utils;

import java.util.Arrays;

import org.web3j.crypto.transaction.type.TxType;

public class KaiaTransactionUtils {

    public static TxType.Type getType(byte[] rawTransaction) {
        return TxType.Type.findByValue(rawTransaction[0]);
    }

    public static TxType.Type getType(String rawTransaction) {
        return getType(Numeric.hexStringToByteArray(Numeric.cleanHexPrefix(rawTransaction)));
    }

    public static byte[] getRawTransactionNoType(byte[] rawTransaction) {
        return Arrays.copyOfRange(rawTransaction, 1, rawTransaction.length);
    }
}