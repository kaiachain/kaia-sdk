import { Web3Provider } from '@kaiachain/ethers-ext/v6'
import { Account } from '../types';
import { kairosNetworkSpec, switchNetwork } from '../util';

type Props = {
  account: Account;
  setAccount: (account: Account) => void;
};

function Connect({ account, setAccount }: Props) {
  async function connect(injectedProvider: any, walletFlags: Partial<Account>) {
    if (!injectedProvider) {
      alert("Please install wallet");
      return;
    }

    const provider = new Web3Provider(injectedProvider);

    const chainId = await provider.send("eth_chainId", []);
    console.log("chainId", chainId);

    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("accounts", accounts);

    await switchNetwork(provider, kairosNetworkSpec);

    const base: Account = {
      provider,
      rawProvider: injectedProvider,
      chainId,
      address: accounts[0],
      ...walletFlags,
    };

    setAccount(base);

    injectedProvider.on("networkChanged", (_chainId: any) => {
      console.log("chainId changed", _chainId);
      setAccount({
        ...base,
        provider: new Web3Provider(injectedProvider),
        rawProvider: injectedProvider,
        chainId: _chainId,
      });
    });

    injectedProvider.on("accountsChanged", async (_accounts: any[]) => {
      console.log("accounts changed", _accounts);
      setAccount({
        ...base,
        provider: new Web3Provider(injectedProvider),
        rawProvider: injectedProvider,
        address: _accounts[0],
      });
    });
  }

  async function connectMM() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
    } else {
      await connect(window.ethereum, { isMetaMask: true });
    }
  }

  async function connectKK() {
    if (!window.klaytn) {
      alert("Please install Kaia Wallet");
    } else {
      await connect(window.klaytn, { isKaikas: true });
    }
  }

  async function connectOKX() {
    if (!window.okxwallet) {
      alert("Please install OKX Wallet");
    } else {
      await connect(window.okxwallet, { isOKX: true });
    }
  }

  return (
    <div>
      <button onClick={connectMM}>Connect MetaMask</button>
      <button onClick={connectKK}>Connect Kaia Wallet</button>
      <button onClick={connectOKX}>Connect OKX</button>
    </div>
  );
};

export default Connect;
