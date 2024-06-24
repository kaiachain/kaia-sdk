const ethers = require("ethers6");

const { Wallet } = require("@klaytn/ethers-ext/v6");

const senderAddr = "0xcb0eb737dfda52756495a5e08a9b37aab3b271da";
const senderPriv =
  "0x9435261ed483b6efa3886d6ad9f64c12078a0e28d8d80715c773e16fc000cff4";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-baobab.klaytn.net"
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
const bytecode =
  "0x608060405234801561001057600080fd5b5060405161031a38038061031a8339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b610264806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633fb5c1cb146100465780638381f58a14610062578063d09de08a14610080575b600080fd5b610060600480360381019061005b9190610160565b61008a565b005b61006a6100cd565b604051610077919061019c565b60405180910390f35b6100886100d3565b005b806000819055507f331bb01bcf77ec721a35a558a7984e8e6ca33b507d3ee1dd13b76f64381e54d46000546040516100c2919061019c565b60405180910390a150565b60005481565b6000808154809291906100e5906101e6565b91905055507f331bb01bcf77ec721a35a558a7984e8e6ca33b507d3ee1dd13b76f64381e54d460005460405161011b919061019c565b60405180910390a1565b600080fd5b6000819050919050565b61013d8161012a565b811461014857600080fd5b50565b60008135905061015a81610134565b92915050565b60006020828403121561017657610175610125565b5b60006101848482850161014b565b91505092915050565b6101968161012a565b82525050565b60006020820190506101b1600083018461018d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101f18261012a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610223576102226101b7565b5b60018201905091905056fea264697066735822122012162749eb9714a6df7a34741c39edb78cf6e3d6d3e888872232594da5a1353164736f6c63430008120033";
const abi =
  '[{"inputs":[{"internalType":"uint256","name":"initNumber","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"number","type":"uint256"}],"name":"SetNumber","type":"event"},{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"number","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newNumber","type":"uint256"}],"name":"setNumber","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

async function main() {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(100);

  const deployedContract = await contract.waitForDeployment();
  const receipt = await deployedContract.deploymentTransaction();
  console.log("receipt", receipt);
  console.log("deployed address", await deployedContract.getAddress());
}

main();
