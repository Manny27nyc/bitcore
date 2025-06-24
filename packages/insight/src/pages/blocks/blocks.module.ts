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
import { FooterComponentModule } from '../../components/footer/footer.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LatestBlocksComponentModule } from '../../components/latest-blocks/latest-blocks.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';
import { BlocksPage } from './blocks';

@NgModule({
  declarations: [BlocksPage],
  imports: [
    IonicPageModule.forChild(BlocksPage),
    FooterComponentModule,
    HeadNavComponentModule,
    LatestBlocksComponentModule,
    LoaderComponentModule
  ],
  exports: [BlocksPage]
})
export class BlocksPageModule {}
