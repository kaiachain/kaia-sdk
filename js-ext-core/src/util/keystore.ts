// js-ext-core does not provide keystore decryption function
// to make the library slim. Decrypting the splitted keystore JSON
// shall be done outside this library.

import { flattenDepth, isArray, isNumber, map } from "lodash-es";

// Cipher is an opaque structure to be passed down to decryption library.
type EncryptedKey = any;

// The V3 keystore defined in https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
// or https://ethereum.org/en/developers/docs/data-structures-and-encoding/web3-secret-storage/
interface KeystoreV3 {
  version: number,
  crypto: EncryptedKey,
  address?: string,
  id?: string,
}

// The V4 keystore defined in KIP-3 (https://github.com/klaytn/kips/blob/main/KIPs/kip-3.md)
// It's not named "V4" because EIP-2335 keystore is also version 4 (https://eips.ethereum.org/EIPS/eip-2335)
interface KeystoreKIP3 {
  version: number,
  keyring: EncryptedKey[] | EncryptedKey[][],
  address?: string,
  id?: string,
}

// Split a KIP-3 JSON into multiple V3 JSONs, each V3 is derived from one keyring element.
//
// The address may not coincide with the decrypted private key. There are two ways
// to deal with the issue.
//
// If deleteAddress is true, every resulting V3 JSON does not contain 'address' field.
// It is recommended to deleteAddress when feeding into ethers.js decryptKeystore function.
// When the address field exists, decryptKeystore tries to match the address and private key,
// resulting in "address mismatch" error. Without the address field, decryptKeystore skips the check.
//
// If deleteAddress is false, every resulting V3 JSON has the same 'address' field
// with the original KIP-3 JSON. It is recommended to not deleteAddress when feeding into
// web3.js decrypt function. The web3.js decrypt function requires, but not inspects the
// address field.
export function splitKeystoreKIP3(json: string, deleteAddress: boolean = true): string[] {
  const data: KeystoreKIP3 = JSON.parse(json);
  const keyring = data.keyring;
  if (!isArray(keyring)) {
    throw new Error("Invalid KIP-3 JSON wallet");
  }

  let cryptos: any[] = [];
  if (!isArray(keyring[0])) {
    cryptos = flattenDepth(keyring, 1);
  } else {
    cryptos = flattenDepth(keyring, 2);
  }

  return map(cryptos, (crypto) => {
    const v3: KeystoreV3 = {
      version: 3,
      crypto: crypto,
      address: data.address,
      id: data.id,
    };

    if (deleteAddress) {
      delete v3.address;
    }

    return JSON.stringify(v3);
  });
}

// Analogous to isKeystoreWallet in @ethersproject/json-wallets,
// isKIP3Wallet determines if it's a KIP-3 wallet.
export function isKIP3Json(json: string): boolean {
  let data: any = null;
  try {
    data = JSON.parse(json);
  } catch {
    return false;
  }
  return isNumber(data.version) && (data.version == 4) && isArray(data.keyring);
}
