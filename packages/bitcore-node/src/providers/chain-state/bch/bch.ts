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
import { CacheStorage } from '../../../models/cache';
import { GetEstimateSmartFeeParams } from '../../../types/namespaces/ChainStateProvider';
import { BTCStateProvider } from '../btc/btc';

export class BCHStateProvider extends BTCStateProvider {
  constructor(chain: string = 'BCH') {
    super(chain);
  }

  async getFee(params: GetEstimateSmartFeeParams) {
    const { chain, network } = params;
    const cacheKey = `getFee-${chain}-${network}`;
    return CacheStorage.getGlobalOrRefresh(
      cacheKey,
      async () => {
        return { feerate: await this.getRPC(chain, network).getEstimateFee() };
      },
      30 * CacheStorage.Times.Minute
    );
  }
}
