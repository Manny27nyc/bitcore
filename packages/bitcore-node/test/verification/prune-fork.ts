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
#!/usr/bin/env node

import * as _ from 'lodash';
import { BitcoinBlockStorage } from '../../src/models/block';
import { CoinStorage } from '../../src/models/coin';
import { Modules } from '../../src/modules';
import { Config } from '../../src/services/config';
import { Storage } from '../../src/services/storage';

if (require.main === module) {
  (async () => {
    const { CHAIN = '', NETWORK = '', HEIGHT } = process.env;
    const chain = CHAIN || '';
    const network = NETWORK || '';
    const startHeight = Number(HEIGHT) || 0;
    const chainConfig = Config.chainConfig({ chain, network });
    const FORKHEIGHT = chainConfig.forkHeight;
    const FORKFROM = chainConfig.parentChain;
    const forkHeight = Number(FORKHEIGHT);

    if (!FORKFROM || !FORKHEIGHT) {
      console.log(`There is no forkHeight or parentChain on the config for ${chain} ${network}`);
    }

    if (!chain || !network) {
      console.log('Please provide a CHAIN and NETWORK environment variable');
      process.exit(1);
    }

    console.log(
      'Searching for coins that can be removed from',
      chain,
      network,
      'comparing against',
      FORKFROM,
      '<',
      forkHeight
    );
    Modules.loadConfigured();
    await Storage.start();
    const tip = await BitcoinBlockStorage.getLocalTip({ chain, network });
    if (tip) {
      for (let i = startHeight; i <= forkHeight; i++) {
        let success = true;
        const unspentForkCoinsForBlock = await CoinStorage.collection
          .find({ chain, network, mintHeight: i, spentHeight: -2 })
          .toArray();

        for (const forkCoin of unspentForkCoinsForBlock) {
          const toPrune = await CoinStorage.collection.findOne({
            chain: FORKFROM,
            network,
            mintTxid: forkCoin.mintTxid,
            mintIndex: forkCoin.mintIndex
          });

          const shouldPrune = toPrune && toPrune.spentHeight <= forkHeight && toPrune.spentHeight > 0;
          if (shouldPrune) {
            success = false;
            const error = {
              model: 'coin',
              err: true,
              type: 'FORK_PRUNE_COIN',
              payload: { coin: forkCoin, blockNum: i }
            };
            console.log(JSON.stringify(error));
          }
        }
        console.log(JSON.stringify({ block: i, success, forkCoins: unspentForkCoinsForBlock.length }));
      }
    }
    process.exit(0);
  })();
}
