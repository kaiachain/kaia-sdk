const ethers = require("ethers6");

const { Wallet, TxType } = require("@kaiachain/ethers-ext/v6");
const senderAddr = "0xcb0eb737dfda52756495a5e08a9b37aab3b271da";
const senderPriv =
  "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);
const wallet = new Wallet(senderPriv, provider);

/* compiled in remix.ethereum.org (compiler: 0.8.18, optimizer: false)
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;
    event SetNumber(uint256 number);

    constructor(uint256 initNumber) {
        number = initNumber;
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
        emit SetNumber(number);
    }

    function increment() public {
        number++;
        emit SetNumber(number);
    }
}
*/
const abi =
  '[{"inputs":[{"internalType":"uint256","name":"initNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"number","type":"uint256"}],"name":"SetNumber","type":"event"},{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";

async function main() {
  const counter = new ethers.Contract(contractAddr, abi, wallet);

  console.log("number before", (await counter.number()).toString());

  const data = (await counter.getFunction("increment")()).data;
  const tx = {
    type: TxType.SmartContractExecution,
    from: senderAddr,
    to: contractAddr,
    value: 0,
    data: data,
  };

  const sentTx = await wallet.sendTransaction(tx);
  console.log("sentTx", sentTx.hash);

  const receipt = await sentTx.wait();
  console.log("receipt", receipt);

  console.log("number after", (await counter.number()).toString());
}

main();
