const {
  Wallet
} = require("@klaytn/ethers-ext");

// Klaytn V4 with multiple role-based keys. https://toolkit.klaytn.foundation/misc/generateKeystore
const encryptedKey = `{
  "version": 4,
  "id":"2d7ad5c1-880f-4920-9b8e-51f852c4802c",
  "address":"0x17226c9b4e130551c258eb7b1cdc927c13998cd6",
  "keyring":[
    [
      {
        "ciphertext":"eb9bd884ac3cc8bf92e6b0082e9d07198bfc4c1223ccc6e5edf7452ad612b2b5",
        "cipherparams":{"iv":"47faf7b0991a051eef698c73fc246f78"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"ba0a3e8dc49a04f8e590f8df5a590bc6e134b031ce10f46d73d4c459aa4c08f8","n":4096,"r":8,"p":1},
        "mac":"4978d7325e1b9b3ec9fdfd1ec709a5a86fdfade0297ea9ddeeb8c3a7a62ae898"
      }
    ],
    [
      {
        "ciphertext":"1a80c8666bea1a8dfa3082b001ff64c818fb14cf4e02017785e0edcc7a277af4",
        "cipherparams":{"iv":"eafbecc65ccc177a5579bf56d5f4ed31"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"6472845219e11e4de094cac8c32a6a4d13e69cd4507780a7a37f5e411e1d895d","n":4096,"r":8,"p":1},
        "mac":"86379236d2fd6e9bb3f99f7eebaa3325b51e9fa5ec150ade7a461555c0a14ca3"
      },
      {
        "ciphertext":"0071c41d2956b12be5ebc08a9a5b3a9684b9e410fe2de91d614be977fb2a0bdb",
        "cipherparams":{"iv":"1492dfb771030d3d9c9d996c193c03e5"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"f8145aa907a649866e0fbff86011244584ddc86559cf4901f8f69b670c234fd7","n":4096,"r":8,"p":1},
        "mac":"eacc58c1ad717ca375697c9fcc80f463a26600f5da1b21327715bf3efa047be5"
      }
    ],
    [
      {
        "ciphertext":"68ffc1e2800a7288ba7baba0f0f8049daeed05379fabfdd3bc017fa85c49ab50",
        "cipherparams":{"iv":"17f22d7b8aa1a8a2948fd3629f0b89ed"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"ff5e577ec8294320cfe59ef7b1b01ee44d4c9f19c8fbc31f333059c74eb8c6d2","n":4096,"r":8,"p":1},
        "mac":"de65d669be044df5e39e678b099424a8692a2da6f3746832862cf2e5d6ada612"
      },
      {
        "ciphertext":"fd4810ee850f0aa5f61a2eafbfc5ca36cfebb42df5c2465cc8ae5188029b188b",
        "cipherparams":{"iv":"b00ead13b38e449c268d09fced80ce49"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"af5dbbfb7383045dc7f8a3bfc56cccfc22a5150a1f87e454d40893a4b6fea9a1","n":4096,"r":8,"p":1},
        "mac":"6234352852eb18246b94f28f3c3454103289ecf2faaa91115927c53729bb0805"
      },
      {
        "ciphertext":"03b758de6372aa6bedde513ccb282bf8af32bca227c258f3e0fc85ce454d72a4",
        "cipherparams":{"iv":"5c20f3e96d0802eaf56670e57fbe3e98"},
        "cipher":"aes-128-ctr",
        "kdf":"scrypt",
        "kdfparams":{"dklen":32,"salt":"b5ec4e40f5a09a59e90317ce45eb7bcd73a2a9afe70f6f2e32548fd38ed2da3b","n":4096,"r":8,"p":1},
        "mac":"99b7f59855f0aa04531cc4a24c7923f75ed8052084de9ec49a2794e3899c3274"
      }
    ]
  ]
}`;
const password = "password";
// const address = "0x17226c9B4e130551c258Eb7B1Cdc927c13998cd6";
const keys = [
  "0x278c3d035328daf04ab2597da96dd2d8868fd61a8837030f7d8a85f27b7f1bad",
  "0xa06d13800719307ea7e2503ea441c2ea49279d0d600a2eec2887b50928869676", "0xc32f4007ffad303db99dee0d79a720e1d70c4b2babf8e33cb28170a16bac467d",
  "0xc274d13302891d0d91a60891a48fde8c2860018f8dcb6293dcc0b28a238590b0", "0x83c127e5207b70086a702c93f1c9a041f15ce49ee5183ce848f35c64de196eff", "0x48f97204ac4886dfbd819ada04ea31a730c6fc43fcb08900566360ee7402f93b"];

async function main() {
  const account = Wallet.fromEncryptedJsonListSync(encryptedKey, password);

  console.log("decrypted address");
  console.log(account[0].klaytnAddr);

  var privateKeyList = [];
  for (const i in keys) {
    privateKeyList.push(account[i].privateKey);
  }
  console.log("\ndecrypted privateKeyList");
  console.log(privateKeyList);
}

main();