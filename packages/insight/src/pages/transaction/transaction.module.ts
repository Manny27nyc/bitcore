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
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorComponentModule } from '../../components/error/error.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';
import { TransactionDetailsEthComponentModule } from '../../components/transaction-details-eth/transaction-details-eth.module';
import { TransactionDetailsComponentModule } from '../../components/transaction-details/transaction-details.module';
import { TransactionSummaryEthComponentModule } from '../../components/transaction-summary-eth/transaction-summary-eth.module';
import { TransactionSummaryComponentModule } from '../../components/transaction-summary/transaction-summary.module';
import { CopyToClipboardModule } from '../../directives/copy-to-clipboard/copy-to-clipboard.module';
import { TransactionPage } from './transaction';

@NgModule({
  declarations: [TransactionPage],
  imports: [
    IonicPageModule.forChild(TransactionPage),
    TransactionSummaryEthComponentModule,
    TransactionSummaryComponentModule,
    TransactionDetailsComponentModule,
    TransactionDetailsEthComponentModule,
    FooterComponentModule,
    HeadNavComponentModule,
    LoaderComponentModule,
    ErrorComponentModule,
    CopyToClipboardModule
  ],
  exports: [TransactionPage]
})
export class TransactionPageModule {}
