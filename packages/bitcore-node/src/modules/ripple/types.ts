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
import { IBlock } from '../../models/baseBlock';
import { ITransaction } from '../../models/baseTransaction';
import { ICoin } from '../../models/coin';

export type IXrpBlock = IBlock & {};
export type IXrpTransaction = ITransaction & {
  from: string;
  to?: string;
  nonce: number;
  currency?: string;
  invoiceID?: string;
};

export interface XrpTransactionJSON {
  txid: string;
  chain: string;
  network: string;
  blockHeight: number;
  blockHash: string;
  blockTime: string;
  blockTimeNormalized: string;
  fee: number;
  value: number;
  from: string;
  to: string;
  nonce: number;
  currency?: string;
  invoiceID?: string;
}

export type IXrpCoin = ICoin & {};
