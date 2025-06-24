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
var async = require('async');
var chai = require('chai');
var mongodb = require('mongodb');
var should = chai.should();
var { ChainService } = require('../../ts_build/lib/chain');


describe('Chain ETH', function() {
 
  it('should transform addresses to the db', function() {

    let x = {address: '0x01'};
    ChainService.addressToStorageTransform('eth', 'abc', x);
    x.address.should.equal('0x01:abc');
  });

  it('should transform addresses from the db', function() {

    let x = {address: '0x01:dfg'};
    ChainService.addressFromStorageTransform('eth', 'dfg', x);
    x.address.should.equal('0x01');
  });

});

