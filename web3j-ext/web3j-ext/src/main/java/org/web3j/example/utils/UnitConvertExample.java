package org.web3j.example.utils;

import org.web3j.utils.KaiaConvert;

public class UnitConvertExample {
    public static void main(String[] args) {
        System.out.println("Convert from kei to kaia " + KaiaConvert.fromKei("1000000000000000000", KaiaConvert.Unit.KAIA));
        System.out.println("Convert from Gkei to kaia " + KaiaConvert.fromKei("1000000000", KaiaConvert.Unit.GKEI));

        System.out.println("Convert from kaia to kei " + KaiaConvert.toKei("1", KaiaConvert.Unit.KAIA));
    }
}
