import { Web3, TxType, AccountKeyType, getPublicKeyFromPrivate, toPeb } from "@kaiachain/web3js-ext";
import { assert } from "chai";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

type Account = {
    address: string;
    privateKey: string;
    signTransaction: (tx: any) => Promise<any>;
}

// Feedback1. Generate Temporary Key.
function generateTemporaryAccount(): Account {
    return web3.eth.accounts.create();
}

describe("Role-based Key Tests", function () {
    this.timeout(10000);

    let roleTransactionAccount: Account;
    let roleAccountUpdate: Account;
    let roleFeePayerAccount: Account;

    // Before all tests, set up Role-based Key
    before(async function () {
        console.log("\n--- Generating Temporary Accounts ---");
        roleTransactionAccount = generateTemporaryAccount();
        roleAccountUpdate = generateTemporaryAccount();
        roleFeePayerAccount = generateTemporaryAccount();

        const pub1 = getPublicKeyFromPrivate(roleTransactionAccount.privateKey);
        const pub2 = getPublicKeyFromPrivate(roleAccountUpdate.privateKey);
        const pub3 = getPublicKeyFromPrivate(roleFeePayerAccount.privateKey);

        console.log("Generated Public keys:", { pub1, pub2, pub3 });
        
        const updateTx = {
            type: TxType.AccountUpdate,
            from: roleAccountUpdate.address,
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
        console.log("Account Updated:", signedUpdateTx);
        assert.isNotNull(signedUpdateTx.transactionHash, "Account update transaction should succeed");
    });

    // Test Case 1: Sending a normal transaction with RoleTransaction key
    it("1. Sending a normal transaction with RoleTransaction key", async function () {
        const valueTx = {
            type: TxType.ValueTransfer,
            from: generateTemporaryAccount().address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        const signedTx = await roleTransactionAccount.signTransaction(valueTx);
        console.log("RoleTransaction signedTx:", signedTx.transactionHash);
        assert.isNotNull(signedTx.transactionHash, "RoleTransaction transaction should succeed");
    });

    // Test Case 2: Attempting to sign a regular transaction with RoleFeePayer key (should fail)
    it("2. Attempting to sign a regular transaction with RoleFeePayer key (failure test)", async function () {
        const valueTx = {
            type: TxType.ValueTransfer,
            from: generateTemporaryAccount().address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        try {
            const signedTx = await roleFeePayerAccount.signTransaction(valueTx);
            console.log("Unexpected Success - Signed Transaction:", signedTx);
            assert.fail("RoleFeePayer key should not sign a ValueTransfer transaction.");
        } catch (error: any) {
            console.log("Expected Error (RoleFeePayer):", error.message);
            assert.isTrue(true, "Error occurred as expected due to role mismatch");
        }
    });

    // Test Case 3: Fee Delegated transaction signed by RoleFeePayer key (should succeed)
    it("3. Fee Delegated transaction signed by RoleTransaction and RoleFeePayer keys", async function () {
        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: generateTemporaryAccount().address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        // Feedback2. Remove the dependencies with network connection. just check the signed result.
        // Feedback3. signed by a user (from address,roleTransactionAccount) first
        const signedTxBySender = await roleTransactionAccount.signTransaction(feeDelegatedTx);
        assert.isNotNull(signedTxBySender.rawTransaction, "Transaction should be signed by RoleTransaction");

        console.log("Sender signed transaction:", signedTxBySender.rawTransaction);

        // Feedback3. FeePayer(FeePayerAccount) sign the tx after the user's sign.
        try {
            const signedTxByFeePayer = await roleFeePayerAccount.signTransaction({
                senderRawTransaction: signedTxBySender.rawTransaction
            });
            assert.isNotNull(signedTxByFeePayer.rawTransaction, "FeePayer should sign the transaction");
            console.log("Signed Fee Delegated Transaction:", signedTxByFeePayer.rawTransaction);
        } catch (error: any) {
            console.log("Expected Error (FeePayer signing):", error.message);
            assert.fail("FeePayer failed to sign the already signed transaction.");
        }
    });

    // Test Case 4: Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)
    it("4. Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)", async function () {
        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: generateTemporaryAccount().address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: 100000
        };

        try {
            const signedTx = await roleTransactionAccount.signTransaction(feeDelegatedTx);
            console.log("Unexpected Success - Transaction Hash:", signedTx.transactionHash);
            assert.fail("RoleTransaction key should not sign Fee Delegated transactions");
        } catch (error: any) {
            console.log("Expected Error (RoleTransaction as FeePayer):", error.message);
            assert.isTrue(true, "Error occurred as expected");
        }
    });
});
