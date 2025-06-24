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
var $ = bitcore.util.preconditions;
var BufferWriter = bitcore.encoding.BufferWriter;
var Hash = bitcore.crypto.Hash;

/**
 * Base message that can be inherited to add an additional
 * `getPayload` method to modify the message payload.
 * @param {Object=} options
 * @param {String=} options.command
 * @param {Network=} options.network
 * @constructor
 */
function Message(options) {
  this.command = options.command;
  this.network = options.network;
}

/**
 * @returns {Buffer} - Serialized message
 * @constructor
 */
Message.prototype.toBuffer = Message.prototype.serialize = function() {
  $.checkState(this.network, 'Need to have a defined network to serialize message');
  var commandBuf = new Buffer(Array(12));
  commandBuf.write(this.command, 'ascii');

  var payload = this.getPayload();
  var checksum = Hash.sha256sha256(payload).slice(0, 4);

  var bw = new BufferWriter();
  bw.write(this.network.networkMagic);
  bw.write(commandBuf);
  bw.writeUInt32LE(payload.length);
  bw.write(checksum);
  bw.write(payload);

  return bw.concat();
};

module.exports = Message;
