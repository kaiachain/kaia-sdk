import { Web3, TxType, parseTransaction } from "@kaiachain/web3js-ext";
import { assert } from "chai";
import { describe, it } from 'mocha'
const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

describe("Role-based Key Tests", function () {
    it("Decoupled fee payer when signTransactionAsFeePayer", async function () {
        // Step 1: Prepare legacyA (for value transfer) and legacyB (for fee payment)
        const legacyA = web3.eth.accounts.privateKeyToAccount("0x21040aa5efd8548b18d71aaea183f38cf242237d1cff1274fba02d57a35baac7");
        const legacyB = web3.eth.accounts.privateKeyToAccount("0x7833d6a97880af896ee1c042d7965c952b4592a318cff584bedb966ec24e2069", legacyA.address);

        assert.equal(legacyA.address, legacyB.address, 'both account must have same public address')
        assert.notEqual(legacyA.privateKey, legacyB.privateKey, 'both account must have different private key')
        // Step 3: Create FeeDelegatedValueTransfer transaction from legacyA to a new receiver
        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: legacyA.address,
            to: '0xd28945cd49374ff8b0dc8218409d41d5ee060dad',
            value: 0n,
            gas: 300000,
            feePayer: legacyA.address,
            gasPrice: "25000000000",
        };

        // Step 4: Sign the transaction with legacyA (RoleTransaction)
        const userSigned = await legacyA.signTransaction(feeDelegatedTx);
        assert.isNotNull(userSigned.rawTransaction, "User-signed transaction must exist");

        // Step 5: Sign the transaction with legacyB (RoleFeePayer), output feePayer field will be legacy A
        const feePayerSigned = await legacyB.signTransactionAsFeePayer(userSigned.rawTransaction);
        const parsedFeePayer = parseTransaction(feePayerSigned.rawTransaction).feePayer
        assert.equal(parsedFeePayer, legacyA.address, `fee payer address expected to be ${legacyA.address}, got ${parsedFeePayer}`)
    });
});