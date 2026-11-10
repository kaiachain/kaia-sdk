import { useState } from 'react';
import { Account } from '../types';
import { recoverMessageAddress } from '@kaiachain/viem-ext';
import { toHex } from 'viem';

type Props = {
  account: Account;
};

function SignMsg({ account }: Props) {
  const [signature, setSignature] = useState<string>("");
  const [recoveredAddress, setRecoveredAddress] = useState<string>("");

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const message = toHex(e.target.message.value);

      if (!account.provider) {
        return;
      }

      const provider = account.provider;
      const signature = await provider.signMessage({
        account: account.address,
        message
      });
      setSignature(signature);
      setRecoveredAddress(await recoverMessageAddress({ signature, message }))
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="menu-component">
      <form onSubmit={handleSubmit}>
        <p>Message: <input type="text" name="message" defaultValue="Hello dApp"></input></p>
        <p>Signature: {signature}</p>
        <p>RecoveredAddress: {recoveredAddress}</p>
        <p><input type="submit"></input></p>
      </form>
    </div>
  );
};

export default SignMsg;
