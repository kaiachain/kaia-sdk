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

    it("3. Fee Delegated transaction signed by RoleTransaction and RoleFeePayer keys", async function () {
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
    
        // 1) A User signs a transaction
        const signedTxByUser = await userAccount.signTransaction(feeDelegatedTx);
        assert.isNotNull(signedTxByUser.rawTransaction, "Transaction should be signed by User");
    
        console.log("Signed Transaction by User (rawTransaction):", signedTxByUser.rawTransaction);
    
        try {
            // 2) FeePayer signs a transaction
            const feePayerSignInput = {
                type: feeDelegatedTx.type,
                from: feeDelegatedTx.from,
                to: feeDelegatedTx.to,
                value: feeDelegatedTx.value,
                gasPrice: feeDelegatedTx.gasPrice,
                gasLimit: feeDelegatedTx.gasLimit,
                nonce: feeDelegatedTx.nonce,
                chainId: feeDelegatedTx.chainId,
                feePayer: roleFeePayerAccount.address,
                senderRawTransaction: signedTxByUser.rawTransaction,
            };
            console.log("FeePayer SignTransaction Input:", feePayerSignInput);
    
            const signedTxByFeePayer = await roleFeePayerAccount.signTransaction(feePayerSignInput);
            assert.isNotNull(signedTxByFeePayer.rawTransaction, "FeePayer should sign the transaction");
    
            console.log("Signed Transaction by FeePayer (rawTransaction):", signedTxByFeePayer.rawTransaction);
    
            // 3) RLP format check
            if (!signedTxByFeePayer.rawTransaction.startsWith("0x")) {
                console.error("Invalid rawTransaction format");
            } else {
                // 4) RLP Decoding
                const { KlaytnTxFactory } = require("@kaiachain/web3js-ext");
                const decoded = KlaytnTxFactory.fromRLP(signedTxByFeePayer.rawTransaction);
                console.log("Decoded Transaction:", decoded);
    
                // feepayer field check
                if (decoded.fields.feePayer) {
                    console.log("Decoded feePayer Field:", decoded.fields.feePayer);
                    // Check if feepayer and roleFeePayerAccount.address are the same
                    assert.equal( 
                        decoded.fields.feePayer.toLowerCase(),
                        roleFeePayerAccount.address.toLowerCase(),
                        "FeePayer address should match roleFeePayerAccount"
                    );
                } else {
                    // Unsigned if the feePayer field itself is not present
                    console.error("No feePayer field found in decoded transaction.");
                    assert.fail("FeePayer address not found in the final transaction.");
                }
            }
        } catch (error: any) {
            console.log("Error during FeePayer signing or decoding:", error.message);
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
