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
import { LTCStateProvider } from '../../providers/chain-state/ltc/ltc';
import { VerificationPeer } from '../bitcoin/VerificationPeer';
import { LitecoinP2PWorker } from './p2p';

export default class LTCModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('LTC', 'bitcore-lib-ltc', 'bitcore-p2p');
    services.P2P.register('LTC', LitecoinP2PWorker);
    services.CSP.registerService('LTC', new LTCStateProvider());
    services.Verification.register('LTC', VerificationPeer);
  }
}
