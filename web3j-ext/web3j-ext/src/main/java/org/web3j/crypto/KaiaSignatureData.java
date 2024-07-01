/*
 * Modifications copyright 2019 The caver-java Authors
 * Copyright 2016 Conor Svensson
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This file is derived from web3j/core/src/main/java/org/web3j/crypto/Sign.java (2019/06/13).
 * Modified and improved for the caver-java development.
 */

package org.web3j.crypto;

import org.web3j.rlp.RlpList;
import org.web3j.rlp.RlpString;
import org.web3j.rlp.RlpType;
import org.web3j.utils.Bytes;
import org.web3j.utils.BytesUtils;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class KaiaSignatureData {
    private byte[] v;
    private byte[] r;
    private byte[] s;

    public KaiaSignatureData() {
    }

    public KaiaSignatureData(byte[] v, byte[] r, byte[] s) {
        this.v = v;
        this.r = r;
        this.s = s;
    }

    public static KaiaSignatureData getEmptySignature() {
        KaiaSignatureData emptySig = new KaiaSignatureData(
                Numeric.hexStringToByteArray("0x01"),
                Numeric.hexStringToByteArray("0x"),
                Numeric.hexStringToByteArray("0x"));

        return emptySig;
    }

    public static List<KaiaSignatureData> decodeSignatures(List<RlpType> signatureRlpTypeList) {
        List<KaiaSignatureData> signatureDataList = new ArrayList<>();

        for (RlpType signature : signatureRlpTypeList) {
            List<RlpType> vrs = ((RlpList) signature).getValues();
            if (vrs.size() < 3)
                continue;
            byte[] v = ((RlpString) vrs.get(0)).getBytes();
            byte[] r = ((RlpString) vrs.get(1)).getBytes();
            byte[] s = ((RlpString) vrs.get(2)).getBytes();
            signatureDataList.add(new KaiaSignatureData(v, r, s));
        }

        return signatureDataList;
    }

    public byte[] getV() {
        return v;
    }

    public byte[] getR() {
        return r;
    }

    public byte[] getS() {
        return s;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KaiaSignatureData that = (KaiaSignatureData) o;

        if (!Arrays.equals(v, that.v)) {
            return false;
        }
        if (!Arrays.equals(r, that.r)) {
            return false;
        }
        return Arrays.equals(s, that.s);
    }

    @Override
    public int hashCode() {
        int result = Arrays.hashCode(v);
        result = 31 * result + Arrays.hashCode(r);
        result = 31 * result + Arrays.hashCode(s);
        return result;
    }

    @Override
    public String toString() {
        return "V : " + Numeric.toBigInt(getV()) + "\nR : " + Numeric.toBigInt(getR()) + "\nS : "
                + Numeric.toBigInt(getS());
    }

    public static KaiaSignatureData createKaiaSignatureDataFromChainId(long chainId) {
        return new KaiaSignatureData(BigInteger.valueOf(chainId).toByteArray(), new byte[] {}, new byte[] {});
    }

    public RlpList toRlpList() {
        return new RlpList(
                RlpString.create(Bytes.trimLeadingZeroes(getV())),
                RlpString.create(Bytes.trimLeadingZeroes(getR())),
                RlpString.create(Bytes.trimLeadingZeroes(getS())));
    }

    public static KaiaSignatureData createEip155KaiaSignatureData(
            Sign.SignatureData signatureData, long chainId) {
        long v = (Numeric.toBigInt(signatureData.getV()).intValue() + chainId * 2) + 8;
        return new KaiaSignatureData(BigInteger.valueOf(v).toByteArray(), signatureData.getR(), signatureData.getS());
    }

    public static byte[] getKaiaMessageHash(String message) {
        final String preamble = "\u0019Klaytn Signed Message:\n";

        byte[] messageArr = BytesUtils.isHexStrict(message) ? Numeric.hexStringToByteArray(message)
                : message.getBytes();
        byte[] preambleArr = preamble.concat(String.valueOf(messageArr.length)).getBytes();

        // kaiaMessage is concatenated array (preambleArr + messageArr)
        byte[] kaiaMessage = BytesUtils.concat(preambleArr, messageArr);
        byte[] result = Hash.sha3(kaiaMessage);

        // return data after converting to hex string.
        return result;
    }

    public static Sign.SignatureData signPrefixedMessage(String message, KaiaCredentials cred) {
        byte[] messageBytes = getKaiaMessageHash(message);
        return Sign.signMessage(messageBytes, cred.getEcKeyPair(), false);
    }

    public static String getSignatureString(Sign.SignatureData signature) {
        byte[] retval = new byte[65];
        System.arraycopy(signature.getR(), 0, retval, 0, 32);
        System.arraycopy(signature.getS(), 0, retval, 32, 32);
        System.arraycopy(signature.getV(), 0, retval, 64, 1);
        return Numeric.toHexString(retval);
    }
}
