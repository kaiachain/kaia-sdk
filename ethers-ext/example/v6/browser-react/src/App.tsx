import { useState } from 'react';
import './App.css';

import { Account } from "./types";
import Connect from './components/Connect';
import AccountInfo from './components/AccountInfo'
import SignMsg from './components/SignMsg';
import LegacyVT from './components/LegacyVT';
import LegacySC from './components/LegacySC';
import KlaytnVT from './components/KlaytnVT';
import KlaytnSC from './components/KlaytnSC';
import KlaytnFeeDelVT from './components/KlaytnFeeDelVT';
import KlaytnFeeDelSC from './components/KlaytnFeeDelSC';
import KlaytnFeeDelServiceVT from './components/KlaytnFeeDelServiceVT';
import KlaytnFeeDelServiceSC from './components/KlaytnFeeDelServiceSC';

enum Menu {
  None,
  SignMsg,
  LegacyVT,
  LegacySC,
  KlaytnVT,
  KlaytnSC,
  KlaytnFeeDelVT,
  KlaytnFeeDelSC,
  KlaytnFeeDelServiceVT,
  KlaytnFeeDelServiceSC,
}

function App() {
  const [account, setAccount] = useState<Account>({});
  const [menu, setMenu] = useState<Menu>(Menu.None);

  return (
    <div className="App">
      <Connect account={account} setAccount={setAccount} />
      <hr/>
      <AccountInfo account={account} setAccount={setAccount} />
      <hr/>
      { account.address ? (
        <div>
          <h3>Sign Message</h3>
          <button onClick={() => setMenu(Menu.SignMsg)}>Expand</button>
          { menu === Menu.SignMsg ? <SignMsg account={account} /> : null }

          <h3>Send KLAY/ETH</h3>
          <button onClick={() => setMenu(Menu.LegacyVT)}>Expand</button>
          { menu === Menu.LegacyVT ? <LegacyVT account={account} /> : null }

          <h3>Call SmartContract</h3>
          <button onClick={() => setMenu(Menu.LegacySC)}>Expand</button>
          { menu === Menu.LegacySC ? <LegacySC account={account} /> : null }
        </div>
      ) : null }
      { /* ValueTransfer tx is not supported in MetaMask */
        account.isKaikas ? (
        <div>
          <hr/>
          <h3>Kaia Features</h3>
          <h3>Send ValueTransfer tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnVT)}>Expand</button>
          { menu === Menu.KlaytnVT ? <KlaytnVT account={account} /> : null }
          <h3>Send SmartContractExecution tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnSC)}>Expand</button>
          { menu === Menu.KlaytnSC ? <KlaytnSC account={account} /> : null }
          <h3>Sign and Send FeeDelegatedValueTransfer tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnFeeDelVT)}>Expand</button>
          { menu === Menu.KlaytnFeeDelVT ? <KlaytnFeeDelVT account={account} /> : null }
          <h3>Sign and Send FeeDelegatedSmartContractExecution tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnFeeDelSC)}>Expand</button>
          { menu === Menu.KlaytnFeeDelSC ? <KlaytnFeeDelSC account={account} /> : null }
          <h3>Sign and Send Fee Delegated Service ValueTransfer tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnFeeDelServiceVT)}>Expand</button>
          { menu === Menu.KlaytnFeeDelServiceVT ? <KlaytnFeeDelServiceVT account={account} /> : null }
          <h3>Sign and Send FeeDelegated Service SmartContractExecution tx</h3>
          <button onClick={() => setMenu(Menu.KlaytnFeeDelServiceSC)}>Expand</button>
          { menu === Menu.KlaytnFeeDelServiceSC ? <KlaytnFeeDelServiceSC account={account} /> : null }
        </div>
      ) : null }
    </div>
  );
}

export default App;
