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
/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { DefaultProvider } from './default';

describe('DefaultProvider', () => {
  let defaults: DefaultProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DefaultProvider]
    });
  });

  beforeEach(inject([DefaultProvider], provider => {
    defaults = provider;
  }));

  it('initializes', () => {
    expect(defaults).not.toBeNull();
  });

  it('has defaults', () => {
    expect(defaults.getDefault('%CHAIN%')).toBe('BTC');
    expect(defaults.getDefault('%API_PREFIX%')).toBe('/api');
    expect(defaults.getDefault('%NETWORK%')).toBe('regtest');
  });
});
