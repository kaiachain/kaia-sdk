import { useState } from 'react';
import { Account } from '../types';
import { doSignTxNonKaikas } from '../util';
import { TxType } from '@kaiachain/js-ext-core';

type Props = {
  account: Account;
};

// https://kairos.kaiascan.io/address/0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df?tabId=contractCode
var contractAddress = "0xa9eF4a5BfB21e92C06da23Ed79294DaB11F5A6df";
var contractCalldata = "0xd09de08a"; // function increment()

function NonKaikasFeeDelSC({ account }: Props) {
  const [txhash, setTxhash] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (loading) return;
    setTxhash("");
    setError(null);
    setLoading(true);

    const tx = {
      type: TxType.FeeDelegatedSmartContractExecution,
      to: e.target.to.value,
      data: e.target.data.value,
    };

    try {
      const txhash = await doSignTxNonKaikas(account, tx, false);
      setTxhash(txhash);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="menu-component">
      <form onSubmit={handleSubmit}>
        <p>To: <input type="text" name="to" defaultValue={contractAddress}></input></p>
        <p>Data: <input type="text" name="data" defaultValue={contractCalldata}></input></p>
        <p><input type="submit" disabled={loading} value={loading ? "Signing..." : "Submit"}></input></p>
      </form>
      {txhash ? <a target="_blank" href={txhash} rel="noreferrer">{txhash}</a> : null}
      {error ? <text><b style={{ color: "red" }}>{error?.message ?? String(error)}</b></text> : null}
    </div>
  );
}

export default NonKaikasFeeDelSC;
