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
import { Component, Injectable, Input } from '@angular/core';
import { Nav } from 'ionic-angular';
import { ChainNetwork } from '../../providers/api/api';

@Injectable()
@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  @Input()
  public chainNetwork: ChainNetwork;

  constructor(public nav: Nav) {}

  public openPage(page: string): void {
    this.nav.push(page, {
      chain: this.chainNetwork.chain,
      network: this.chainNetwork.network
    });
  }
}
