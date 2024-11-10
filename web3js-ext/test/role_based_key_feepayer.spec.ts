import { Web3, TxType, AccountKeyType, getPublicKeyFromPrivate, toPeb } from "@kaiachain/web3js-ext";
import { assert } from "chai";

const senderAddr = "0x334b4d3c775c45c59de54e9f0408cba25a1aece7";
const senderRoleTransactionPriv = "0xc9668ccd35fc20587aa37a48838b48ccc13cf14dd74c8999dd6a480212d5f7ac";
const senderRoleAccountUpdatePriv = "0x9ba8cb8f60044058a9e6f815c5c42d3a216f47044c61a1750b6d29ddc7f34bda";
const senderRoleFeePayerPriv = "0x0e4ca6d38096ad99324de0dde108587e5d7c600165ae4cd6a2462c597458c2b8";
const receiverAddr = "0xc40b6909eb7085590e1c26cb3becc25368e249e9";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

const roleAccountUpdate = web3.eth.accounts.privateKeyToAccount(senderRoleAccountUpdatePriv);
const roleTransactionAccount = web3.eth.accounts.privateKeyToAccount(senderRoleTransactionPriv);
const roleFeePayerAccount = web3.eth.accounts.privateKeyToAccount(senderRoleFeePayerPriv);

async function checkBalance(address: string) {
    const balance = await web3.eth.getBalance(address);
    console.log(`Balance of ${address}: ${web3.utils.fromWei(balance, "ether")} KLAY`);
    return parseFloat(web3.utils.fromWei(balance, "ether"));
}

describe("Role-based Key Tests", function () {
    this.timeout(10000);

    // Before all tests, set up Role-based Key
    before(async function () {
        console.log("\n--- Setting Role-based Key ---");
        const pub1 = getPublicKeyFromPrivate(senderRoleTransactionPriv);
        const pub2 = getPublicKeyFromPrivate(senderRoleAccountUpdatePriv);
        const pub3 = getPublicKeyFromPrivate(senderRoleFeePayerPriv);

        const updateTx = {
            type: TxType.AccountUpdate,
            from: senderAddr,
            gasLimit: 100000,
            key: {
                type: AccountKeyType.RoleBased,
                keys: [
                    { type: AccountKeyType.Public, key: pub1 },
                    { type: AccountKeyType.Public, key: pub2 },
                    { type: AccountKeyType.Public, key: pub3 }
                ]
            }
        };

        const signedUpdateTx = await roleAccountUpdate.signTransaction(updateTx);
        const receipt = await web3.eth.sendSignedTransaction(signedUpdateTx.rawTransaction);
        console.log("Account Updated:", receipt);
        assert.isNotNull(receipt.transactionHash, "Account update transaction should succeed");
    });

    // Test Case 1: Sending a normal transaction with RoleTransaction key
    it("1. Sending a normal transaction with RoleTransaction key", async function () {
        const valueTx = {
            type: TxType.ValueTransfer,
            from: senderAddr,
            to: receiverAddr,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        const signedTx = await roleTransactionAccount.signTransaction(valueTx);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("RoleTransaction signedTx:", receipt.transactionHash);
        assert.isNotNull(receipt.transactionHash, "RoleTransaction transaction should succeed");
    });

    // Test Case 2: Attempting to sign a regular transaction with RoleFeePayer key (should fail)
    it("2. Attempting to sign a regular transaction with RoleFeePayer key (failure test)", async function () {
        const valueTx = {
            type: TxType.ValueTransfer,
            from: senderAddr,
            to: receiverAddr,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        try {
            await roleFeePayerAccount.signTransaction(valueTx);
            assert.fail("RoleFeePayer key should not sign a regular transaction.");
        } catch (error: any) {
            console.log("Expected Error (RoleFeePayer):", error.message);
            assert.isTrue(true, "Error occurred as expected");
        }
    });

    // Test Case 3: Fee Delegated transaction signed by RoleFeePayer key (should succeed)
    it("3. Fee Delegated transaction signed by RoleFeePayer key (should succeed)", async function () {
        console.log("\n--- Checking Balances ---");
        const senderBalance = await checkBalance(senderAddr);
        const feePayerBalance = await checkBalance(roleFeePayerAccount.address);

        assert.isAbove(senderBalance, 0.01, "Sender account must have enough balance.");
        assert.isAbove(feePayerBalance, 0.01, "FeePayer account must have enough balance.");

        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: senderAddr,
            to: receiverAddr,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        const signedTx = await roleTransactionAccount.signTransaction(feeDelegatedTx);
        const feePayerSignedTx = await roleFeePayerAccount.signTransaction(signedTx);
        const receipt = await web3.eth.sendSignedTransaction(feePayerSignedTx.rawTransaction);
        console.log("Fee Delegated Transaction Hash:", receipt.transactionHash);
        assert.isNotNull(receipt.transactionHash, "RoleFeePayer transaction should succeed");
    });

    // Test Case 4: Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)
    it("4. Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)", async function () {
        console.log("\n--- Checking Balances ---");
        const senderBalance = await checkBalance(senderAddr);

        assert.isAbove(senderBalance, 0.01, "Sender account should have sufficient balance");

        // Create a FeeDelegatedValueTransfer transaction
        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: senderAddr,
            to: receiverAddr,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        console.log("\n--- Trying to sign Fee Delegated transaction with RoleTransaction key ---");

        // Attempt to sign Fee Delegated transaction with RoleTransaction key
        try {
            const signedTx = await roleTransactionAccount.signTransaction(feeDelegatedTx);
            console.log("Unexpected Success - Fee Delegated Transaction Hash:", signedTx.rawTransaction);
            assert.fail("RoleTransaction key should not sign Fee Delegated transactions");
        } catch (error: any) {
            console.log("Expected Error (RoleTransaction as FeePayer):", error.message);
            assert.isTrue(true, "Error occurred as expected");
        }
    });
});
