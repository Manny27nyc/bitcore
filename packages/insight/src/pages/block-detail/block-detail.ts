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
import { Component, Injectable } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { UTXO_CHAINS } from '../../constants';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { BlocksProvider } from '../../providers/blocks/blocks';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';
import { RedirProvider } from '../../providers/redir/redir';
import { TxsProvider } from '../../providers/transactions/transactions';
@Injectable()
@IonicPage({
  name: 'block-detail',
  segment: ':chain/:network/block/:blockHash',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-block-detail',
  templateUrl: 'block-detail.html'
})
export class BlockDetailPage {
  public loading = true;
  public errorMessage: string;
  public confirmations: number;
  public block: any = {
    tx: []
  };
  public chainNetwork: ChainNetwork;

  private blockHash: string;

  constructor(
    public navParams: NavParams,
    public currencyProvider: CurrencyProvider,
    public redirProvider: RedirProvider,
    public txProvider: TxsProvider,
    private blocksProvider: BlocksProvider,
    private apiProvider: ApiProvider,
    private priceProvider: PriceProvider
  ) {
    this.blockHash = navParams.get('blockHash');
    const chain: string = navParams.get('chain');
    const network: string = navParams.get('network');

    this.chainNetwork = {
      chain,
      network
    };
    this.apiProvider.changeNetwork(this.chainNetwork);
    this.currencyProvider.setCurrency(this.chainNetwork);
    this.priceProvider.setCurrency();
  }

  ionViewDidEnter() {
    this.blocksProvider.getBlock(this.blockHash, this.chainNetwork).subscribe(
      response => {
        let block;
        if (UTXO_CHAINS.includes(this.chainNetwork.chain)) {
          block = this.blocksProvider.toUtxoCoinAppBlock(response);
        }
        if (this.chainNetwork.chain === 'ETH') {
          block = this.blocksProvider.toEthAppBlock(response);
        }
        this.block = block;
        this.txProvider
          .getConfirmations(this.block.height, this.chainNetwork)
          .subscribe(confirmations => (this.confirmations = confirmations));
        this.loading = false;
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  }

  public goToPreviousBlock(): void {
    this.redirProvider.redir('block-detail', {
      blockHash: this.block.previousblockhash,
      chain: this.chainNetwork.chain,
      network: this.chainNetwork.network
    });
  }

  public goToNextBlock(): void {
    this.redirProvider.redir('block-detail', {
      blockHash: this.block.nextblockhash,
      chain: this.chainNetwork.chain,
      network: this.chainNetwork.network
    });
  }
}
