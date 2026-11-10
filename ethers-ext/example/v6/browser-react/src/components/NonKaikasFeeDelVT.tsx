import { useState } from "react";
import { Account } from "../types";
import { doSignTxNonKaikas } from "../util";
import { TxType } from "@kaiachain/js-ext-core";
import { parseKaia } from "@kaiachain/ethers-ext/v6";

type Props = {
  account: Account;
};

function NonKaikasFeeDelVT({ account }: Props) {
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
      type: TxType.FeeDelegatedValueTransfer,
      to: e.target.to.value,
      value: parseKaia(e.target.amount.value),
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
        <p>
          To:{" "}
          <input type="text" name="to" defaultValue={account.address}></input>
        </p>
        <p>
          Value: <input type="text" name="amount" defaultValue="0.01"></input>
        </p>
        <p>
          <input type="submit" disabled={loading} value={loading ? "Signing..." : "Submit"}></input>
        </p>
      </form>
      {txhash ? (
        <a target="_blank" href={txhash} rel="noreferrer">
          {txhash}
        </a>
      ) : null}
      {error ? (
        <text>
          <b style={{ color: "red" }}>{error?.message ?? String(error)}</b>
        </text>
      ) : null}
    </div>
  );
}

export default NonKaikasFeeDelVT;
