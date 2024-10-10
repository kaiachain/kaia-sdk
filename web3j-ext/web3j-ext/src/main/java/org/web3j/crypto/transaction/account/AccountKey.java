/*
 * Copyright 2019 The caver-java Authors
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
 */

package org.web3j.crypto.transaction.account;

/**
 * An account key represents the key structure associated with an account.
 */
public interface AccountKey {
    Type getType();

    byte[] toRlp();

    enum Type {
        NIL((byte) 0x0, AccountKeyNil.class),
        LEGACY((byte) 0x01, AccountKeyLegacy.class),
        PUBLIC((byte) 0x02, AccountKeyPublic.class),
        FAIL((byte) 0x03, AccountKeyFail.class),
        MULTISIG((byte) 0x04, AccountKeyWeightedMultiSig.class),
        ROLEBASED((byte) 0x05, AccountKeyRoleBased.class);

        private byte value;
        private Class keyClass;

        Type(byte value, Class keyClass) {
            this.value = value;
            this.keyClass = keyClass;
        }

        public byte getValue() {
            return value;
        }

        public Class getKeyClass() {
            return keyClass;
        }

        public static AccountKey.Type findByValue(byte value) {
            for (AccountKey.Type v : values()) {
                if (v.getValue() == value) {
                    return v;
                }
            }
            return PUBLIC;
        }
    }
}
