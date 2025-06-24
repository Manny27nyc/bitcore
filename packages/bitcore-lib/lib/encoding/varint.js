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

var BufferWriter = require('./bufferwriter');
var BufferReader = require('./bufferreader');
var BN = require('../crypto/bn');

var Varint = function Varint(buf) {
  if (!(this instanceof Varint))
    return new Varint(buf);
  if (Buffer.isBuffer(buf)) {
    this.buf = buf;
  } else if (typeof buf === 'number') {
    var num = buf;
    this.fromNumber(num);
  } else if (buf instanceof BN) {
    var bn = buf;
    this.fromBN(bn);
  } else if (buf) {
    var obj = buf;
    this.set(obj);
  }
};

Varint.prototype.set = function(obj) {
  this.buf = obj.buf || this.buf;
  return this;
};

Varint.prototype.fromString = function(str) {
  this.set({
    buf: Buffer.from(str, 'hex')
  });
  return this;
};

Varint.prototype.toString = function() {
  return this.buf.toString('hex');
};

Varint.prototype.fromBuffer = function(buf) {
  this.buf = buf;
  return this;
};

Varint.prototype.fromBufferReader = function(br) {
  this.buf = br.readVarintBuf();
  return this;
};

Varint.prototype.fromBN = function(bn) {
  this.buf = BufferWriter().writeVarintBN(bn).concat();
  return this;
};

Varint.prototype.fromNumber = function(num) {
  this.buf = BufferWriter().writeVarintNum(num).concat();
  return this;
};

Varint.prototype.toBuffer = function() {
  return this.buf;
};

Varint.prototype.toBN = function() {
  return BufferReader(this.buf).readVarintBN();
};

Varint.prototype.toNumber = function() {
  return BufferReader(this.buf).readVarintNum();
};

module.exports = Varint;
