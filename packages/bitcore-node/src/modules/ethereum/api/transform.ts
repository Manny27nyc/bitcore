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
import { Transform } from 'stream';
import { MongoBound } from '../../../models/base';
import { IEthTransaction } from '../types';

export class EthListTransactionsStream extends Transform {
  constructor(private walletAddresses: Array<string>) {
    super({ objectMode: true });
  }

  async _transform(transaction: MongoBound<IEthTransaction>, _, done) {
    let sending = this.walletAddresses.includes(transaction.from);
    if (sending) {
      let sendingToOurself = this.walletAddresses.includes(transaction.to);
      if (!sendingToOurself) {
        this.push(
          JSON.stringify({
            id: transaction._id,
            txid: transaction.txid,
            fee: transaction.fee,
            category: 'send',
            satoshis: -transaction.value,
            height: transaction.blockHeight,
            from: transaction.from,
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            receipt: transaction.receipt,
            address: transaction.to,
            blockTime: transaction.blockTimeNormalized,
            internal: transaction.internal,
            abiType: transaction.abiType,
            error: transaction.error
          }) + '\n'
        );
      } else {
        this.push(
          JSON.stringify({
            id: transaction._id,
            txid: transaction.txid,
            fee: transaction.fee,
            category: 'move',
            satoshis: transaction.value,
            height: transaction.blockHeight,
            from: transaction.from,
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            receipt: transaction.receipt,
            address: transaction.to,
            blockTime: transaction.blockTimeNormalized,
            internal: transaction.internal,
            abiType: transaction.abiType,
            error: transaction.error
          }) + '\n'
        );
      }
    } else {
      const weReceived = this.walletAddresses.includes(transaction.to);
      if (weReceived) {
        this.push(
          JSON.stringify({
            id: transaction._id,
            txid: transaction.txid,
            fee: transaction.fee,
            category: 'receive',
            satoshis: transaction.value,
            height: transaction.blockHeight,
            from: transaction.from,
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            receipt: transaction.receipt,
            address: transaction.to,
            blockTime: transaction.blockTimeNormalized,
            internal: transaction.internal,
            abiType: transaction.abiType,
            error: transaction.error
          }) + '\n'
        );
      }
    }
    return done();
  }
}
