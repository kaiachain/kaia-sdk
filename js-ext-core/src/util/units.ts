// Unit conversion utilities

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { parseUnits as parseEthUnits, formatUnits as formatEthUnits } from "@ethersproject/units";
import { isString } from "lodash-es";

// All in lowercase. The ambiguity between mKLAY and MKLAY is resolved in getKlayDecimals.
const names: { [key: string]: number } = {
  // Klaytn units
  peb: 0,
  kpeb: 3,
  mpeb: 6,
  ston: 9,
  gpeb: 9,
  uklay: 12,
  mklay: 15,
  klay: 18,
  kklay: 21,
  Mklay: 24,
  gklay: 27,
  tklay: 30,

  // Kaia units
  kei: 0,
  gkei: 9,
  kaia: 18
};

type KaiaUnit = "kei" | "gkei" | "kaia";
export type UnitNameType = KaiaUnit | `${number}` | Exclude<BigNumberish, string>;

// Returns the decimal corresponding the unitName.
// If not found, returns undefined.
function getKlayDecimals(
  unitName?: UnitNameType
): number | undefined {
  if (isString(unitName)) {
    const lower = unitName.toLowerCase();

    // mKLAY and MKLAY are different
    if (lower == "mklay" && unitName[0] == "m") {
      return 15;
    } else if (lower == "mklay" && unitName[0] == "M") {
      return 24;
    } else if (lower in names) {
      return names[lower];
    } else {
      return undefined;
    }
  }
  return undefined;
}

// Convert [value]peb to [unit].
export function formatKlayUnits(value: BigNumberish, unitName?: UnitNameType): string {
  const decimals = getKlayDecimals(unitName);
  if (Number.isInteger(decimals)) {
    // Klay units
    return formatEthUnits(value, decimals);
  } else {
    return formatEthUnits(value, unitName);
  }
}

// Convert [value][unit] to peb.
export function parseKlayUnits(value: string, unitName?: UnitNameType): BigNumber {
  const decimals = getKlayDecimals(unitName);
  if (Number.isInteger(decimals)) {
    // Klay units
    return parseEthUnits(value, decimals);
  } else {
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
export function fromPeb(value: BigNumberish, unitName?: UnitNameType): string {
  return formatKlayUnits(value, unitName);
}

// Equivalent to web3.utils.toWei.
// Convert [value][unit] to peb.
export function toPeb(value: string, unitName?: UnitNameType): string {
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

export function fromKei(value: BigNumberish, unitName?: UnitNameType): string {
  return formatKlayUnits(value, unitName);
}

// Equivalent to web3.utils.toWei.
// Convert [value][unit] to kei.
export function toKei(value: string, unitName?: UnitNameType): string {
  return parseKlayUnits(value, unitName).toString();
}