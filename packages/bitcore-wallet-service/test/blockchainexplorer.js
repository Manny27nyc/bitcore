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

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var { BlockChainExplorer } = require('../ts_build/lib/blockchainexplorer');

describe('BlockChain explorer', function() {
  describe('#constructor', function() {
    it('should return a blockchain explorer with basic methods', function() {
      var exp = new BlockChainExplorer({
        coin: 'btc',
        network: 'testnet',
      });
      should.exist(exp);
      exp.should.respondTo('broadcast');
      exp.should.respondTo('getUtxos');
      exp.should.respondTo('getTransactions');
      exp.should.respondTo('getAddressActivity');
      exp.should.respondTo('estimateFee');
      exp.should.respondTo('initSocket');
      var exp = new BlockChainExplorer({
        network: 'livenet',
      });
      should.exist(exp);

      var exp2 = new BlockChainExplorer({
        provider: 'v8',
        coin: 'btc',
        network: 'livenet',
      });
      should.exist(exp2);
      exp2.should.respondTo('broadcast');
      exp2.should.respondTo('getUtxos');
      exp2.should.respondTo('getTransactions');
      exp2.should.respondTo('getAddressActivity');
      exp2.should.respondTo('estimateFee');
      exp2.should.respondTo('initSocket');
      exp2.should.respondTo('register');
      exp2.should.respondTo('addAddresses');

    });
    it('should fail on unsupported provider', function() {
      (function() {
        var exp = new BlockChainExplorer({
          provider: 'dummy',
          coin: 'btc',
        });
      }).should.throw('not supported');
    });
  });
  describe('#v8', function() {
    it.skip('should sign registration', function() {
      var exp = new BlockChainExplorer({
        provider: 'v8',
        coin: 'btc',
        network: 'livenet',
      });
      should.exist(exp);

      exp.register
    });
  });
});
