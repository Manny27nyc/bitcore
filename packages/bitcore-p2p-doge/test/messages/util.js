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

/* jshint unused: false */

var should = require('chai').should();
var utils = require('../../lib/messages/utils');
var bitcore = require('bitcore-lib-doge');
var BufferReader = bitcore.encoding.BufferReader;

describe('Message Utils', function() {

  describe('checkFinished', function() {
    it('should throw an error if buffer reader is not finished', function() {
      /*jshint immed: false */
      var buffer = new Buffer(Array(32));
      var br = new BufferReader(buffer);
      (function() {
        utils.checkFinished(br);
      }).should.throw('Data still available after parsing');
    });
  });

  describe('sanitizeStartStop', function() {
    it('should throw an error if starts is invalid length', function() {
      /*jshint immed: false */
      var stop = '000000000000000013413cf2536b491bf0988f52e90c476ffeb701c8bfdb1db9';
      (function() {
        utils.sanitizeStartStop({starts: ['0000'], stop: stop});
      }).should.throw('Invalid hash');
    });
    it('should keep buffers as buffers', function() {
      /*jshint immed: false */
      var starts = [new Buffer(Array(32))];
      var obj = utils.sanitizeStartStop({starts: starts});
      obj.starts[0].should.deep.equal(starts[0]);
    });
  });

});
