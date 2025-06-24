/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
export class StatsUtil {
  /**
   * @param {Array<T>} array - A sorted array of values to be used for quartiles
   * @param {number} n - which quartile do you want the median from
   * @returns {T} - The median of nth quartile
   */
  static getNthQuartileMedian<T>(array: Array<T>, n: number): T {
    if (n < 1 || n > 4) {
      throw new Error('second parameter must be between 1 and 4');
    }
    const quartileLength = Math.floor(array.length / 4);
    const quartileStartPoint = (n - 1) * quartileLength;
    const quartileMidpoint = quartileStartPoint + Math.floor(quartileLength / 2);
    const quartileMedian = array[quartileMidpoint];
    return quartileMedian;
  }
}
