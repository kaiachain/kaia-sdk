// Unit conversion utilities

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { parseUnits as parseEthUnits, formatUnits as formatEthUnits } from "@ethersproject/units";
import _ from "lodash";

// All in lowercase. The ambiguity between mKLAY and MKLAY is resolved in getKlayDecimals.
const names = [
  // Klaytn units
  "peb", // 0
  "kpeb", // 3
  "mpeb", // 6
  "ston", // 9, alias to Gpeb
  "uklay", // 12
  "mklay", // 15
  "klay", // 18
  "kklay", // 21
  "mklay", // 24
  "gklay", // 27
  "tklay", // 30
  // Kaia units
  "kei", // 0
  "gkei", // 9, Gkei
  "kaia", // 18, KAIA
];

// Returns the decimal corresponding the unitName.
// If not found, returns undefined.
function getKlayDecimals(unitName?: string | BigNumberish): number | undefined {
  if (_.isString(unitName)) {
    const lower = unitName.toLowerCase();

    // Tricky special cases.
    // Gpeb is alias to ston, thus 9 decimals
    if (lower == "gpeb") {
      return 9;
    }
    // mKLAY and MKLAY are different
    if (lower == "mklay" && unitName[0] == "m") {
      return 15;
    } else if (lower == "mklay" && unitName[0] == "M") {
      return 24;
    }

    // Kaia units (kei, Gkei, KAIA)
    if (lower == "kei") {
      return 0;
    } else if (lower == "gkei") {
      return 9;
    } else if (lower == "kaia") {
      return 18;
    }

    const index = names.indexOf(lower);
    if (index !== -1) {
      return index * 3;
    }
  }
  return undefined;
}

// Convert [value]peb to [unit].
export function formatKlayUnits(value: BigNumberish, unitName?: string | BigNumberish): string {
  const decimals = getKlayDecimals(unitName);
  if (decimals) {
    // Klay units
    return formatEthUnits(value, decimals);
  } else {
    // Fallback to Eth units and raw numbers.
    // Though parseEthUnits rejects uppercase, we allow it here for consistency with getKlayDecimals.
    if (_.isString(unitName)) {
      unitName = unitName.toLowerCase();
    }
    return formatEthUnits(value, unitName);
  }
}

// Convert [value][unit] to peb.
export function parseKlayUnits(value: string, unitName?: string | BigNumberish): BigNumber {
  const decimals = getKlayDecimals(unitName);
  if (decimals) {
    // Klay units
    return parseEthUnits(value, decimals);
  } else {
    // Fallback to Eth units and raw numbers.
    // Though parseEthUnits rejects uppercase, we allow it here for consistency with getKlayDecimals.
    if (_.isString(unitName)) {
      unitName = unitName.toLowerCase();
    }
    return parseEthUnits(value, unitName);
  }
}

// Convert [peb]peb to KLAY
export function formatKlay(peb: BigNumberish): string {
  return formatKlayUnits(peb, 18);
}

// Convert [klay]KLAY to peb
export function parseKlay(klay: string): BigNumber {
  return parseKlayUnits(klay, 18);
}

// Equivalent to web3.utils.fromWei.
// Convert [value]peb to [unit].
export function fromPeb(value: BigNumberish, unitName?: string | BigNumberish): string {
  return formatKlayUnits(value, unitName);
}

// Equivalent to web3.utils.toWei.
// Convert [value][unit] to peb.
export function toPeb(value: string, unitName?: string | BigNumberish): string {
  return parseKlayUnits(value, unitName).toString();
}

// Shadow ethers functions because klay functions deals with both.
export const formatUnits = formatKlayUnits;
export const parseUnits = parseKlayUnits;

// Shadow kaia functions because klay functions supports same function.
export const formatKaiaUnits = formatKlayUnits;
export const parseKaiaUnits = parseKlayUnits;
export const formatKaia = formatKlay; 
export const parseKaia = parseKlay;

// Equivalent to web3.utils.fromWei.
// Convert [value]kei to [unit].
export function fromKei(value: BigNumberish, unitName?: string | BigNumberish): string {
  return formatKlayUnits(value, unitName);
}

// Equivalent to web3.utils.toWei.
// Convert [value][unit] to kei.
export function toKei(value: string, unitName?: string | BigNumberish): string {
  return parseKlayUnits(value, unitName).toString();
}