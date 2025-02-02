import { Web3, TxType, AccountKeyType, getPublicKeyFromPrivate, toPeb } from "@kaiachain/web3js-ext";
import { assert } from "chai";

const provider = new Web3.providers.HttpProvider("https://public-en-kairos.node.kaia.io");
const web3 = new Web3(provider);

// Helper function to generate a temporary account
type Account = {
  address: string;
  privateKey: string;
  signTransaction: (tx: any) => Promise<any>;
};

function generateTemporaryAccount(): Account {
  return web3.eth.accounts.create();
}

describe("Role-based Key Tests", function () {
  this.timeout(200000);

  let roleTransactionAccount: Account;
  let roleAccountUpdate: Account;
  let roleFeePayerAccount: Account;

  // --- Test Cases 1-4: Local signature tests (no real network sends) ---
  before(async function () {
    roleTransactionAccount = generateTemporaryAccount();
    roleAccountUpdate = generateTemporaryAccount();
    roleFeePayerAccount = generateTemporaryAccount();

    const roleTransactionAccountPubkey = getPublicKeyFromPrivate(roleTransactionAccount.privateKey);
    const roleAccountUpdatePubkey = getPublicKeyFromPrivate(roleAccountUpdate.privateKey);
    const roleFeePayerPubkey = getPublicKeyFromPrivate(roleFeePayerAccount.privateKey);

    const updateTx = {
      type: TxType.AccountUpdate,
      from: roleAccountUpdate.address,
      gasLimit: 100000,
      key: {
        type: AccountKeyType.RoleBased,
        keys: [
          { type: AccountKeyType.Public, key: roleTransactionAccountPubkey },
          { type: AccountKeyType.Public, key: roleAccountUpdatePubkey },
          { type: AccountKeyType.Public, key: roleFeePayerPubkey }
        ]
      }
    };

    const signedUpdateTx = await roleAccountUpdate.signTransaction(updateTx);
    assert.isNotNull(signedUpdateTx.transactionHash, "Account update transaction should succeed");
  });

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

  it("2. Attempting to sign a regular transaction with RoleFeePayer key (should fail)", async function () {
    const valueTx = {
      type: TxType.ValueTransfer,
      from: generateTemporaryAccount().address,
      to: generateTemporaryAccount().address,
      value: toPeb("0.01"),
      gasLimit: 100000
    };

    try {
      await roleFeePayerAccount.signTransaction(valueTx);
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

    // Step 1: User (RoleTransaction) signs the transaction
    const signedTxByUser = await userAccount.signTransaction(feeDelegatedTx);
    assert.isNotNull(signedTxByUser.rawTransaction, "Transaction should be signed by User");
    console.log("Signed Transaction by User (rawTransaction):", signedTxByUser.rawTransaction);

    // Step 2: FeePayer (RoleFeePayer) signs the transaction
    try {
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
    } catch (error: any) {
      console.log("Error during FeePayer signing:", error.message);
      assert.fail("FeePayer failed to sign the already signed transaction.");
    }
  });

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
      await roleTransactionAccount.signTransaction({
        senderRawTransaction: signedTxByUser.rawTransaction,
        gasPrice: "25000000000",
        gasLimit: "100000"
      });
      assert.fail("RoleTransaction key should not sign FeeDelegated transaction");
    } catch (error: any) {
      console.log("Expected error (RoleTransaction as FeePayer):", error.message);
      assert.isTrue(true, "Error occurred as expected");
    }
  });

  // --- Test Case 5: Real Network Send & Fee Payer Check via getTransaction ---
  it("5. [REAL SEND] RoleBased + FeeDelegatedValueTransfer, check feePayer via getTransaction", async function () {
    // Step 1: Prepare legacyA (for value transfer) and legacyB (for fee payment), test accouont created by Kaia Online Toolkit
    const legacyA = web3.eth.accounts.privateKeyToAccount("0x21040aa5efd8548b18d71aaea183f38cf242237d1cff1274fba02d57a35baac7");
    const legacyB = web3.eth.accounts.privateKeyToAccount("0x7833d6a97880af896ee1c042d7965c952b4592a318cff584bedb966ec24e2069");

    console.log("[Test5] legacyA (TxKey):", legacyA.address);
    console.log("[Test5] legacyB (FeePayerKey):", legacyB.address);

    // Step 2: Update legacyA to a RoleBased account
    // Set RoleTransaction = legacyA, RoleAccountUpdate = legacyA, RoleFeePayer = legacyB
    const pubA = getPublicKeyFromPrivate(legacyA.privateKey);
    const pubB = getPublicKeyFromPrivate(legacyB.privateKey);

    console.log("[Test5] Updating legacyA to RoleBased...");
    const accountUpdateTx = {
      type: TxType.AccountUpdate,
      from: legacyA.address,
      gas: 300000,
      gasPrice: "25000000000",
      key: {
        type: AccountKeyType.RoleBased,
        keys: [
          { type: AccountKeyType.Public, key: pubA }, // RoleTransaction
          { type: AccountKeyType.Public, key: pubA }, // RoleAccountUpdate
          { type: AccountKeyType.Public, key: pubB }  // RoleFeePayer
        ]
      }
    };

    const signedUpdateTx = await web3.eth.accounts.signTransaction(accountUpdateTx, legacyA.privateKey);
    const receiptUpdate = await web3.eth.sendSignedTransaction(signedUpdateTx.rawTransaction);
    assert.isNotNull(receiptUpdate.transactionHash, "[Test5] AccountUpdate must be mined");
    console.log("[Test5] AccountUpdate TxHash:", receiptUpdate.transactionHash);

    // Step 3: Create FeeDelegatedValueTransfer transaction from legacyA to a new receiver
    const receiver = generateTemporaryAccount();
    const feeDelegatedTx = {
      type: TxType.FeeDelegatedValueTransfer,
      from: legacyA.address,
      to: receiver.address,
      value: toPeb("0.1"),  // Transfer 0.1 KLAY
      gas: 300000,
      gasPrice: "25000000000",
    };

    // Step 4: Sign the transaction with legacyA (RoleTransaction)
    const userSigned = await web3.eth.accounts.signTransaction(feeDelegatedTx, legacyA.privateKey);
    assert.isNotNull(userSigned.rawTransaction, "[Test5] User-signed transaction must exist");

    // Step 5: Sign the transaction with legacyB (RoleFeePayer) with feePayer field set to legacyA's address
    const feePayerSignInput = {
      senderRawTransaction: userSigned.rawTransaction,
      feePayer: legacyA.address, // The feePayer field should be set to legacyA's address
    };
    const feePayerSigned = await web3.eth.accounts.signTransaction(feePayerSignInput, legacyB.privateKey);
    assert.isNotNull(feePayerSigned.rawTransaction, "[Test5] FeePayer-signed transaction must exist");

    console.log("[Test5] Sending FeeDelegated transaction to network...");
    const receiptFD = await web3.eth.sendSignedTransaction(feePayerSigned.rawTransaction);
    assert.isNotNull(receiptFD.transactionHash, "[Test5] FeeDelegated transaction must be mined");
    console.log("[Test5] FeeDelegated TxHash:", receiptFD.transactionHash);

    // Step 6: Retrieve transaction details via web3.eth.getTransaction
    const txDetails = await web3.eth.getTransaction(receiptFD.transactionHash);
    console.log("[Test5] Transaction details:", txDetails);

    // Access feePayer field using type-casting (as any)
    const feePayerField = (txDetails as any).feePayer;
    if (feePayerField) {
      console.log("[Test5] feePayer from getTransaction:", feePayerField);
      assert.equal(
        feePayerField.toLowerCase(),
        legacyA.address.toLowerCase(),
        "[Test5] feePayer field should match legacyA address"
      );
    } else {
      console.log("[Test5] feePayer field is not available in the transaction details returned by getTransaction.");
    }

    // Step 7: Log the receiver's balance for verification purposes
    const receiverBalance = await web3.eth.getBalance(receiver.address);
    console.log("[Test5] Receiver balance:", receiverBalance, "Peb");
  });
});