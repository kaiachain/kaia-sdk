package org.web3j.example.utils;

import org.web3j.crypto.transaction.account.AccountKeyPublic;
import org.web3j.utils.AccountKeyPublicUtils;


public class PublicKeyUtilsExample {
    public static void main(String[] args) {

        System.out.println("From compressed public key to AccountKeyPublic");
        System.out.println(AccountKeyPublicUtils.decompressKey("03dc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd"));

        System.out.println("From x,y to compressed public key");
        AccountKeyPublic publicKey= AccountKeyPublic.create("0xdc9dccbd788c00fa98f7f4082f2f714e799bc0c29d63f04d48b54fe6250453cd","0xaf06ca34ae8714cf3dae06bacdb78c7c2d4054bd38961d40853cd5f15955da79");
        System.out.println(AccountKeyPublicUtils.toCompressedPublicKey(publicKey.getPublicKey()));
    }
}
