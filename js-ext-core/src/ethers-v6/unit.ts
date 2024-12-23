import { BigNumberish } from "@ethersproject/bignumber";

import {
  parseKaia as parseKaiaBase,
  parseKaiaUnits as parseKaiaUnitsBase,
  parseUnits as parseUnitsBase,
} from "../util";
/**
 * Convert KAIA to peb
 *
 * @param   kaia  string number of KAIA unit
 * @returns equivalent value in peb.
 */
export function parseKaia(kaia: string): bigint {
  return parseKaiaBase(kaia).toBigInt();
}

export function parseKaiaUnits(
  value: string,
  unitName?: string | BigNumberish
): bigint {
  return parseKaiaUnitsBase(value, unitName).toBigInt();
}
export function parseUnits(
  value: string,
  unitName?: string | BigNumberish
): bigint {
  return parseUnitsBase(value, unitName).toBigInt();
}
