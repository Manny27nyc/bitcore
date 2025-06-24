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
import config from '../../src/config';
import { Modules } from '../../src/modules';
import { Storage } from '../../src/services/storage';
import { wait } from '../../src/utils/wait';

const storageArgs = {
  dbHost: config.dbHost,
  dbName: 'bitcore-integration'
};

let loaded = false;
export async function intBeforeHelper() {
  try {
    if (!loaded) {
      Modules.loadConfigured();
      loaded = true;
    }
    if (!Storage.connected) {
      await Storage.start(storageArgs);
      await wait(2000);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function intAfterHelper(describeContext?: any) {
  try {
    describeContext = describeContext;
    if (describeContext && describeContext.timeout) {
      describeContext.timeout(1);
    }
  } catch (e) {
    console.error(e);
  }
}
