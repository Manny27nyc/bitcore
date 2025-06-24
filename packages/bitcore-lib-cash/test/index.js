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
"use strict";

var should = require('chai').should();
var bitcore = require('../');

describe('#versionGuard', function() {
  it('global._bitcore should be defined', function() {
    should.equal(global._bitcoreCash, bitcore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      bitcore.versionGuard('version');
    }).should.throw('More than one instance of bitcore');
  });
});
