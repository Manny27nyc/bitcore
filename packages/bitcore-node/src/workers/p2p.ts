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
import 'source-map-support/register';
import logger from '../logger';
import { Modules } from '../modules';
import { Config } from '../services/config';
import { Event } from '../services/event';
import { P2P } from '../services/p2p';
import { Storage } from '../services/storage';
import '../utils/polyfills';
require('heapdump');
const services: Array<any> = [];

export const P2pWorker = async () => {
  process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection at:', error.stack || error);
    stop();
  });
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);

  services.push(Storage, Event);

  Modules.loadConfigured();

  // start a particular chain and network, or all of them
  const { CHAIN: chain, NETWORK: network } = process.env;
  if (chain && network) {
    const chainConfig = Config.chainConfig({ chain, network });
    const p2pClass = P2P.get(chain);
    const worker = new p2pClass({
      chain,
      network,
      chainConfig
    });
    services.push(worker);
  } else {
    services.push(P2P);
  }

  for (const service of services) {
    try {
      await service.start();
    } catch (e) {
      logger.error('P2P Worker died with', e);
    }
  }
};

const stop = async () => {
  console.log(`Shutting down ${process.pid}`);
  for (const service of services.reverse()) {
    await service.stop();
  }
  process.exit();
};

if (require.main === module) {
  P2pWorker();
}
