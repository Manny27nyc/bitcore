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
import _ from 'lodash';

/*
 * notifications examples
 *
 * NewCopayer -
 * NewAddress -
 * NewTxProposal - (amount)
 * TxProposalAcceptedBy - (txProposalId, copayerId)
 * TxProposalRejectedBy -  (txProposalId, copayerId)
 * txProposalFinallyRejected - txProposalId
 * txProposalFinallyAccepted - txProposalId
 *
 * NewIncomingTx (address, txid)
 * NewOutgoingTx - (txProposalId, txid)
 *
 * data Examples:
 * { amount: 'xxx', address: 'xxx'}
 * { txProposalId: 'xxx', copayerId: 'xxx' }
 *
 * Data is meant to provide only the needed information
 * to notify the user
 *
 */

export interface INotification {
  version: string;
  createdOn: number;
  id: number;
  type: string;
  data: any;
  walletId: string;
  creatorId: string;
  isCreator: boolean;
}

export class Notification {
  version: string;
  createdOn: number;
  id: string | number;
  type: string;
  data: any;
  walletId: string;
  creatorId: string;
  isCreator: boolean;

  static create(opts) {
    opts = opts || {};

    const x = new Notification();

    x.version = '1.0.0';
    const now = Date.now();

    x.createdOn = Math.floor(now / 1000);
    x.id = _.padStart(now.toString(), 14, '0') + _.padStart(opts.ticker || 0, 4, '0');
    x.type = opts.type || 'general';
    x.data = opts.data;
    x.walletId = opts.walletId;
    x.creatorId = opts.creatorId;
    x.isCreator = opts.isCreator;

    return x;
  }

  static fromObj(obj) {
    const x = new Notification();

    x.version = obj.version;
    x.createdOn = obj.createdOn;
    x.id = obj.id;
    (x.type = obj.type), (x.data = obj.data);
    x.walletId = obj.walletId;
    x.creatorId = obj.creatorId;
    x.isCreator = obj.isCreator;

    return x;
  }
}
