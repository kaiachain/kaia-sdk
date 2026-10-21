# Running the browser extension example

Run a HTTP server to serve the HTML and JS files. Use python3 http.server for example:

```
python3 -m http.server 3000
```

Then open `http://localhost:3000` with the browser.

Note that the browser extension wallets (e.g. MetaMask and Kaikas) does not work in the `file:///` page.
Therefore you cannot run this example by double-clicking the `index.html`.

## Privy Embedded Wallet

To use the Privy embedded wallet integration:

1. Install dependencies and build the Privy bundle:

```
npm install
```

This will install `@privy-io/js-sdk-core` and automatically build `privy-bundle.js` via esbuild.

2. Set your Privy credentials in `main.js`:

```js
var PRIVY_APP_ID = "PASTE_YOUR_PRIVY_APP_ID";
var PRIVY_CLIENT_ID = "PASTE_YOUR_PRIVY_CLIENT_ID";
```

Get these from the [Privy Dashboard](https://dashboard.privy.io) under Settings → Clients.

3. To rebuild the Privy bundle after changes:

```
npm run build:privy
```

