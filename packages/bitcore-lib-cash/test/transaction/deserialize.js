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
'use strict';

var Transaction = require('../../lib/transaction');

var vectors_valid = require('../data/bitcoind/tx_valid.json');
var vectors_invalid = require('../data/bitcoind/tx_invalid.json');

describe('Transaction deserialization', function() {

  describe('valid transaction test case', function() {
    var index = 0;
    vectors_valid.forEach(function(vector) {
      it('vector #' + index, function() {
        if (vector.length > 1) {
          var hexa = vector[1];
          Transaction(hexa).serialize(true).should.equal(hexa);
          index++;
        }
      });
    });
  });
  describe('invalid transaction test case', function() {
    var index = 0;
    vectors_invalid.forEach(function(vector) {
      it('invalid vector #' + index, function() {
        if (vector.length > 1) {
          var hexa = vector[1];
          Transaction(hexa).serialize(true).should.equal(hexa);
          index++;
        }
      });
    });
  });
});
