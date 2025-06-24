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
import { BitcoinBlockType, BlockHeader, BlockHeaderObj } from './Block';
import {
  BitcoinAddress,
  BitcoinInput,
  BitcoinInputObj,
  BitcoinOutput,
  BitcoinScript,
  BitcoinTransactionType
} from './Transaction';

export type BitcoinBlockType = BitcoinBlockType;
export type BitcoinTransaction = BitcoinTransactionType;
export type BitcoinScript = BitcoinScript;
export type BitcoinAddress = BitcoinAddress;

export type TransactionOutput = BitcoinOutput;
export type TransactionInput = BitcoinInput;
export type TransactionInputObj = BitcoinInputObj;

export type BitcoinHeader = BlockHeader;
export type BitcoinHeaderObj = BlockHeaderObj;
