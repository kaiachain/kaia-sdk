/// <reference types="react-scripts" />
import { ExternalProvider } from "@kaiachain/ethers-ext";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
    klaytn?: ExternalProvider;
  }
}