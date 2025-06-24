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
export interface ITxProposalAction {
  version: string;
  createdOn: number;
  copayerId: string;
  type: string;
  signatures: string[];
  xpub: string;
  comment: string;
}
export class TxProposalAction {
  version: string;
  createdOn: number;
  copayerId: string;
  type: string;
  signatures: string[];
  xpub: string;
  comment: string;

  static create(opts) {
    opts = opts || {};

    let x = new TxProposalAction();

    x.version = '1.0.0';
    x.createdOn = Math.floor(Date.now() / 1000);
    x.copayerId = opts.copayerId;
    x.type = opts.type;
    x.signatures = opts.signatures;
    x.xpub = opts.xpub;
    x.comment = opts.comment;

    return x;
  }

  static fromObj(obj) {
    let x = new TxProposalAction();

    x.version = obj.version;
    x.createdOn = obj.createdOn;
    x.copayerId = obj.copayerId;
    x.type = obj.type;
    x.signatures = obj.signatures;
    x.xpub = obj.xpub;
    x.comment = obj.comment;

    return x;
  }
}
