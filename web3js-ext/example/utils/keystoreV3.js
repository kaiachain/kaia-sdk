const { Web3 } = require("@kaiachain/web3js-ext");

const provider = new Web3.providers.HttpProvider("https://public-en-baobab.klaytn.net");
const web3 = new Web3(provider);

// Web3 V3. web3.eth.accounts.create(1).encrypt("password")
const encryptedKey = `{
    "address": "029e786304c1531af3ac7db24a02448e543a099e",
    "id": "9d492c95-b9e3-42e3-af73-5c77e932208d",
    "version": 3,
    "crypto": {
      "cipher": "aes-128-ctr",
      "cipherparams": {"iv": "bfcb88a1501e2bb1e6694c03da18953d"},
      "ciphertext": "076510b4e25d5cfc31239bffcad6036fe543cbbb04b9f3ec719bf4f61b58fc05",
      "kdf": "scrypt",
      "kdfparams": {
        "salt": "79124f05995aae98b3088d8365f59a6dfadd1c9ed249abae3c07733f4cbbee53",
        "n": 131072,
        "dklen": 32,
        "p": 1,
        "r": 8
      },
      "mac": "d70f83824c2c30dc5cd3a244d87147b6aa713a6000165789a82a467651284ac7"
    }
  }`;
// const address = "0x029e786304c1531aF3aC7db24A02448e543A099E";
// const key = "0x1b33a48f58d8c85ab142a7375fcf18714d88271f6647cfa6b54f1be66b05a762";

const password = "password";
const password2 = "password2";

async function main() {
  const accounts = await web3.eth.accounts.wallet.decrypt([JSON.parse(encryptedKey)], password);

  console.log("\ndecrypted address");
  console.log(accounts[0].address);

  console.log("\ndecrypted privateKey");
  console.log(accounts[0].privateKey);

  const encryptedKey2 = await web3.eth.accounts.wallet.encrypt(password2);

  // Delete account before adding the same account already existing in the wallet.
  web3.eth.accounts.wallet.remove(encryptedKey2[0].address);

  const accounts2 = await web3.eth.accounts.wallet.decrypt(encryptedKey2, password2);

  console.log("\ndecrypted address with new password");
  console.log(accounts2[0].address);

  console.log("\ndecrypted privateKey with new password");
  console.log(accounts2[0].privateKey);
}

main();