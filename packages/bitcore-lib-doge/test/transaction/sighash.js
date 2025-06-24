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

var buffer = require('buffer');

var chai = require('chai');
var should = chai.should();
var bitcore = require('../../');
var Script = bitcore.Script;
var Transaction = bitcore.Transaction;
var sighash = Transaction.sighash;

var vectors_sighash = require('../data/sighash.json');

describe('sighash', function() {

  vectors_sighash.forEach(function(vector, i) {
    if (i === 0) {
      // First element is just a row describing the next ones
      return;
    }
    it('test vector from bitcoind #' + i + ' (' + vector[4].substring(0, 16) + ')', function() {
      var txbuf = new buffer.Buffer(vector[0], 'hex');
      var scriptbuf = new buffer.Buffer(vector[1], 'hex');
      var subscript = Script(scriptbuf);
      var nin = vector[2];
      var nhashtype = vector[3];
      var sighashbuf = new buffer.Buffer(vector[4], 'hex');
      var tx = new Transaction(txbuf);

      //make sure transacion to/from buffer is isomorphic
      tx.uncheckedSerialize().should.equal(txbuf.toString('hex'));

      //sighash ought to be correct
      sighash.sighash(tx, nhashtype, nin, subscript).toString('hex').should.equal(sighashbuf.toString('hex'));
    });
  });
});
