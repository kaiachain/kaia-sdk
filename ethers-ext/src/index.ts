// Pass-through js-ext-core exports
export * from "@kaiachain/js-ext-core/util";
export {
  AccountKey,
  AccountKeyFactory,
  KlaytnTx,
  KlaytnTxFactory,
  parseTransaction,
} from "@kaiachain/js-ext-core";

import * as v5 from "./v5";
import * as v6 from "./v6";
export * from "./v5";
export { v5, v6 };
