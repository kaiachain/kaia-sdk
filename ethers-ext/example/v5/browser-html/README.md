# Running the browser extension example

Run a HTTP server to serve the HTML and JS files. Use python3 http.server for example:

```
python3 -m http.server 3000
```

Then open `http://localhost:3000` with the browser.

Note that the browser extension wallets (e.g. MetaMask and Kaikas) does not work in the `file:///` page.
Therefore you cannot run this example by double-clicking the `index.html`.

