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
import { InsightApp } from './app.component';
import { TestBed, getTestBed } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { NavMock } from '../mocks';
import { PopoverController, MenuController } from 'ionic-angular';
import { ApiProvider } from '../providers/api/api';
import { CurrencyProvider } from '../providers/currency/currency';
import { DefaultProvider } from '../providers/default/default';
import { HttpModule } from '@angular/http';

describe('InsightApp', () => {
  let injector: TestBed;
  let app: InsightApp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PopoverController,
        InsightApp,
        Platform,
        MenuController,
        ApiProvider,
        CurrencyProvider,
        DefaultProvider
      ]
    });
    injector = getTestBed();
    app = injector.get(InsightApp);

    app['nav'] = <any>new NavMock();
  });

  it('initializes with three possible pages', () => {
    expect(app['pages'].length).toEqual(3);
  });

  it('initializes with a root page', () => {
    expect(app['rootPage']).not.toBe(null);
  });

  it('opens a page', () => {
    spyOn(app['menu'], 'close');
    spyOn(app['nav'], 'setRoot');
    app.openPage(app['pages'][1]);
    expect(app['menu']['close']).toHaveBeenCalled();
  });
});
