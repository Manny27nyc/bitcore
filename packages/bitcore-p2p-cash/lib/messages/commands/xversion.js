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

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib-cash');
var BufferUtil = bitcore.util.buffer;

/**
 * Transports a generic key-value map that holds the configuration and version parameters.
 * https://github.com/BitcoinUnlimited/BitcoinUnlimited/blob/release/doc/xversionmessage.md
 * Placeholder until it's actually made use of
 * @extends Message
 * @constructor
 */
function XversionMessage(arg, options) {
  Message.call(this, options);
  this.command = 'Xversion';
}
inherits(XversionMessage, Message);

XversionMessage.prototype.setPayload = function() {};

XversionMessage.prototype.getPayload = function() {
  return BufferUtil.EMPTY_BUFFER;
};

module.exports = XversionMessage;
