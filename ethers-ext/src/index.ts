// Pass-through js-ext-core exports
export * from "@kaiachain/js-ext-core";
export * from './v5/index.js'

import * as v5 from "./v5/index.js";
import * as v6 from "./v6/index.js";
export { v5, v6 };
