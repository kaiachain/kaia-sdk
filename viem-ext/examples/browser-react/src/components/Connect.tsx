import { createWalletClient, custom, JsonRpcAccount, kairos } from '@kaiachain/viem-ext'
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
    const client = createWalletClient<JsonRpcAccount>({
      chain: kairos,
      transport: custom(injectedProvider),
    });
    // // Uncomment to use the original ethers.js Web3Provider:
    // provider = new ethers.Web3Provider(injectedProvider);

    const isMetaMask = injectedProvider.isMetaMask;
    const isKaikas = injectedProvider.isKaikas;


    // Detect user network
    // https://docs.metamask.io/wallet/how-to/connect/detect-network/
    const chainId = client.chain.id

    // Detect user account
    // https://docs.metamask.io/wallet/how-to/connect/access-accounts/
    const accounts = await (client as any).requestAddresses()

    // Default to Baobab network
    await switchNetwork(client as any, baobabNetworkSpec);

    setAccount({
      provider: client,
      isKaikas: isKaikas,
      isMetaMask: isMetaMask,
      chainId: chainId,
      address: accounts[0]
    });

    injectedProvider.on("networkChanged", (_chainId: any) => {
      console.log("chainId changed", _chainId);
      setAccount({
        provider: createWalletClient({
          chain: kairos,
          transport: custom(injectedProvider),
        }),
        isKaikas: isKaikas,
        isMetaMask: isMetaMask,
        chainId: _chainId,
        address: accounts[0]
      });
    });

    injectedProvider.on("accountsChanged", async (_accounts: any[]) => {
      console.log("accounts changed", _accounts);
      setAccount({
        provider: createWalletClient({
          chain: kairos,
          transport: custom(injectedProvider),
        }),
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
