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
var P2P = require('../../');
var Message = P2P.Messages.Message;
var Networks = require('bitcore-lib-doge').Networks;

describe('Message', function() {

  describe('@constructor', function() {
    it('construct with magic number and command', function() {
      var message = new Message({
        network: {
          networkMagic: 0xd9b4bef9
        },
        command: 'command'
      });
      should.exist(message);
      message.command.should.equal('command');
      message.network.networkMagic.should.equal(0xd9b4bef9);
    });
  });

  describe('#toBuffer', function() {
    it('serialize to a buffer', function() {
      var message = new Message({
        command: 'command',
        network: Networks.defaultNetwork
      });
      message.getPayload = function() {
        return new Buffer(0);
      };
      var buffer = message.toBuffer();
      var expectedBuffer = new Buffer('c0c0c0c0636f6d6d616e640000000000000000005df6e0e2', 'hex');
      buffer.should.deep.equal(expectedBuffer);
    });
  });

});
