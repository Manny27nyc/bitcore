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
import { Component, Injectable, Input } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { BlocksProvider } from '../../providers/blocks/blocks';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';

@Injectable()
@IonicPage({
  name: 'blocks',
  segment: ':chain/:network/blocks',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-blocks',
  templateUrl: 'blocks.html'
})
export class BlocksPage {
  public loading = true;
  public blocks;
  public chainNetwork: ChainNetwork;

  constructor(
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private blocksProvider: BlocksProvider,
    private currencyProvider: CurrencyProvider,
    private priceProvider: PriceProvider
  ) {
    const chain: string = navParams.get('chain');
    const network: string = navParams.get('network');
    this.chainNetwork = {
      chain,
      network
    };
    this.apiProvider.changeNetwork(this.chainNetwork);
    this.currencyProvider.setCurrency(this.chainNetwork);
    this.priceProvider.setCurrency();

    this.blocksProvider.getBlocks(this.chainNetwork).subscribe(
      blocks => {
        this.blocks = blocks;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
