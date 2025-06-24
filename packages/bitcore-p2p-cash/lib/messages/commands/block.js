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
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * @param {Block=} arg - An instance of a Block
 * @param {Object} options
 * @param {Function} options.Block - A block constructor
 * @extends Message
 * @constructor
 */
function BlockMessage(arg, options) {
  Message.call(this, options);
  this.Block = options.Block;
  this.command = 'block';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.Block,
    'An instance of Block or undefined is expected'
  );
  this.block = arg;
}
inherits(BlockMessage, Message);

BlockMessage.prototype.setPayload = function(payload) {
  this.block = this.Block.fromBuffer(payload);
};

BlockMessage.prototype.getPayload = function() {
  return this.block.toBuffer();
};

module.exports = BlockMessage;
