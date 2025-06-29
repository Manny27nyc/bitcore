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
'use strict';

var chai = require('chai');
var should = chai.should();

var assert = require('assert');
var bitcore = require('bitcore-lib-doge');
var Data = require('./data/messages');
var P2P = require('../');
var BloomFilter = P2P.BloomFilter;

function getPayloadBuffer(messageBuffer) {
  return new Buffer(messageBuffer.slice(48), 'hex');
}

// convert a hex string to a bytes buffer
function ParseHex(str) {
  var result = [];
  while (str.length >= 2) {
    result.push(parseInt(str.substring(0, 2), 16));
    str = str.substring(2, str.length);
  }
  var buf = new Buffer(result, 16);
  return buf;
}

describe('BloomFilter', function() {

  it('#fromBuffer and #toBuffer round trip', function() {
    var testPayloadBuffer = getPayloadBuffer(Data.filterload.message);
    var filter = new BloomFilter.fromBuffer(testPayloadBuffer);
    filter.toBuffer().should.deep.equal(testPayloadBuffer);
  });

  // test data from: https://github.com/bitcoin/bitcoin/blob/master/src/test/bloom_tests.cpp

  it('serialize filter with public keys added', function() {

    var privateKey = bitcore.PrivateKey.fromWIF('QWgwfQXN1gD4grk6maDyNZm9kqAJoodPniGsdiS7ibCiqd4g9sMq');
    var publicKey = privateKey.toPublicKey();
    var filter = BloomFilter.create(2, 0.001, 0, BloomFilter.BLOOM_UPDATE_ALL);
    filter.insert(publicKey.toBuffer());
    filter.insert(bitcore.crypto.Hash.sha256ripemd160(publicKey.toBuffer()));

    var expectedFilter = BloomFilter.fromBuffer(ParseHex('0382e3b3080000000000000001'));
    filter.toBuffer().should.deep.equal(expectedFilter.toBuffer());

  });

  it('serialize to a buffer', function() {

    var filter = BloomFilter.create(3, 0.01, 0, BloomFilter.BLOOM_UPDATE_ALL);

    filter.insert(ParseHex('99108ad8ed9bb6274d3980bab5a85c048f0950c8'));
    assert(filter.contains(ParseHex('99108ad8ed9bb6274d3980bab5a85c048f0950c8')));
    // one bit different in first byte
    assert(!filter.contains(ParseHex('19108ad8ed9bb6274d3980bab5a85c048f0950c8')));
    filter.insert(ParseHex('b5a2c786d9ef4658287ced5914b37a1b4aa32eee'));
    assert(filter.contains(ParseHex("b5a2c786d9ef4658287ced5914b37a1b4aa32eee")));
    filter.insert(ParseHex('b9300670b4c5366e95b2699e8b18bc75e5f729c5'));
    assert(filter.contains(ParseHex('b9300670b4c5366e95b2699e8b18bc75e5f729c5')));

    var actual = filter.toBuffer();
    var expected = new Buffer('03614e9b050000000000000001', 'hex');

    actual.should.deep.equal(expected);
  });

 it('deserialize a buffer', function() {

   var buffer = new Buffer('03614e9b050000000000000001', 'hex');
   var filter = BloomFilter.fromBuffer(buffer);

   assert(filter.contains(ParseHex('99108ad8ed9bb6274d3980bab5a85c048f0950c8')));
   assert(!filter.contains(ParseHex('19108ad8ed9bb6274d3980bab5a85c048f0950c8')));
   assert(filter.contains(ParseHex("b5a2c786d9ef4658287ced5914b37a1b4aa32eee")));
   assert(filter.contains(ParseHex('b9300670b4c5366e95b2699e8b18bc75e5f729c5')));
 });

 it('#toBuffer and #fromBuffer round trip, with a large filter', function() {
   var filter = BloomFilter.create(10000, 0.001);
   var buffer = filter.toBuffer();
   new BloomFilter.fromBuffer(buffer).should.deep.equal(filter);
 });

});
