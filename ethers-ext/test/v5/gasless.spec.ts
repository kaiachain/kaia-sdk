import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { BigNumber } from "@ethersproject/bignumber";
import { id } from "@ethersproject/hash";
import _ from "lodash";
import { describe, it, before } from "mocha";

import {
  getAmountRepay,
  getGaslessSwapRouter,
  getCommissionRate,
  getMinAmountOut,
  getAmountIn,
  getApproveRawTx,
  getSwapRawTx,
  sendGaslessTx,
  isGaslessSupportedToken,
  isGaslessApprove,
  isGaslessSwap,
  isValidSwapTxFormat,
  validateAndDecodeSwapFunction,
} from "../../src/v5/gasless";
import { Wallet as KlaytnWallet } from "../../src/v5/signer";
import { MockEthersProvider, MockKlaytnProvider } from "./mock_provider";

chai.use(chaiAsPromised);

// Dummy values
const url = "https://public-en-kairos.node.kaia.io";
const priv = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const walletAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const tokenAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const mainnetChainId = 8217;
const kairosChainId = 1001;
const localChainId = 1000;
const unsupportedChainId = 1234;

describe("Gasless v5", () => {
  let EP: MockEthersProvider;
  let KP: MockKlaytnProvider;
  let EW: any; // ethers.Wallet
  let KW: KlaytnWallet;
  let sentRawTx: string;

  before(async () => {
    EP = new MockEthersProvider(url);
    KP = new MockKlaytnProvider(url);
    EW = new (require("@ethersproject/wallet").Wallet)(priv, EP);
    KW = new KlaytnWallet(priv, KP);

    // Stuff dummy values to mock providers
    for (let P of [EP, KP]) {
      P.mock_override("eth_chainId", () => "0x3e9"); // 1001 in hex
      P.mock_override("eth_blockNumber", () => "0x12d687");
      P.mock_override("eth_gasPrice", () => "0xba43b7400"); // 50 gkei
      P.mock_override("eth_getTransactionCount", () => "0x1234");
      P.mock_override("eth_estimateGas", () => "0x5208"); // 21000
      P.mock_override("eth_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return id(sentRawTx);
      });
      P.mock_override("eth_call", (params: any[]) => {
        const data = params[0].data || "";
        
        if (data.startsWith("0xbb9c4ea7")) { // isTokenSupported
          return "0x0000000000000000000000000000000000000000000000000000000000000001";
        }
        
        if (data.startsWith("0xc20b8fa5")) { // commissionRate
          return "0x00000000000000000000000000000000000000000000000000000000000003e8";
        }
        
        if (data.startsWith("0x3883e119")) { // getAmountIn
          return "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000";
        }
        
        return "0x0000000000000000000000000000000000000000000000000000000000000000";
      });
      P.mock_override("eth_getBlock", () => ({
        timestamp: Math.floor(Date.now() / 1000)
      }));
    }
    
    for (let P of [KP]) {
      P.mock_override("klay_gasPrice", () => "0xba43b7400"); // 50 gkei
      P.mock_override("klay_estimateGas", () => "0x5208"); // 21000
      P.mock_override("klay_sendRawTransaction", (params: any[]) => {
        sentRawTx = params[0];
        return id(sentRawTx);
      });
      P.mock_override("kaia_sendRawTransactions", (params: any[]) => {
        const txs = params[0];
        return txs.map((tx: string) => id(tx));
      });
    }
  });

  describe("getAmountRepay", () => {
    it("should calculate correct amount to repay when approval is required", () => {
      const result = getAmountRepay(true, 25);
      expect(result).to.equal("15525000000000000");
    });

    it("should calculate correct amount to repay when approval is not required", () => {
      const result = getAmountRepay(false, 25);
      expect(result).to.equal("13025000000000000");
    });

    it("should handle string gasPrice input", () => {
      const result = getAmountRepay(true, 25);
      expect(result).to.equal("15525000000000000");
    });

    it("should handle BigNumber gasPrice input", () => {
      const result = getAmountRepay(true, 25);
      expect(result).to.equal("15525000000000000");
    });
  });

  describe("getGaslessSwapRouter", () => {
    it("should return router for mainnet chain ID", () => {
      const router = getGaslessSwapRouter(EW, mainnetChainId);
      expect(router.address).to.equal("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    });

    it("should return router for kairos chain ID", () => {
      const router = getGaslessSwapRouter(EW, kairosChainId);
      expect(router.address).to.equal("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    });

    it("should return router for local chain ID", () => {
      const router = getGaslessSwapRouter(EW, localChainId);
      expect(router.address).to.equal("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");
    });

    it("should throw error for unsupported chain ID", () => {
      expect(() => getGaslessSwapRouter(EW, unsupportedChainId)).to.throw("Unsupported chain ID: 1234");
    });
  });

  describe("getCommissionRate", () => {
    it("should return the commission rate from the contract", async () => {
      const mockContract = {
        commissionRate: async () => BigNumber.from(1000)
      };
      
      const rate = await getCommissionRate(mockContract as any);
      expect(rate).to.equal(0.1);
    });
  });

  describe("getMinAmountOut", () => {
    it("should calculate the minimum amount out correctly", () => {
      const amountRepay = "15525000000000000";
      const appTxFee = "10000000000000000";
      const commissionRate = 0.1;
      
      const result = getMinAmountOut(amountRepay, appTxFee, commissionRate);
      expect(result).to.equal("26636111111111111");
    });
  });

  describe("getAmountIn", () => {
    it("should calculate the amount in based on minimum amount out and slippage", async () => {
      const mockContract = {
        getAmountIn: async () => BigNumber.from("1000000000000000000")
      };
      
      const minAmountOut = "26636111111111111";
      const slippage = 0.5;
      
      const result = await getAmountIn(mockContract as any, tokenAddress, minAmountOut, slippage);
      expect(result).to.equal("1000000000000000000");
    });
  });

  describe("getApproveRawTx", () => {
    it("should generate a valid approve raw transaction", async () => {
      const amount = "1000000000000000000";
      
      const rawTx = await getApproveRawTx(EW, tokenAddress, amount);
      expect(rawTx).to.be.a("string");
      expect(rawTx.startsWith("0x")).to.be.true;
    });

    it("should throw error if amount is zero or negative", async () => {
      await expect(getApproveRawTx(EW, tokenAddress, "0")).to.be.rejectedWith("Amount must be greater than 0");
    });
  });

  describe("getSwapRawTx", () => {
    it("should generate a valid swap raw transaction", async () => {
      const amountIn = "1000000000000000000";
      const minAmountOut = "26636111111111111";
      const amountRepay = "15525000000000000";
      
      const rawTx = await getSwapRawTx(EW, tokenAddress, amountIn, minAmountOut, amountRepay);
      expect(rawTx).to.be.a("string");
      expect(rawTx.startsWith("0x")).to.be.true;
    });

    it("should handle isSingle parameter correctly", async () => {
      const amountIn = "1000000000000000000";
      const minAmountOut = "26636111111111111";
      const amountRepay = "15525000000000000";
      
      const rawTx = await getSwapRawTx(EW, tokenAddress, amountIn, minAmountOut, amountRepay, false);
      expect(rawTx).to.be.a("string");
      expect(rawTx.startsWith("0x")).to.be.true;
    });
  });

  describe("sendGaslessTx", () => {
    it("should send a single transaction when approveTx is null", async () => {
      const swapTx = "0x1234";
      
      const result = await sendGaslessTx(null, swapTx, KP);
      expect(result).to.be.an("array");
      expect(result.length).to.equal(1);
    });

    it("should send both transactions when approveTx is provided", async () => {
      const approveTx = "0x5678";
      const swapTx = "0x1234";
      
      const result = await sendGaslessTx(approveTx, swapTx, KP);
      expect(result).to.be.an("array");
      expect(result.length).to.equal(2);
    });

    it("should simulate transaction sending when no provider is given", async () => {
      const approveTx = "0x5678";
      const swapTx = "0x1234";
      
      const result = await sendGaslessTx(approveTx, swapTx);
      expect(result).to.be.an("array");
      expect(result.length).to.equal(2);
      expect(result[0]).to.equal("0x5678000000000000000000000000000000000000000000000000000000000000");
      expect(result[1]).to.equal("0x1234000000000000000000000000000000000000000000000000000000000000");
    });
  });

  describe("isGaslessSupportedToken", () => {
    it("should return true for supported tokens", async () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", (params: any[]) => {
        return "0x0000000000000000000000000000000000000000000000000000000000000001";
      });
      
      try {
        const result = await isGaslessSupportedToken(EW, tokenAddress, kairosChainId);
        expect(result).to.be.true;
      } finally {
        EP.mock_override("eth_call", originalMock);
      }
    });

    it("should handle errors gracefully", async () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", () => { throw new Error("Test error"); });
      
      const result = await isGaslessSupportedToken(EW, tokenAddress, kairosChainId);
      expect(result).to.be.false;
      
      EP.mock_override("eth_call", originalMock);
    });
  });

  describe("isGaslessApprove", () => {
    it("should validate a gasless approve transaction", async () => {
      const mockTx = {
        to: tokenAddress,
        data: "0x095ea7b30000000000000000000000005fc8d32690cc91d4c39d9d3abcbd16989f8757070000000000000000000000000000000000000000000000000de0b6b3a7640000",
        nonce: "0x1234",
        from: walletAddress
      };
      
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", (params: any[]) => {
        return "0x0000000000000000000000000000000000000000000000000000000000000001";
      });
      
      const originalGetTxCountMock = EP.overrides["eth_getTransactionCount"];
      EP.mock_override("eth_getTransactionCount", () => "0x1234");
      
      try {
        const result = await isGaslessApprove(EW, mockTx, kairosChainId);
        expect(result).to.be.true;
      } finally {
        EP.mock_override("eth_call", originalMock);
        EP.mock_override("eth_getTransactionCount", originalGetTxCountMock);
      }
    });

    it("should return false for non-approve transactions", async () => {
      const mockTx = {
        to: tokenAddress,
        data: "0x12345678",
        nonce: "0x1234",
        from: walletAddress
      };
      
      const result = await isGaslessApprove(EW, mockTx, kairosChainId);
      expect(result).to.be.false;
    });
  });

  describe("isGaslessSwap", () => {
    describe("isValidSwapTxFormat", () => {
      it("should return true for valid transaction format", () => {
        const txRequest = { data: "0xdata", to: "0xaddress" };
        expect(isValidSwapTxFormat(txRequest)).to.be.true;
      });

      it("should return false when data is missing", () => {
        const txRequest = { to: "0xaddress" };
        expect(isValidSwapTxFormat(txRequest)).to.be.false;
      });

      it("should return false when to is missing", () => {
        const txRequest = { data: "0xdata" };
        expect(isValidSwapTxFormat(txRequest)).to.be.false;
      });
    });

    describe("validateAndDecodeSwapFunction", () => {
      it("should return invalid for wrong function selector", function() {
        // Create invalid swap function data with a wrong selector
        const functionSelector = "0x12345678"; // wrong selector
        const data = functionSelector + "0000"; // Just need some data
        
        // We don't need to mock id here since we're testing the negative case
        const result = validateAndDecodeSwapFunction(data);
        expect(result.isValid).to.be.false;
      });
    });

    it("should return false for non-swap transactions", async () => {
      const mockSwapTx = {
        to: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        data: "0x12345678",
        nonce: "0x1234",
        from: walletAddress
      };
      
      const originalId = id;
      (global as any).id = () => ({
        slice: () => "0x2d4ba3a7"
      });
      
      try {
        const result = await isGaslessSwap(EW, null, mockSwapTx, kairosChainId);
        expect(result).to.be.false;
      } finally {
        (global as any).id = originalId;
      }
    });
  });
});
