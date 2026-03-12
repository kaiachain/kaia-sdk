// Blob Transaction (Type 3)
// https://docs.kaia.io/docs/learn/transactions/
// Implemented per KIP-279 based on EIP-4844 and EIP-7594.
//
// Blob transactions carry large data blobs for rollups and data availability.
// Each blob is 32 * 4096 = 131072 bytes. Each 32-byte field element must have
// byte[0] < BLS12-381 modulus, so only 31 bytes per element are usable for data.
//
// Prerequisites: npm install kzg-wasm

const ethers = require("ethers6");

const { Wallet } = require("@kaiachain/ethers-ext/v6");
const { loadKZG } = require("kzg-wasm");

const senderAddr = "0xa2a8854b1802d8cd5de631e690817c253d6a9153";
const senderPriv =
  "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6c2462c597458c2b8";

const provider = new ethers.JsonRpcProvider(
  "https://public-en-kairos.node.kaia.io"
);
const wallet = new Wallet(senderPriv, provider);

const contractAddr = "0x95Be48607498109030592C08aDC9577c7C2dD505";

async function main() {
  // Load the KZG library (WASM-based, works in Node.js and browsers)
  const kzg = await loadKZG();

  // Build a valid blob: 32 bytes per field element * 4096 elements = 131072 bytes.
  // Encode arbitrary data into 31 usable bytes per element (byte[0] is set to 0x00).
  // Your application (e.g. an L2 stack) might produce already-compliant blobs.
  const blob = new Uint8Array(32 * 4096);
  const data = ethers.toUtf8Bytes(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. " +
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. " +
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
  );
  for (let i = 0; i < data.length; i++) {
    const fieldElement = Math.floor(i / 31);
    const byteOffset = i % 31;
    blob[fieldElement * 32 + 1 + byteOffset] = data[i];
  }

  // Compute KZG commitment and cell proofs (EIP-7594)
  const blobHex = ethers.hexlify(blob);
  const commitment = kzg.blobToKZGCommitment(blobHex);
  const proof = ethers.concat(kzg.computeCellsAndKZGProofs(blobHex).proofs);

  const feeData = await provider.getFeeData();
  const nonce = await provider.getTransactionCount(wallet.getAddress());

  const tx = {
    type: 3,
    to: contractAddr,
    value: ethers.parseEther("0"),
    gasLimit: 50000,
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    maxFeePerGas: feeData.maxFeePerGas,
    data: "0xd09de08a",
    nonce: nonce,
    chainId: 1001,
    accessList: [],
    maxFeePerBlobGas: 400_000_000_000,
    blobWrapperVersion: 1,
    blobs: [{ data: blobHex, commitment: commitment, proof: proof }],
  };

  // Sign and send via eth_sendRawTransaction
  const rawTx = await wallet.signTransaction(tx);
  const txHash = await provider.send("eth_sendRawTransaction", [rawTx]);
  console.log("txHash", txHash);
}

main().catch(console.error);
