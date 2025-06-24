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
import { Injectable } from '@angular/core';

@Injectable()
export class DefaultProvider {
  private defaults: {
    '%CHAIN%': string;
    '%API_PREFIX%': string;
    '%NETWORK%': string;
    '%NUM_BLOCKS%': string;
  } = {
    '%CHAIN%': process.env.CHAIN || 'BTC',
    '%API_PREFIX%': process.env.API_PREFIX || '/api',
    '%NETWORK%': process.env.NETWORK || 'mainnet',
    '%NUM_BLOCKS%': process.env.NUM_BLOCKS || '15'
  };

  constructor() {}

  public getDefault(str: string): string {
    return this.defaults[str] !== undefined ? this.defaults[str] : str;
  }

  public setDefault(str: string, value: any): void {
    this.defaults[str] = value;
  }
}
