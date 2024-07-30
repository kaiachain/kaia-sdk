import { Account } from '../types';

type Props = {
  account: Account;
  setAccount: (account: Account) => void;
};

function AccountInfo({ account, setAccount }: Props) {
  return (
    <div>
      <p><b>Address</b>: {account.address}</p>
      <p><b>ChainId</b>: {account.chainId}</p>
      <p>
        <b>Connected Wallet</b>:&nbsp;
        {account.isMetaMask ? "Metamask" : null}
        {account.isKaikas ? "Kaikas" : null}
      </p>
    </div>
  );
};

export default AccountInfo;
