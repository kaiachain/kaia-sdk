import { useState } from 'react';
import './App.css';

import { Account, isKaiaCapableWallet, isNonKaikasKaiaWallet } from "./types";
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
import NonKaikasFeeDelVT from './components/NonKaikasFeeDelVT';
import NonKaikasFeeDelSC from './components/NonKaikasFeeDelSC';
import NonKaikasFeeDelServiceVT from './components/NonKaikasFeeDelServiceVT';
import NonKaikasFeeDelServiceSC from './components/NonKaikasFeeDelServiceSC';

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
  NonKaikasFeeDelVT,
  NonKaikasFeeDelSC,
  NonKaikasFeeDelServiceVT,
  NonKaikasFeeDelServiceSC,
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

          <h3>Send KAIA/ETH</h3>
          <button onClick={() => setMenu(Menu.LegacyVT)}>Expand</button>
          { menu === Menu.LegacyVT ? <LegacyVT account={account} /> : null }

          <h3>Call SmartContract</h3>
          <button onClick={() => setMenu(Menu.LegacySC)}>Expand</button>
          { menu === Menu.LegacySC ? <LegacySC account={account} /> : null }
        </div>
      ) : null }
      { /* Kaia-native tx types via klay_sendTransaction (Kaikas, OKX) */
        isKaiaCapableWallet(account) ? (
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
      { /* Non-Kaikas wallets (OKX) use client-side signing via eth_sign */
        isNonKaikasKaiaWallet(account) ? (
        <div>
          <hr/>
          <h3>Non-Kaikas Sign & Send (via eth_sign)</h3>
          <h3>FeeDelegatedValueTransfer tx</h3>
          <button onClick={() => setMenu(Menu.NonKaikasFeeDelVT)}>Expand</button>
          { menu === Menu.NonKaikasFeeDelVT ? <NonKaikasFeeDelVT account={account} /> : null }
          <h3>FeeDelegatedSmartContractExecution tx</h3>
          <button onClick={() => setMenu(Menu.NonKaikasFeeDelSC)}>Expand</button>
          { menu === Menu.NonKaikasFeeDelSC ? <NonKaikasFeeDelSC account={account} /> : null }
          <h3>Fee Delegated Service ValueTransfer tx</h3>
          <button onClick={() => setMenu(Menu.NonKaikasFeeDelServiceVT)}>Expand</button>
          { menu === Menu.NonKaikasFeeDelServiceVT ? <NonKaikasFeeDelServiceVT account={account} /> : null }
          <h3>Fee Delegated Service SmartContractExecution tx</h3>
          <button onClick={() => setMenu(Menu.NonKaikasFeeDelServiceSC)}>Expand</button>
          { menu === Menu.NonKaikasFeeDelServiceSC ? <NonKaikasFeeDelServiceSC account={account} /> : null }
        </div>
      ) : null }
    </div>
  );
}

export default App;
