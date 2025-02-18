import { has, isArray, map } from "lodash-es";
import { AccountKeyType } from "./const";
import { getCompressedPublicKey } from "./ec";
import { WeightedPublicKey } from "../field";
import { HexStr, RLP } from "./data";

export const getWeightedPublicKeyRLP = (tupleOrObject: any) => {
    if (isArray(tupleOrObject) && tupleOrObject.length == 2) {
        const tuple = tupleOrObject;
        return [
            HexStr.fromNumber(tuple[0]),
            getCompressedPublicKey(tuple[1])
        ] as WeightedPublicKey;
    } else if (has(tupleOrObject, "weight") && has(tupleOrObject, "key")) {
        const object: any = tupleOrObject;
        return [
            HexStr.fromNumber(object.weight),
            getCompressedPublicKey(object.key)
        ] as WeightedPublicKey;
    } else {
        throw new Error("Malformed WeightedPublicKeys");
    }
}
export const convertKeysToRLP = ({ key, keys, type, threshold }: { type: AccountKeyType, key?: string, keys?: string[] | object[], threshold?: number }): string => {

    if (isArray(keys)) {
        switch (Number(type)) {
            case AccountKeyType.WeightedMultiSig:
                return RLP.encode([HexStr.from(threshold), map(keys, (tupleOrObject) => getWeightedPublicKeyRLP(tupleOrObject))])
            case AccountKeyType.RoleBased:
                return RLP.encode(map(keys, ({ key, keys, type, threshold }: any) =>
                    GetHexlifyRLP(type, convertKeysToRLP({ type, key, keys, threshold }))
                ))
        }
    } else {
        switch (Number(type)) {
            case AccountKeyType.Fail:
                return "0x03c0"
            case AccountKeyType.Legacy:
                return "0x01c0"
            case AccountKeyType.Nil:
                return "0x80"
            case AccountKeyType.Public:
                return RLP.encode(getCompressedPublicKey(key))
        }
    }
    throw new Error("Invalid account key type")
}


export const GetHexlifyRLP = (type: AccountKeyType, rawRLP: string) => {
    switch (type) {
        case AccountKeyType.RoleBased:
            return HexStr.concat(HexStr.from(AccountKeyType.RoleBased), rawRLP);
        case AccountKeyType.WeightedMultiSig:
            return HexStr.concat(HexStr.from(AccountKeyType.WeightedMultiSig), rawRLP);
        case AccountKeyType.Public:
            return HexStr.concat(HexStr.from(AccountKeyType.Public), rawRLP);
    }
    return rawRLP
}

export const decodeObjectFromRLP = (rlp: string): { type: AccountKeyType, key?: string, threshold?: number, keys?: object[] } => {
    const type = HexStr.toNumber(rlp.substring(0, 4));
    switch (type) {
        case AccountKeyType.RoleBased:
            {
                const roleBasedInnerKeys = RLP.decode('0x' + rlp.substring(4))
                return {
                    type: AccountKeyType.RoleBased,
                    keys: map(roleBasedInnerKeys, (key) => decodeObjectFromRLP(key))
                }
            }
        case AccountKeyType.WeightedMultiSig:
            {
                const [threshold, keys] = RLP.decode('0x' + rlp.substring(4))
                return {
                    type: AccountKeyType.WeightedMultiSig,
                    threshold: Number(threshold),
                    keys: map(keys, ([weight, innerKey]) => ({ weight: Number(weight), key: innerKey }))
                }
            }
        case AccountKeyType.Public:
            return {
                type: AccountKeyType.Public,
                key: RLP.decode("0x" + String(rlp).substring(4))
            }
        case AccountKeyType.Nil:
            return {
                type: AccountKeyType.Nil,
                key: "0x80"
            }
        case AccountKeyType.Legacy:
            return {
                type: AccountKeyType.Legacy,
                key: "0x03c0"
            }
        case AccountKeyType.Fail:
            return {
                type: AccountKeyType.Fail,
                key: "0x03c0"
            }
    }
    throw new Error("Parse Account Key from RLP errors: Invalid Account key type!")
}