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
 * The mempool message sends a request to a node asking for information about
 * transactions it has verified but which have not yet confirmed.
 * @see https://en.bitcoin.it/wiki/Protocol_documentation#mempool
 * @param {Object} options
 * @extends Message
 * @constructor
 */
function MempoolMessage(arg, options) {
  Message.call(this, options);
  this.command = 'mempool';
}
inherits(MempoolMessage, Message);

MempoolMessage.prototype.setPayload = function() {};

MempoolMessage.prototype.getPayload = function() {
  return BufferUtil.EMPTY_BUFFER;
};

module.exports = MempoolMessage;
