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

var bitcore = require('bitcore-lib');
var BloomFilter = require('bloom-filter');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;

/**
 * A constructor for Bloom Filters
 * @see https://github.com/bitpay/bloom-filter
 * @param {Buffer} - payload
 */
BloomFilter.fromBuffer = function fromBuffer(payload) {
  var obj = {};
  var parser = new BufferReader(payload);
  var length = parser.readVarintNum();
  obj.vData = [];
  for(var i = 0; i < length; i++) {
    obj.vData.push(parser.readUInt8());
  }
  obj.nHashFuncs = parser.readUInt32LE();
  obj.nTweak = parser.readUInt32LE();
  obj.nFlags = parser.readUInt8();
  return new BloomFilter(obj);
};

/**
 * @returns {Buffer}
 */
BloomFilter.prototype.toBuffer = function toBuffer() {
  var bw = new BufferWriter();
  bw.writeVarintNum(this.vData.length);
  for(var i = 0; i < this.vData.length; i++) {
    bw.writeUInt8(this.vData[i]);
  }
  bw.writeUInt32LE(this.nHashFuncs);
  bw.writeUInt32LE(this.nTweak);
  bw.writeUInt8(this.nFlags);
  return bw.concat();
};

module.exports = BloomFilter;
