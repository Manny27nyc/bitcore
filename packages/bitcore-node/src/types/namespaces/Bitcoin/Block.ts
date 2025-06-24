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
import { BitcoinTransactionType } from './Transaction';
export interface BlockHeaderObj {
  prevHash: string;
  hash: string;
  time: number;
  version: number;
  merkleRoot: string;
  bits: number;
  nonce: number;
}
export interface BlockHeader {
  toObject: () => BlockHeaderObj;
}
export interface BitcoinBlockType {
  hash: string;
  transactions: BitcoinTransactionType[];
  header: BlockHeader;
  toBuffer: () => Buffer;
}
