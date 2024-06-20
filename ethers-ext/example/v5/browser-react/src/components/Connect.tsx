import { Web3Provider } from '@klaytn/ethers-ext'
import { Account } from '../types';
import { baobabNetworkSpec, switchNetwork } from '../util';

type Props = {
  account: Account;
  setAccount: (account: Account) => void;
};

function Connect({ account, setAccount }: Props) {
  async function connect(injectedProvider: any) {
    if (!injectedProvider) {
      alert("Please install wallet");
      return;
    }

    // Wrap the window.{ethereum,klaytn} object with Web3Provider.
    const provider = new Web3Provider(injectedProvider);
    // // Uncomment to use the original ethers.js Web3Provider:
    // provider = new ethers.providers.Web3Provider(injectedProvider);

    const isMetaMask = injectedProvider.isMetaMask;
    const isKaikas = injectedProvider.isKaikas;

    // Detect user network
    // https://docs.metamask.io/wallet/how-to/connect/detect-network/
    const chainId = await provider.send("eth_chainId", []);
    console.log("chainId", chainId);

    // Detect user account
    // https://docs.metamask.io/wallet/how-to/connect/access-accounts/
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("accounts", accounts);

    // Default to Baobab network
    await switchNetwork(provider, baobabNetworkSpec);

    setAccount({
      provider: provider,
      isKaikas: isKaikas,
      isMetaMask: isMetaMask,
      chainId: chainId,
      address: accounts[0]
    });

    injectedProvider.on("networkChanged", (_chainId: any) => {
      console.log("chainId changed", _chainId);
      setAccount({
        provider: new Web3Provider(injectedProvider),
        isKaikas: isKaikas,
        isMetaMask: isMetaMask,
        chainId: _chainId,
        address: accounts[0]
      });
    });

    injectedProvider.on("accountsChanged", async (_accounts: any[]) => {
      console.log("accounts changed", _accounts);
      setAccount({
        provider: new Web3Provider(injectedProvider),
        isKaikas: isKaikas,
        isMetaMask: isMetaMask,
        chainId: chainId,
        address: _accounts[0]
      });
    });
  }

  async function connectMM() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
    } else {
      await connect(window.ethereum);
    }
  }

  async function connectKK() {
    if (!window.klaytn) {
      alert("Please install Kaikas");
    } else {
      await connect(window.klaytn);
    }
  }

  return (
    <div>
      <button onClick={connectMM}>Connect MetaMask</button>
      <button onClick={connectKK}>Connect Kaikas</button>
    </div>
  );
};

export default Connect;
