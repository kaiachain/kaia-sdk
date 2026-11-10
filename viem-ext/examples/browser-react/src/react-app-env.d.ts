/// <reference types="react-scripts" />
import { ExternalProvider } from "@kaiachain/ethers-ext/v6";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
    klaytn?: ExternalProvider;
  }
}