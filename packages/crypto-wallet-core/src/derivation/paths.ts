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
export const Paths = {
  BTC: {
    mainnet: "m/44'/0'/",
    livenet: "m/44'/0'/"
  },
  BCH: {
    mainnet: "m/44'/145'/",
    livenet: "m/44'/145'/"
  },
  ETH: {
    mainnet: "m/44'/60'/",
    livenet: "m/44'/60'/",
    testnet: "m/44'/60'/"
  },
  XRP: {
    mainnet: "m/44'/144'/",
    livenet: "m/44'/144'/",
    testnet: "m/44'/144'/"
  },
  DOGE: {
    mainnet: "m/44'/3'/",
    livenet: "m/44'/3'/",
    testnet: "m/44'/3'/"
  },
  LTC: {
    mainnet: "m/44'/2'/",
    livenet: "m/44'/2'/",
    testnet: "m/44'/2'/"
  },
  default: {
    testnet: "m/44'/1'/"
  }
};
