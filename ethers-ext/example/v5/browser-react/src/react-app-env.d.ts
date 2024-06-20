/// <reference types="react-scripts" />
import { ExternalProvider } from "@klaytn/ethers-ext";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
    klaytn?: ExternalProvider;
  }
}