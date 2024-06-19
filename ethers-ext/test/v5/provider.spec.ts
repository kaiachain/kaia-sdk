import { assert } from "chai";
import { describe } from "mocha";

import { MockKlaytnProvider } from "./mock_provider";

const blockNum = "0x82f89d8";
const txhash = "0x2e9babadc8453a986e9996baed595a0bb89d233290913e2d88cb26a3bff8be75";
const trace = [{ txhash: txhash, result: "" }];
const txpoolStatus = { pending: 4, queued: 2 };

// Test that P.func() or P.namespace.func() correctly invokes the
// underlying P.send() function. This test does not actually query the Internet.
describe("Provider", () => {
  let P: MockKlaytnProvider;

  before(async () => {
    P = new MockKlaytnProvider("http://127.0.0.1:8545");
    P.mock_override("eth_chainId", () => "0x7a69");
    P.mock_override("eth_blockNumber", () => blockNum);
    P.mock_override("admin_datadir", () => "/home/ubuntu/klaytn/data");
    P.mock_override("debug_traceTransaction", ([num]) => {
      assert.equal(num, blockNum); // Check that RPC parameters are passed correctly.
      return trace;
    });
    P.mock_override("governance_myVotes", () => []);
    P.mock_override("klay_gasPrice", () => "0xba43b7400");
    P.mock_override("net_networkID", () => "0x7a69");
    P.mock_override("personal_listAccounts", () => []);
    P.mock_override("txpool_status", () => txpoolStatus);
  });

  it("non-eth namespaces", async () => {
    assert.deepEqual(await P.getBlockNumber(), parseInt(blockNum)); // eth_blockNumber
    assert.deepEqual(await P.admin.datadir(), "/home/ubuntu/klaytn/data");
    assert.deepEqual(await P.debug.traceTransaction(blockNum), trace);
    assert.deepEqual(await P.governance.myVotes(), []);
    assert.deepEqual(await P.klay.gasPrice(), "0xba43b7400");
    assert.deepEqual(await P.net.networkID(), "0x7a69");
    assert.deepEqual(await P.personal.listAccounts(), []);
    assert.deepEqual(await P.txpool.status(), txpoolStatus);
  });
});