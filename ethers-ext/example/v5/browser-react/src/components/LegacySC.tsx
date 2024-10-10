import { useState } from 'react';
import { Account } from '../types';
import { doSendTx } from '../util';

type Props = {
  account: Account;
};

// https://baobab.klaytnscope.com/account/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

function LegacySC({ account }: Props) {
  const [txhash, setTxhash] = useState<string>("");
  const [error, setError] = useState<any>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const tx = {
      to: e.target.to.value,
      data: e.target.data.value,
    };

    try {
      const txhash = await doSendTx(account, tx);
      setTxhash(txhash);
    } catch (e: any) {
      setError(e);
    }
  }

  return (
    <div className="menu-component">
      <form onSubmit={handleSubmit}>
        <p>To: <input type="text" name="to" defaultValue={contractAddress}></input></p>
        <p>Data: <input type="text" name="data" defaultValue={contractCalldata}></input></p>
        <p><input type="submit"></input></p>
      </form>
      { txhash? <a target="_blank" href={txhash} rel="noreferrer">{txhash}</a> : null }
    { error? <text><b style={{ color: "red" }}>{error}</b></text> : null }
  </div>
);
};

export default LegacySC;
