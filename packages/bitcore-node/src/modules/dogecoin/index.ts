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
import { DOGEStateProvider } from '../../providers/chain-state/doge/doge';
import { VerificationPeer } from '../bitcoin/VerificationPeer';
import { DogecoinP2PWorker } from './p2p';

export default class DOGEModule extends BaseModule {
  constructor(services) {
    super(services);
    services.Libs.register('DOGE', 'bitcore-lib-doge', 'bitcore-p2p-doge');
    services.P2P.register('DOGE', DogecoinP2PWorker);
    services.CSP.registerService('DOGE', new DOGEStateProvider());
    services.Verification.register('DOGE', VerificationPeer);
  }
}
