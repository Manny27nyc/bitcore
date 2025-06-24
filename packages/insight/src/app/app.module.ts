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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BlocksPage, HomePage, PagesModule } from '../pages';
import { AddressProvider } from '../providers/address/address';
import { ApiProvider } from '../providers/api/api';
import { BlocksProvider } from '../providers/blocks/blocks';
import { CurrencyProvider } from '../providers/currency/currency';
import { DefaultProvider } from '../providers/default/default';
import { HttpErrorInterceptor } from '../providers/error-handler/error-handler';
import { Logger } from '../providers/logger/logger';
import { PriceProvider } from '../providers/price/price';
import { RedirProvider } from '../providers/redir/redir';
import { SearchProvider } from '../providers/search/search';
import { TxsProvider } from '../providers/transactions/transactions';
import { InsightApp } from './app.component';

@NgModule({
  declarations: [InsightApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
    IonicModule.forRoot(InsightApp, {
      mode: 'md',
      animate: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [InsightApp, HomePage, BlocksPage],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ApiProvider,
    CurrencyProvider,
    BlocksProvider,
    TxsProvider,
    DefaultProvider,
    PriceProvider,
    SearchProvider,
    RedirProvider,
    Logger,
    AddressProvider
  ]
})
export class AppModule {}
