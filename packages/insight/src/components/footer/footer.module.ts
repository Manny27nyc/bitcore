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
import { IonicModule } from 'ionic-angular';
import { DenominationComponentModule } from '../denomination/denomination.module';
import { FooterComponent } from './footer';

@NgModule({
  declarations: [FooterComponent],
  imports: [IonicModule, DenominationComponentModule],
  exports: [FooterComponent]
})
export class FooterComponentModule {}
