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
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';

@Injectable()
@IonicPage({
  name: 'broadcast-tx',
  segment: ':chain/:network/broadcast-tx',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-broadcast-tx',
  templateUrl: 'broadcast-tx.html'
})
export class BroadcastTxPage {
  public title: string;
  public transaction: string;
  public txForm: FormGroup;

  private toast: any;
  private chainNetwork: ChainNetwork;

  constructor(
    private toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private httpClient: HttpClient,
    private apiProvider: ApiProvider,
    private priceProvider: PriceProvider,
    private currencyProvider: CurrencyProvider
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

    this.title = 'Broadcast Transaction';
    this.txForm = formBuilder.group({
      rawData: ['', Validators.pattern(/^[0-9A-Fa-f]+$/)]
    });
  }

  public send(): void {
    const postData: any = {
      rawtx: this.transaction
    };

    this.httpClient
      .post(this.apiProvider.getUrl(this.chainNetwork) + '/tx/send', postData)
      .subscribe(
        response => {
          this.presentToast(true, response);
        },
        err => {
          this.presentToast(false, err);
        }
      );
  }

  private presentToast(success: boolean, response: any): void {
    const message: string = success
      ? 'Transaction successfully broadcast. Trasaction id: ' + response.txid
      : 'An error occurred: ' + response;
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message,
      position: 'bottom',
      showCloseButton: true,
      dismissOnPageChange: true
    });
    this.toast.present();
  }
}
