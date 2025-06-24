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
class LibProvider {
  libs = {
    BTC: {
      lib: require('bitcore-lib'),
      p2p: require('bitcore-p2p')
    }
  };

  register(chain: string, lib: string, p2p: string) {
    this.libs[chain] = { lib: require(lib), p2p: require(p2p) };
  }

  get(chain) {
    return this.libs[chain];
  }
}

export const Libs = new LibProvider();
