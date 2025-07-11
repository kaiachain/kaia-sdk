import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, MaxUint256 } from "ethers";
import _ from "lodash";
import { describe, it, before } from "mocha";

import {
  getAmountRepay,
  getGaslessSwapRouter,
  getMinAmountOut,
  getAmountIn,
  getApproveTx,
  getSwapTx,
  isGaslessApprove,
  isGaslessSwap,
} from "../../src/v6/gasless";
import { MockEthersProvider, MockKlaytnProvider } from "./mock_provider";

chai.use(chaiAsPromised);

// Dummy values
const url = "https://public-en-kairos.node.kaia.io";
const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const gsrAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const routerAddress = "0x4b41783732810b731569e4d944f59372f411bea2";
const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const tokenAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const mainnetChainId = 8217;
const kairosChainId = 1001;
const localChainId = 1000;
const unsupportedChainId = 1234;
const block = {
  baseFeePerGas: "0x5d21dba00",
  difficulty: "0x1",
  extraData: "0x",
  gasLimit: "0xe8d4a50fff",
  gasUsed: 0,
  hash: "0x92694a6b75a012a15559d60e92ff30d855e2722292b7d1b05f94e5c34ff02a42",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  mixHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  nonce: "0x0000000000000000",
  number: 19,
  parentHash: "0x76938e2a9b83600621d51465a66a725130de1963e9e5d546adf755939bf74799",
  receiptsRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 630,
  stateRoot: "0x61f886eb9904d0c776c4871f9b955d5d849938340ad2cec78b35e4ab0fa9bb1a",
  timestamp: 1701338345,
  timestampFoS: 0,
  totalDifficulty: "0x14",
  transactions: [],
  transactionsRoot: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  uncles: []
};

