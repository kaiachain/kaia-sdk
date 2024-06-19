// require("@klaytn/ethers-ext") exports the extension for ethers v5
export * from "./v5";

// require("@klaytn/ethers-ext").v5 exports the extension for ethers v5
// require("@klaytn/ethers-ext").v6 exports the extension for ethers v6
import * as v5 from "./v5";
import * as v6 from "./v6";
export { v5, v6 };

// require("@klaytn/ethers-ext/v5") exports the extension for ethers v5
// require("@klaytn/ethers-ext/v6") exports the extension for ethers v6
// (declared in package.json:exports. No code needeed here)
