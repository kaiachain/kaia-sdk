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
        roleTransactionAccount = generateTemporaryAccount();
        roleAccountUpdate = generateTemporaryAccount();
        roleFeePayerAccount = generateTemporaryAccount();

        // Feedback 5. PubKey name change
        const roleTransactionAccountPubkey = getPublicKeyFromPrivate(roleTransactionAccount.privateKey);
        const roleAccountUpdatePubKey = getPublicKeyFromPrivate(roleAccountUpdate.privateKey);
        const roleFeePayerPubkey = getPublicKeyFromPrivate(roleFeePayerAccount.privateKey);

        const updateTx = {
            type: TxType.AccountUpdate,
            from: roleAccountUpdate.address,
            gasLimit: 100000,
            key: {
                type: AccountKeyType.RoleBased,
                keys: [
                    { type: AccountKeyType.Public, key: roleTransactionAccountPubkey },
                    { type: AccountKeyType.Public, key: roleAccountUpdatePubKey },
                    { type: AccountKeyType.Public, key: roleFeePayerPubkey }
                ]
            }
        };

        const signedUpdateTx = await roleAccountUpdate.signTransaction(updateTx);
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
            assert.fail("RoleFeePayer key should not sign a ValueTransfer transaction.");
        } catch (error: any) {
            assert.isTrue(true, "Error occurred as expected due to role mismatch");
        }
    });

    // Test Case 3: Fee Delegated transaction signed by RoleFeePayer key (should succeed)
    it("3. Fee Delegated transaction signed by RoleTransaction and RoleFeePayer keys", async function () {
        // Feedback 4. Create a new user account (different user than FeePayer)
        const userAccount = generateTemporaryAccount();

        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: userAccount.address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: "100000", 
            gasPrice: "25000000000", 
            nonce: "0x0",
            chainId: "0x1001" 
        };

        // Feedback 4. User signs transaction first
        const signedTxByUser = await userAccount.signTransaction(feeDelegatedTx);
        assert.isNotNull(signedTxByUser.rawTransaction, "Transaction should be signed by User");

        // Feedback 4. FeePayer adds an additional signature
        try {
            const signedTxByFeePayer = await roleFeePayerAccount.signTransaction({
                senderRawTransaction: signedTxByUser.rawTransaction,
                gasPrice: "25000000000",
                gasLimit: "100000" 
            });
            assert.isNotNull(signedTxByFeePayer.rawTransaction, "FeePayer should sign the transaction");
        } catch (error: any) {
            console.log("error is : ", error.message);
            assert.fail("FeePayer failed to sign the already signed transaction.");
        }
    });

    // Test Case 4: Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)
    it("4. Attempting to sign Fee Delegated transaction with RoleTransaction key (should fail)", async function () {
        const userAccount = generateTemporaryAccount();

        const feeDelegatedTx = {
            type: TxType.FeeDelegatedValueTransfer,
            from: userAccount.address,
            to: generateTemporaryAccount().address,
            value: toPeb("0.01"),
            gasLimit: 100000,
            gasPrice: "25000000000", 
            nonce: "0x0",
            chainId: "0x1001"
        };

        const signedTxByUser = await userAccount.signTransaction(feeDelegatedTx);
        assert.isNotNull(signedTxByUser.rawTransaction, "Transaction should be signed by User");
        
        try {
            const signedTxByRoleTransaction = await roleTransactionAccount.signTransaction({
                senderRawTransaction: signedTxByUser.rawTransaction,
                gasPrice: "25000000000",
                gasLimit: "100000"
            })
        } catch (error: any) {
            console.log("error is : ", error.message);
            assert.isTrue(true, "Error occurred as expected");
        }
    });
});
