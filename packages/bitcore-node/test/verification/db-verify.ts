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
import { Modules } from '../../src/modules';
import { Config } from '../../src/services/config';
import { Storage } from '../../src/services/storage';
import { IVerificationPeer, Verification } from '../../src/services/verification';

if (require.main === module) {
  (async () => {
    const { CHAIN = '', NETWORK = '', HEIGHT, VERIFYSPENDS } = process.env;
    const resumeHeight = Number(HEIGHT) || 1;
    const chain = CHAIN || '';
    const network = NETWORK || '';

    Modules.loadConfigured();
    const chainConfig = Config.chainConfig({ chain, network });

    let worker: IVerificationPeer;
    if (Verification.get(CHAIN)) {
      const workerClass = Verification.get(CHAIN);
      worker = new workerClass({ chain, network, chainConfig });
      worker.connect();
      if (VERIFYSPENDS) {
        worker.enableDeepScan();
      }

      await Storage.start();
      if (!chain || !network) {
        console.log('Please provide a CHAIN and NETWORK environment variable');
        process.exit(1);
      }
      const tip = await BitcoinBlockStorage.getLocalTip({ chain, network });

      if (tip) {
        for (let i = resumeHeight; i <= tip.height; i++) {
          const { success } = await worker.validateDataForBlock(i, tip.height, true);
          console.log({ block: i, success });
        }
      }
    }
    process.exit(0);
  })();
}
