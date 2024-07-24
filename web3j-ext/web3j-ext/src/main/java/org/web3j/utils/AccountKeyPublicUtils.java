package org.web3j.utils;

import java.math.BigInteger;

import org.bouncycastle.asn1.x9.X9ECParameters;
import org.bouncycastle.asn1.x9.X9IntegerConverter;
import org.bouncycastle.crypto.ec.CustomNamedCurves;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.math.ec.ECPoint;
import org.web3j.crypto.transaction.account.AccountKeyPublic;

public class AccountKeyPublicUtils {

    public static final X9ECParameters CURVE_PARAMS = CustomNamedCurves.getByName("secp256k1");
    static final ECDomainParameters CURVE = new ECDomainParameters(
            CURVE_PARAMS.getCurve(), CURVE_PARAMS.getG(), CURVE_PARAMS.getN(), CURVE_PARAMS.getH());

    public static String toCompressedPublicKey(BigInteger publicKey) {
        String hexStringPublicKey = Numeric.toHexStringNoPrefixZeroPadded(publicKey, 128);
        String publicKeyX = hexStringPublicKey.substring(0, 64);
        String pubKeyYPrefix = publicKey.testBit(0) ? "03" : "02";
        return pubKeyYPrefix + publicKeyX;
    }

    public static AccountKeyPublic decompressKey(String compressedPublicKey) {
        boolean yBit = Numeric.cleanHexPrefix(compressedPublicKey).substring(0, 2).equals("03");
        BigInteger xBN = Numeric.toBigInt(compressedPublicKey.substring(2));
        X9IntegerConverter x9 = new X9IntegerConverter();
        byte[] compEnc = x9.integerToBytes(xBN, 1 + x9.getByteLength(CURVE.getCurve()));
        compEnc[0] = (byte) (yBit ? 0x03 : 0x02);
        ECPoint ecPoint = CURVE.getCurve().decodePoint(compEnc);
        return AccountKeyPublic.create(
                Numeric.toHexStringWithPrefixZeroPadded(ecPoint.getAffineXCoord().toBigInteger(), 64),
                Numeric.toHexStringWithPrefixZeroPadded(ecPoint.getAffineYCoord().toBigInteger(), 64));
    }
}
