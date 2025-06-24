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

var expect = require('chai').expect;
var should = require('chai').should();
var bitcore = require('..');
var convertBits = bitcore.util.convertBits;

describe('convertBits', function() {

  it('should convert 1', function() {
    var a = convertBits([1], 16, 10);
    a.should.deep.equal([0,16]);
  });

  it('should convert 1,2', function() {
    var a = convertBits([1,2], 16, 10);
    a.should.deep.equal([0,16,0,512]);
  });


  it('should fail to convert 16', function() {
    (function() { convertBits([16], 2, 10); }).should.throw('Invalid Argument: value 16');
  });



});

