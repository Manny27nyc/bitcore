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
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import _ from 'lodash';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
@Component({
  selector: 'denomination',
  templateUrl: 'denomination.html'
})
export class DenominationComponent {
  public units: any = [];
  public availableNetworks;
  public currencySymbol;
  public showUnits = false;

  constructor(
    public viewCtrl: ViewController,
    public api: ApiProvider,
    public navParams: NavParams
  ) {}

  public ionViewDidEnter() {
    this.currencySymbol = this.navParams.data.currencySymbol;
    this.availableNetworks = this.api.networkSettings.availableNetworks;
    this.showUnits = _.some(
      this.availableNetworks,
      this.api.networkSettings.selectedNetwork
    )
      ? true
      : false;
    this.units = [
      'USD',
      this.api.networkSettings.selectedNetwork.chain,
      'm' + this.api.networkSettings.selectedNetwork.chain
    ];
  }

  public changeUnit(unit: string): void {
    this.currencySymbol = unit;
    this.viewCtrl.dismiss({
      chainNetwork: this.navParams.data.config,
      currencySymbol: this.currencySymbol
    });
  }

  public changeExplorer(chainNetwork: ChainNetwork): void {
    this.viewCtrl.dismiss({
      chainNetwork,
      currencySymbol: this.currencySymbol
    });
  }
}
