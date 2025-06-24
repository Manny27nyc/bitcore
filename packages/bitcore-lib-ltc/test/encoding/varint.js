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

var should = require('chai').should();
var bitcore = require('../..');
var BN = bitcore.crypto.BN;
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;
var Varint = bitcore.encoding.Varint;

describe('Varint', function() {

  it('should make a new varint', function() {
    var buf = Buffer.from('00', 'hex');
    var varint = new Varint(buf);
    should.exist(varint);
    varint.buf.toString('hex').should.equal('00');
    varint = Varint(buf);
    should.exist(varint);
    varint.buf.toString('hex').should.equal('00');

    //various ways to use the constructor
    Varint(Varint(0).toBuffer()).toNumber().should.equal(0);
    Varint(0).toNumber().should.equal(0);
    Varint(new BN(0)).toNumber().should.equal(0);
  });

  describe('#set', function() {
    
    it('should set a buffer', function() {
      var buf = Buffer.from('00', 'hex');
      var varint = Varint().set({buf: buf});
      varint.buf.toString('hex').should.equal('00');
      varint.set({});
      varint.buf.toString('hex').should.equal('00');
    });

  });

  describe('#fromString', function() {
    
    it('should set a buffer', function() {
      var buf = BufferWriter().writeVarintNum(5).concat();
      var varint = Varint().fromString(buf.toString('hex'));
      varint.toNumber().should.equal(5);
    });

  });

  describe('#toString', function() {
    
    it('should return a buffer', function() {
      var buf = BufferWriter().writeVarintNum(5).concat();
      var varint = Varint().fromString(buf.toString('hex'));
      varint.toString().should.equal('05');
    });

  });

  describe('#fromBuffer', function() {
    
    it('should set a buffer', function() {
      var buf = BufferWriter().writeVarintNum(5).concat();
      var varint = Varint().fromBuffer(buf);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromBufferReader', function() {
    
    it('should set a buffer reader', function() {
      var buf = BufferWriter().writeVarintNum(5).concat();
      var br = BufferReader(buf);
      var varint = Varint().fromBufferReader(br);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromBN', function() {
    
    it('should set a number', function() {
      var varint = Varint().fromBN(new BN(5));
      varint.toNumber().should.equal(5);
    });

  });

  describe('#fromNumber', function() {
    
    it('should set a number', function() {
      var varint = Varint().fromNumber(5);
      varint.toNumber().should.equal(5);
    });

  });

  describe('#toBuffer', function() {
    
    it('should return a buffer', function() {
      var buf = BufferWriter().writeVarintNum(5).concat();
      var varint = Varint(buf);
      varint.toBuffer().toString('hex').should.equal(buf.toString('hex'));
    });

  });

  describe('#toBN', function() {
    
    it('should return a buffer', function() {
      var varint = Varint(5);
      varint.toBN().toString().should.equal(new BN(5).toString());
    });

  });

  describe('#toNumber', function() {
    
    it('should return a buffer', function() {
      var varint = Varint(5);
      varint.toNumber().should.equal(5);
    });

  });

});
