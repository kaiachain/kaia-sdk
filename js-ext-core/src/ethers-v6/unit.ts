import { BigNumberish } from "@ethersproject/bignumber";

import {
  parseKaia as parseKaiaBase,
  parseKaiaUnits as parseKaiaUnitsBase,
  parseUnits as parseUnitsBase,
} from "../util";
/**
 * Convert kaia to kei
 *
 * @param   kaia  string number in kaia unit
 * @returns equivalent value in kei.
 */
export function parseKaia(kaia: string): bigint {
  return parseKaiaBase(kaia).toBigInt();
}
/**
 * Convert Kaia's units to kei
 *
 * @param   value  string number of unit
 * @param unitName name of unit to convert (kei/gkei/kaia)
 * @returns equivalent value in peb.
 */
export function parseKaiaUnits(
  value: string,
  unitName?: string | BigNumberish
): bigint {
  return parseKaiaUnitsBase(value, unitName).toBigInt();
}
/**
 * Convert Kaia's units to kei
 *
 * @param   value  string number of unit
 * @param unitName name of unit to convert (kei/gkei/kaia)
 * @returns equivalent value in peb.
 */
export function parseUnits(
  value: string,
  unitName?: string | BigNumberish
): bigint {
  return parseUnitsBase(value, unitName).toBigInt();
}