describe("Gasless v6", () => {
  let EP: MockEthersProvider;
  let KP: MockKlaytnProvider;
  let EW: ethers.Wallet;
  let sentRawTx: string;

  before(async () => {
    EP = new MockEthersProvider(url);
    KP = new MockKlaytnProvider(url);
    EW = new ethers.Wallet(priv, EP);

    // Stuff dummy values to mock providers
    for (let P of [EP, KP]) {
      P.mock_override("eth_chainId", () => "0x3e9"); // 1001 in hex
      P.mock_override("eth_blockNumber", () => "0x12d687");
      P.mock_override("eth_gasPrice", () => "0xba43b7400"); // 50 gwei
      P.mock_override("eth_getTransactionCount", () => "0x1234");
      P.mock_override("eth_estimateGas", () => "0x5208"); // 21000
      P.mock_override("eth_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return ethers.keccak256(sentRawTx);
      });
      P.mock_override("eth_call", (params: any[]) => {
        const data = params[0].data || "";

        if (data.startsWith("0x75151b63")) { // isTokenSupported
          return "0x0000000000000000000000000000000000000000000000000000000000000001";
        }

        if (data.startsWith("0x5ea1d6f8")) { // commissionRate
          return "0x00000000000000000000000000000000000000000000000000000000000003e8";
        }

        if (data.startsWith("0x632db21c")) { // getAmountIn
          return "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
        }

        if (data.startsWith("0xe2693e3f")) { // getActiveAddr
          return ethers.zeroPadValue(gsrAddress, 32);
        }

        return "0x0000000000000000000000000000000000000000000000000000000000000000";
      });
      P.mock_override("eth_getBlockByNumber", () => block);
    }

    for (let P of [KP]) {
      P.mock_override("klay_gasPrice", () => "0xba43b7400"); // 50 gwei
      P.mock_override("klay_estimateGas", () => "0x5208"); // 21000
      P.mock_override("klay_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return ethers.keccak256(sentRawTx);
      });
      P.mock_override("kaia_sendRawTransactions", (params: any[]) => {
        const txs = params[0];
        return txs.map((tx: string) => ethers.keccak256(tx));
      });
    }
  });

  describe("getGaslessSwapRouter", () => {
    it("should return router from Registry", async () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", () => "0x0000000000000000000000004b41783732810b731569e4d944f59372f411bea2");
      try {
        const router = await getGaslessSwapRouter(EP);
        expect(await router.getAddress()).to.equal("0x4b41783732810b731569E4d944F59372F411BEa2");
      } finally {
        EP.mock_override("eth_call", originalMock);
      }
    });

    it("should return router with custom address", async () => {
      const router = await getGaslessSwapRouter(EP, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      expect(await router.getAddress()).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });

    it("should throw error when GaslessSwapRouter is not set in the registry", () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", () => "0x0000000000000000000000000000000000000000000000000000000000000000");
      try {
        expect(getGaslessSwapRouter(EP)).to.be.rejectedWith("GaslessSwapRouter not found in the registry");
      } finally {
        EP.mock_override("eth_call", originalMock);
      }
    });
  });

  describe("getAmountRepay", () => {
    it("should calculate correct amount to repay when approval is required", () => {
      const result = getAmountRepay(true, 25000000000);
      expect(result).to.equal(15525000000000000n);
    });

    it("should calculate correct amount to repay when approval is not required", () => {
      const result = getAmountRepay(false, 25000000000);
      expect(result).to.equal(13025000000000000n);
    });

    it("should handle string gasPrice input", () => {
      const result = getAmountRepay(true, 25000000000);
      expect(result).to.equal(15525000000000000n);
    });
  });

  describe("getMinAmountOut", () => {
    it("should calculate the minimum amount out correctly", () => {
      const amountRepay = "15525000000000000";
      const appTxFee = "10000000000000000";
      const commissionRateBps = 1000;

      const result = getMinAmountOut(amountRepay, appTxFee, commissionRateBps);
      expect(result).to.equal(26636111111111111n);
    });
  });

  describe("getAmountIn", () => {
    it("should calculate the amount in based on minimum amount out and slippage", async () => {
      const mockContract = {
        getAmountIn: async () => BigInt("1000000000000000000")
      };

      const minAmountOut = "26636111111111111";
      const slippageBasisPoints = 50;

      const result = await getAmountIn(mockContract as any, tokenAddress, minAmountOut, slippageBasisPoints);
      expect(result).to.equal(1000000000000000000n);
    });
  });

  describe("getApproveTx", () => {
    it("should generate a valid approve transaction", async () => {
      const tx = await getApproveTx(EP, walletAddress, tokenAddress, gsrAddress, 25000000000);
      expect(tx).to.be.an("object");
      expect(tx.to).to.equal(tokenAddress);
      expect(tx.from).to.equal(walletAddress);
      expect(tx.data).to.exist;
      if (tx.data) {
        expect(tx.data.toString().startsWith("0x095ea7b3")).to.be.true; // approve selector
        expect(tx.data.toString().endsWith(MaxUint256.toString(16).substring(2))).to.be.true; // approve amount
      }
    });
  });

  describe("getSwapTx", () => {
    it("should generate a valid swap transaction", async () => {
      const amountIn = "1000000000000000000";
      const minAmountOut = "26636111111111111";
      const amountRepay = "15525000000000000";

      const tx = await getSwapTx(EP, walletAddress, tokenAddress, gsrAddress, amountIn, minAmountOut, amountRepay, 25000000000);
      expect(tx).to.be.an("object");
      expect(tx.to).to.be.a("string");
      expect(tx.from).to.equal(walletAddress);
      expect(tx.data).to.be.a("string");
    })

    it("should handle isSingle parameter correctly", async () => {
      const amountIn = "1000000000000000000";
      const minAmountOut = "26636111111111111";
      const amountRepay = "15525000000000000";

      const tx = await getSwapTx(EP, walletAddress, tokenAddress, gsrAddress, amountIn, minAmountOut, amountRepay, 25000000000, true);
      expect(tx).to.be.an("object");
      expect(tx.to).to.be.a("string");
      expect(tx.nonce).to.equal(0x1235); // one larger than the account's next nonce (getTransactionCount=0x1234)
    });
  });

  describe("isGaslessApprove", () => {
    it("should validate a gasless approve transaction", async () => {
      const mockTx = {
        from: walletAddress,
        to: tokenAddress,
        nonce: 0x1234,
        data: "0x095ea7b30000000000000000000000005fc8d32690cc91d4c39d9d3abcbd16989f875707ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      };

      const router = await getGaslessSwapRouter(EP);
      const result = await isGaslessApprove(EP, router, mockTx);
      expect(result).to.deep.equal({ ok: true });
    });

    it("should return false for non-approve transactions", async () => {
      const mockTx = {
        from: walletAddress,
        to: tokenAddress,
        nonce: 0x1234,
        data: "0x12345678",
      };

      const router = await getGaslessSwapRouter(EP);
      const result = await isGaslessApprove(EP, router, mockTx);
      expect(result).to.deep.equal({ ok: false, error: "A2: Invalid data" });
    });
  });

  describe("isGaslessSwap", () => {
    it("should validate a gasless swap transaction without approve", async () => {
      const mockSwapTx = {
        from: walletAddress,
        to: gsrAddress,
        nonce: 0x1234,
        gasPrice: 25000000000,
        data: "0x8042690100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8000000000000000000000000000000000000000000000000000000000007a1200000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000002e462b22331000000000000000000000000000000000000000000000000000000000000000012c",
      };

      const router = await getGaslessSwapRouter(EP);
      const result = await isGaslessSwap(EP, router, null, mockSwapTx);
      expect(result).to.deep.equal({ ok: true });
    });

    it("should validate a gasless swap transaction with approve", async () => {
      const mockApproveTx = {
        from: walletAddress,
        to: tokenAddress,
        nonce: 0x1234,
        gasPrice: 25000000000,
        data: "0x095ea7b30000000000000000000000005fc8d32690cc91d4c39d9d3abcbd16989f875707ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      };
      const mockSwapTx = {
        from: walletAddress,
        to: gsrAddress,
        nonce: 0x1235,
        gasPrice: 25000000000,
        data: "0x8042690100000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8000000000000000000000000000000000000000000000000000000000007a1200000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000003727e7be235000000000000000000000000000000000000000000000000000000000000000012c",
      };

      const router = await getGaslessSwapRouter(EP);
      const result = await isGaslessSwap(EP, router, mockApproveTx, mockSwapTx);
      expect(result).to.deep.equal({ ok: true });
    });

    it("should return false for non-swap transactions", async () => {
      const mockSwapTx = {
        from: walletAddress,
        to: gsrAddress,
        nonce: 0x1234,
        gasPrice: 25000000000,
        data: "0x1234567800000000",
      };

      const router = await getGaslessSwapRouter(EP);
      const result = await isGaslessSwap(EP, router, null, mockSwapTx);
      expect(result).to.deep.equal({ ok: false, error: "S2: Invalid data" });
    });
  });
});
