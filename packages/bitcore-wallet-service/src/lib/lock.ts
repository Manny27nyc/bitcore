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
import _ from 'lodash';
import { Storage } from './storage';

const $ = require('preconditions').singleton();
const Common = require('./common');
const Defaults = Common.Defaults;
const Errors = require('./errors/errordefinitions');
const ACQUIRE_RETRY_STEP = 50; // ms

export class Lock {
  storage: Storage;
  constructor(storage: Storage, opts = {}) {
    opts = opts || {};

    this.storage = storage;
  }

  acquire(token, opts, cb, timeLeft?) {
    opts = opts || {};

    opts.lockTime = opts.lockTime || Defaults.LOCK_EXE_TIME;

    this.storage.acquireLock(token, Date.now() + opts.lockTime, err => {
      // Lock taken?
      if (err && err.message && err.message.indexOf('E11000 ') !== -1) {
        // Lock expired?
        this.storage.clearExpiredLock(token, () => {});
        // Waiting time for lock has expired
        if (timeLeft < 0) {
          return cb('LOCKED');
        }

        if (!_.isUndefined(opts.waitTime)) {
          if (_.isUndefined(timeLeft)) {
            timeLeft = opts.waitTime;
          } else {
            timeLeft -= ACQUIRE_RETRY_STEP;
          }
        }

        return setTimeout(this.acquire.bind(this, token, opts, cb, timeLeft), ACQUIRE_RETRY_STEP);

        // Actual DB error
      } else if (err) {
        return cb(err);

        // Lock available
      } else {
        return cb(null, icb => {
          if (!icb) icb = () => {};
          this.storage.releaseLock(token, icb);
        });
      }
    });
  }

  runLocked(token, opts, cb, task) {
    $.shouldBeDefined(token, 'Failed state: token undefined at <runLocked()>');

    this.acquire(token, opts, (err, release) => {
      if (err == 'LOCKED') return cb(Errors.WALLET_BUSY);
      if (err) return cb(err);

      const _cb = function() {
        cb.apply(null, arguments);
        release();
      };
      task(_cb);
    });
  }
}
