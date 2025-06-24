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
import { BaseModule } from '..';
import { BCHStateProvider } from '../../providers/chain-state/bch/bch';
import { BitcoinP2PWorker } from '../bitcoin/p2p';
import { VerificationPeer } from '../bitcoin/VerificationPeer';

export default class BCHModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('BCH', 'bitcore-lib-cash', 'bitcore-p2p-cash');
    services.P2P.register('BCH', BitcoinP2PWorker);
    services.CSP.registerService('BCH', new BCHStateProvider());
    services.Verification.register('BCH', VerificationPeer);
  }
}
