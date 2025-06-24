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
import express = require('express');
import config from '../config';
import { PerformanceTracker } from '../decorators/Loggify';
import { StateStorage } from '../models/state';
import { ChainNetwork } from '../types/ChainNetwork';
const router = express.Router({ mergeParams: true });

router.get('/enabled-chains', function(_, res) {
  const chainNetworks = new Array<ChainNetwork>();
  for (let chain of Object.keys(config.chains)) {
    for (let network of Object.keys(config.chains[chain])) {
      chainNetworks.push({ chain, network });
    }
  }
  res.json(chainNetworks);
});

router.get('/performance', function(_, res) {
  res.json(PerformanceTracker);
});

router.get('/:chain/:network/sync', async function(req, res) {
  let { chain, network } = req.params;
  const state = await StateStorage.collection.findOne({});
  const initialSyncComplete =
    state && state.initialSyncComplete && state.initialSyncComplete.includes(`${chain}:${network}`);
  res.json({ initialSyncComplete });
});

module.exports = {
  router,
  path: '/status'
};
