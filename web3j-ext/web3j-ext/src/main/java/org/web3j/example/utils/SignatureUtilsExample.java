package org.web3j.example.utils;


import org.web3j.crypto.KaiaSignatureData;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

public class SignatureUtilsExample {
    public static void main(String[] args) {
        // convert from {r, s, v} signature to string
        byte[] r = Numeric.hexStringToByteArray("0xbaabb5a43a047e75e41a77b88fa7a5bf89e5227f1c8e40bfdfbcceb8164521ed");
        byte[] s = Numeric.hexStringToByteArray("0x678f3a7b600169b800828065cda112aa28291311a5dbb729480444a2b905f6e6");
        byte[] v = Numeric.hexStringToByteArray("0x0");
        Sign.SignatureData obj = new Sign.SignatureData(v, r, s);
        String signature = KaiaSignatureData.getSignatureString(obj);

        System.out.println("From {r, s, v} to string " + signature);

        // convert from signature string to {r, s, v}
        byte[] signatureBytes = Numeric.hexStringToByteArray("0xbaabb5a43a047e75e41a77b88fa7a5bf89e5227f1c8e40bfdfbcceb8164521ed678f3a7b600169b800828065cda112aa28291311a5dbb729480444a2b905f6e600");

        byte[] convertedR = new byte[32];
        byte[] convertedS = new byte[32];
        byte[] convertedV= new byte[1];

        // r is the first 32 bytes
        System.arraycopy(signatureBytes, 0, convertedR, 0, 32);
        // s is the next 32 bytes
        System.arraycopy(signatureBytes, 32, convertedS, 0, 32);
        // v is the last byte
        convertedV[0] = signatureBytes[64];

        System.out.println("Converted R " + Numeric.toHexString(convertedR));
        System.out.println("Converted S " + Numeric.toHexString(convertedS));
        System.out.println("Converted V " + Numeric.toHexString(convertedV));
    }
}
