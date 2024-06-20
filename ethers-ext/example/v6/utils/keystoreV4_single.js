const {
  Wallet
} = require("@klaytn/ethers-ext");

// Klaytn V4 with one key. kcn account new --lightkdf
const encryptedKey = `{
  "address":"ec5eaa07b4d3cbafe7bf437a1ea9a898209f617c",
  "keyring":[
    [
      {
        "cipher":"aes-128-ctr",
        "ciphertext":"0a5aa3749b9e83c2a4238445aeb66f59355c0363a54c163e34e454f76e061e47",
        "cipherparams":{"iv":"2a0b2e02a61e0f721bd800ea6e23a588"},
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"n":4096,"p":6,"r":8,"salt":"538ead57745bcd946b05fe294de08256628d9a0a393fd29ced933ba5fc045b07"},
        "mac":"30b5488bc97165bc7ecac8ff8dfec65a75a8ad206450aecff0ac2dfea6f79b08"
      }
    ]
  ],
  "id":"362c0766-f5e3-4b4d-af22-7e89d5fb613a",
  "version":4
}`;
const password = "password";
// const address = "0xEc5eAa07b4d3CbAfe7bf437a1Ea9A898209F617c";
// const key = "0x4062512193ef1dab8ccf3e3d7a4862e3c740bdf11d852954ed48bc73643e354f";

async function main() {
  const account = Wallet.fromEncryptedJsonSync(encryptedKey, password);

  console.log("decrypted address");
  console.log(account.address);

  console.log("\ndecrypted privateKey");
  console.log(account.privateKey);
}

main();