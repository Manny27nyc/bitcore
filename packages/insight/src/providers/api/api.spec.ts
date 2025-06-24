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
import { ApiProvider } from '../api/api';
import { DefaultProvider } from '../default/default';

describe('ApiProvider', () => {
  let api: ApiProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ApiProvider, DefaultProvider]
    });
  });

  beforeEach(inject([ApiProvider], provider => {
    api = provider;
  }));

  it('initializes', () => {
    expect(api).not.toBeNull();
  });
});
