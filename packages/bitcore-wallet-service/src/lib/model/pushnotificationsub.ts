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
export interface IPushNotificationSub {
  version: string;
  createdOn: number;
  copayerId: string;
  token: string;
  packageName: string;
  platform: string;
  walletId: string;
}
export class PushNotificationSub {
  version: string;
  createdOn: number;
  copayerId: string;
  token: string;
  packageName: string;
  platform: string;
  walletId: string;

  static create(opts) {
    opts = opts || {};

    const x = new PushNotificationSub();

    x.version = '1.0.0';
    x.createdOn = Math.floor(Date.now() / 1000);
    x.copayerId = opts.copayerId;
    x.token = opts.token;
    x.packageName = opts.packageName;
    x.platform = opts.platform;
    x.walletId = opts.walletId;
    return x;
  }

  static fromObj(obj) {
    const x = new PushNotificationSub();

    x.version = obj.version;
    x.createdOn = obj.createdOn;
    x.copayerId = obj.copayerId;
    x.token = obj.token;
    x.packageName = obj.packageName;
    x.platform = obj.platform;
    x.walletId = obj.walletId;
    return x;
  }
}
