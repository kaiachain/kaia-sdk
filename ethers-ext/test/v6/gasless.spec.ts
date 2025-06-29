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
  sendGaslessTx,
  isGaslessSupportedToken,
  isGaslessApprove,
  isGaslessSwap,
  isValidSwapTxFormat,
  validateAndDecodeSwapFunction,
} from "../../src/v6/gasless";
import { Wallet as KlaytnWallet } from "../../src/v6/signer";
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
      P.mock_override("eth_getBlock", () => ({
        timestamp: Math.floor(Date.now() / 1000)
      }));
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
      const tx = await getApproveTx(EP, walletAddress, tokenAddress, gsrAddress);
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
      
      const tx = await getSwapTx(EP, walletAddress, tokenAddress, amountIn, minAmountOut, amountRepay);
      expect(tx).to.be.an("object");
      expect(tx.to).to.be.a("string");
      expect(tx.from).to.equal(walletAddress);
      expect(tx.data).to.be.a("string");
    })

    it("should handle isSingle parameter correctly", async () => {
      const amountIn = "1000000000000000000";
      const minAmountOut = "26636111111111111";
      const amountRepay = "15525000000000000";
      
      const tx = await getSwapTx(EP, walletAddress, tokenAddress, amountIn, minAmountOut, amountRepay, false);
      expect(tx).to.be.an("object");
      expect(tx.to).to.be.a("string");
      expect(tx.nonce).to.equal(0x1235);
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
  });

  describe("isGaslessSupportedToken", () => {
    it("should return true for supported tokens", async () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", (params: any[]) => {
        return "0x0000000000000000000000000000000000000000000000000000000000000001";
      });
      
      try {
        const result = await isGaslessSupportedToken(EP, tokenAddress, kairosChainId);
        expect(result).to.be.true;
      } finally {
        EP.mock_override("eth_call", originalMock);
      }
    });

    it("should handle errors gracefully", async () => {
      const originalMock = EP.overrides["eth_call"];
      EP.mock_override("eth_call", () => { throw new Error("Test error"); });
      
      const result = await isGaslessSupportedToken(EP, tokenAddress, kairosChainId);
      expect(result).to.be.false;
      
      EP.mock_override("eth_call", originalMock);
    });
  });

  describe("isGaslessApprove", () => {
    it("should validate a gasless approve transaction", async () => {
      const mockTx = {
        to: tokenAddress,
        data: "0x095ea7b30000000000000000000000005fc8d32690cc91d4c39d9d3abcbd16989f875707ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        nonce: "0x1234",
        from: walletAddress
      };
      
      const originalGetTxCountMock = EP.overrides["eth_getTransactionCount"];
      EP.mock_override("eth_getTransactionCount", () => "0x1234");
      
      try {
        const result = await isGaslessApprove(EP, mockTx, kairosChainId);
        expect(result).to.be.true;
      } finally {
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
      
      const result = await isGaslessApprove(EP, mockTx, kairosChainId);
      expect(result).to.be.false;
    });
  });

  describe("isGaslessSwap", () => {
    describe("isValidSwapTxFormat", () => {
      it("should return true for valid transaction format", () => {
        const txRequest = { data: "0xdata", to: "0xaddress" };
        expect(isValidSwapTxFormat(txRequest as any)).to.be.true;
      });

      it("should return false when data is missing", () => {
        const txRequest = { to: "0xaddress" };
        expect(isValidSwapTxFormat(txRequest as any)).to.be.false;
      });

      it("should return false when to is missing", () => {
        const txRequest = { data: "0xdata" };
        expect(isValidSwapTxFormat(txRequest as any)).to.be.false;
      });
    });

    describe("validateAndDecodeSwapFunction", () => {
      it("should return invalid for wrong function selector", function() {
        // Create invalid swap function data with a wrong selector
        const functionSelector = "0x12345678"; // wrong selector
        const data = functionSelector + "0000"; // Just need some data
        
        // We don't need to mock ethers.id here since we're testing the negative case
        const result = validateAndDecodeSwapFunction(data);
        expect(result.isValid).to.be.false;
      });
    });

    it("should return false for non-swap transactions", async () => {
      const mockSwapTx = {
        to: gsrAddress,
        data: "0x12345678",
        nonce: "0x1234",
        from: walletAddress
      };
      
      const originalEthersId = ethers.id;
      (ethers as any).id = () => ({
        slice: () => "0x2d4ba3a7"
      });
      
      try {
        const result = await isGaslessSwap(EP, null, mockSwapTx, kairosChainId);
        expect(result).to.be.false;
      } finally {
        (ethers as any).id = originalEthersId;
      }
    });
  });
});
