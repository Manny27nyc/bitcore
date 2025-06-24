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
 * A message indicating that the node prefers to receive new block announcements
 * via a `headers` message rather than an `inv` (BIP130).
 * @extends Message
 * @constructor
 */
function SendHeadersMessage(arg, options) {
  Message.call(this, options);
  this.command = 'sendheaders';
}
inherits(SendHeadersMessage, Message);

SendHeadersMessage.prototype.setPayload = function() {};

SendHeadersMessage.prototype.getPayload = function() {
  return BufferUtil.EMPTY_BUFFER;
};

module.exports = SendHeadersMessage;
