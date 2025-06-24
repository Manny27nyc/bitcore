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
export interface BitcoinAddress {
  toString: (stripCash: boolean) => string;
}
export interface BitcoinScript {
  toBuffer: () => Buffer;
  toHex: () => string;
  classify: () => string;
  chunks: Array<{ buf: Buffer }>;
  toAddress: (network: string) => BitcoinAddress;
}
export interface BitcoinInputObj {
  prevTxId: string;
  outputIndex: number;
  sequenceNumber: number;
}
export interface BitcoinInput {
  toObject: () => BitcoinInputObj;
}
export interface BitcoinOutput {
  script: BitcoinScript;
  satoshis: number;
}
export interface BitcoinTransactionType {
  outputAmount: number;
  hash: string;
  _hash: undefined | string;
  isCoinbase: () => boolean;
  outputs: BitcoinOutput[];
  inputs: BitcoinInput[];
  toBuffer: () => Buffer;
  nLockTime: number;
}
