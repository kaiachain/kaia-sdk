import { useState } from "react";
import { Account } from "../types";
import { doSendTx } from "../util";
import { parseKaia } from "@kaiachain/viem-ext";

type Props = {
  account: Account;
};

function LegacyVT({ account }: Props) {
  const [txhash, setTxhash] = useState<string>("");
  const [error, setError] = useState<any>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const toAddr = e.target.to.value;
    const valuePeb = parseKaia(e.target.amount.value);
    const tx = {
      to: toAddr,
      value: valuePeb,
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
        <p>
          To:{" "}
          <input type="text" name="to" defaultValue={account.address}></input>
        </p>
        <p>
          Amount (ETH/KAIA):{" "}
          <input type="text" name="amount" defaultValue="0.01"></input>
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

export default LegacyVT;
