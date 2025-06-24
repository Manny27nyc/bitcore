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
'use strict';
export const Defaults = {
  DEFAULT_FEE_PER_KB: 10000,
  MIN_FEE_PER_KB: 0,
  MAX_FEE_PER_KB: 1000000,
  MAX_TX_FEE(coin) {
    switch (coin) {
      case 'btc':
        return 0.5e8;
      case 'doge':
        return 400e8;
      default:
        return 1e8;
    }
  }
};
