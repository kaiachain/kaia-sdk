import { useState } from 'react';
import { ethers } from 'ethers'
import { Account } from '../types';

type Props = {
  account: Account;
};

function SignMsg({ account }: Props) {
  const [signature, setSignature] = useState<string>("");
  const [recoveredAddress, setRecoveredAddress] = useState<string>("");

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const message = e.target.message.value;
      const hexMessage = ethers.hexlify(ethers.toUtf8Bytes(message));

      if (!account.provider) {
        return;
      }
     
      const provider = account.provider;
      const signer =await  provider.getSigner(account.address);
      const signature = await signer.signMessage(message);
      setSignature(signature);

      if (account.isKaikas) {
        const recoveredAddress = await provider.send("klay_recoverFromMessage",
          [await signer.getAddress(), hexMessage, signature, "latest"]
        );
        setRecoveredAddress(recoveredAddress);
      } else {
        const recoveredAddress = ethers.verifyMessage(message, signature);
        setRecoveredAddress(recoveredAddress);
      }
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
