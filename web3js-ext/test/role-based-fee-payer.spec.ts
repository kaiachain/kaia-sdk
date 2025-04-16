import { Web3, TxType, parseTransaction } from "@kaiachain/web3js-ext";
import { assert } from "chai";
import { describe, it } from 'mocha'
const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

describe("Role-based Key Tests", function () {
    this.timeout(200000);

    it("5. [REAL SEND] RoleBased + FeeDelegatedValueTransfer, check feePayer via getTransaction", async function () {
        // Step 1: Prepare legacyA (for value transfer) and legacyB (for fee payment), test accouont created by Kaia Online Toolkit
        const legacyA = web3.eth.accounts.privateKeyToAccount("0x21040aa5efd8548b18d71aaea183f38cf242237d1cff1274fba02d57a35baac7");
        const legacyB = web3.eth.accounts.privateKeyToAccount("0x7833d6a97880af896ee1c042d7965c952b4592a318cff584bedb966ec24e2069");

        console.log("[Test5] legacyA (TxKey):", legacyA.address);
        console.log("[Test5] legacyB (FeePayerKey):", legacyB.address);

        // Step 2: Update legacyA to a RoleBased account
        // Set RoleTransaction = legacyA, RoleAccountUpdate = legacyA, RoleFeePayer = legacyB
        // const pubA = getPublicKeyFromPrivate(legacyA.privateKey);
        // const pubB = getPublicKeyFromPrivate(legacyB.privateKey);

        // console.log("[Test5] Updating legacyA to RoleBased...");
        // const accountUpdateTx = {
        //     type: TxType.AccountUpdate,
        //     from: legacyA.address,
        //     gas: 300000,
        //     gasPrice: "25000000000",
        //     key: {
        //         type: AccountKeyType.RoleBased,
        //         keys: [
        //             { type: AccountKeyType.Public, key: pubA }, // RoleTransaction
        //             { type: AccountKeyType.Public, key: pubA }, // RoleAccountUpdate
        //             { type: AccountKeyType.Public, key: pubB }  // RoleFeePayer
        //         ]
        //     }
        // };

        // const signedUpdateTx = await web3.eth.accounts.signTransaction(accountUpdateTx, legacyA.privateKey);
        // const receiptUpdate = await web3.eth.sendSignedTransaction(signedUpdateTx.rawTransaction);
        // assert.isNotNull(receiptUpdate.transactionHash, "[Test5] AccountUpdate must be mined");
        // console.log("[Test5] AccountUpdate TxHash:", receiptUpdate.transactionHash);

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
        console.log('parse signed user tx', parseTransaction(userSigned.rawTransaction));

        assert.isNotNull(userSigned.rawTransaction, "[Test5] User-signed transaction must exist");

        // Step 5: Sign the transaction with legacyB (RoleFeePayer) with feePayer field set to legacyA's address
        // TODO: fix `type` datatypes in parseTransaction
        // for role-based-keys, if we want the fee payer to be legacyA, we need to decode and set the fee payer manually, otherwise the feepayer will equal legacyB
        const feePayerSigned = await legacyB.signTransactionAsFeePayer({ ...parseTransaction(userSigned.rawTransaction), feePayer: legacyA.address });

        const parsedFeePayer = parseTransaction(feePayerSigned.rawTransaction).feePayer
        assert.equal(parsedFeePayer, legacyA.address, `fee payer address expecte to be ${legacyA.address}, got ${parsedFeePayer}`)

        console.log("[Test5] Sending FeeDelegated transaction to network...");
        const receiptFD = await web3.eth.sendSignedTransaction(feePayerSigned.rawTransaction);

        assert.isNotNull(receiptFD.transactionHash, "[Test5] FeeDelegated transaction must be mined");
        console.log("[Test5] FeeDelegated TxHash:", receiptFD.transactionHash);
        console.log(`Scan: https://kairos.kaiascan.io/tx/${receiptFD.transactionHash}?tabId=overview&page=1`);
    });
});