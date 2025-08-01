import { useState } from "react";
import { Account } from "../types";
import { doSignTx } from "../util";
import { TxType } from "@kaiachain/js-ext-core";
import { parseKaia } from "@kaiachain/ethers-ext/v6";

type Props = {
  account: Account;
};

function KlaytnFeeDelServiceVT({ account }: Props) {
  const [txhash, setTxhash] = useState<string>("");
  const [error, setError] = useState<any>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const tx = {
      type: TxType.FeeDelegatedValueTransfer,
      to: e.target.to.value,
      value: parseKaia(e.target.amount.value),
    };

    try {
      const txhash = await doSignTx(account, tx, true);
      setTxhash(txhash);
    } catch (e: any) {
      setError(e);
    }
  }

  return (
    <div className="menu-component">
      <form onSubmit={handleSubmit}>
        <p>
          To:{" "}
          <input type="text" name="to" defaultValue={account.address}></input>
        </p>
        <p>
          Value: <input type="text" name="amount" defaultValue="0.01"></input>
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
      {txhash ? (
        <a target="_blank" href={txhash} rel="noreferrer">
          {txhash}
        </a>
      ) : null}
      {error ? (
        <text>
          <b style={{ color: "red" }}>{error}</b>
        </text>
      ) : null}
    </div>
  );
}

export default KlaytnFeeDelServiceVT;
