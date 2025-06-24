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
import { ObjectID } from 'mongodb';
import { StorageService } from '../services/storage';
import { BaseModel } from './base';

export interface IRateLimit {
  _id?: ObjectID;
  identifier: string;
  method: string;
  period: string;
  count: number;
  time?: Date;
  expireAt?: Date;
}

export enum RateLimitTimes {
  None = 0,
  Second = 1000,
  Minute = RateLimitTimes.Second * 60,
  Hour = RateLimitTimes.Minute * 60,
  Day = RateLimitTimes.Hour * 24,
  Month = RateLimitTimes.Day * 30,
  Year = RateLimitTimes.Day * 365
}

export class RateLimitModel extends BaseModel<IRateLimit> {
  constructor(storage?: StorageService) {
    super('ratelimits', storage);
  }
  allowedPaging = [];

  onConnect() {
    this.collection.createIndex({ identifier: 1, time: 1, method: 1, count: 1 }, { background: true });
    this.collection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0, background: true });
  }

  incrementAndCheck(identifier: string, method: string) {
    return Promise.all([
      this.collection.findOneAndUpdate(
        { identifier, method, period: 'second', time: { $gte: new Date(Date.now() - RateLimitTimes.Second) } },
        {
          $setOnInsert: { time: new Date(), expireAt: new Date(Date.now() + 2 * RateLimitTimes.Second) },
          $inc: { count: 1 }
        },
        { upsert: true, returnOriginal: false }
      ),
      this.collection.findOneAndUpdate(
        { identifier, method, period: 'minute', time: { $gte: new Date(Date.now() - RateLimitTimes.Minute) } },
        {
          $setOnInsert: { time: new Date(), expireAt: new Date(Date.now() + 2 * RateLimitTimes.Minute) },
          $inc: { count: 1 }
        },
        { upsert: true, returnOriginal: false }
      ),
      this.collection.findOneAndUpdate(
        { identifier, method, period: 'hour', time: { $gte: new Date(Date.now() - RateLimitTimes.Hour) } },
        {
          $setOnInsert: { time: new Date(), expireAt: new Date(Date.now() + 2 * RateLimitTimes.Hour) },
          $inc: { count: 1 }
        },
        { upsert: true, returnOriginal: false }
      )
    ]);
  }
}

export let RateLimitStorage = new RateLimitModel();
