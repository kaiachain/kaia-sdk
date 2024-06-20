import { useState } from 'react';
import { Account } from '../types';
import { doSendTx } from '../util';
import { TxType, parseKlay } from '@klaytn/js-ext-core';

type Props = {
  account: Account;
};

function KlaytnVT({ account }: Props) {
  const [txhash, setTxhash] = useState<string>("");
  const [error, setError] = useState<any>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const tx = {
      type: TxType.ValueTransfer,
      to: e.target.to.value,
      value: parseKlay(e.target.amount.value).toString(),
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
        <p>To: <input type="text" name="to" defaultValue={account.address}></input></p>
        <p>Value: <input type="text" name="amount" defaultValue="0.01"></input></p>
        <p><input type="submit"></input></p>
      </form>
      { txhash? <a target="_blank" href={txhash} rel="noreferrer">{txhash}</a> : null }
    { error? <text><b style={{ color: "red" }}>{error}</b></text> : null }
  </div>
);
};

export default KlaytnVT;
