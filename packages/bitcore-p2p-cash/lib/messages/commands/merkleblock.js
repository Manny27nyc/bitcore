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

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib-cash');
var BufferUtil = bitcore.util.buffer;
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * Contains information about a MerkleBlock
 * @see https://en.bitcoin.it/wiki/Protocol_documentation
 * @param {MerkleBlock} arg - An instance of MerkleBlock
 * @param {Object=} options
 * @param {Function} options.MerkleBlock - a MerkleBlock constructor
 * @extends Message
 * @constructor
 */
function MerkleblockMessage(arg, options) {
  Message.call(this, options);
  this.MerkleBlock = options.MerkleBlock; // constructor
  this.command = 'merkleblock';
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.MerkleBlock,
    'An instance of MerkleBlock or undefined is expected'
  );
  this.merkleBlock = arg;
}
inherits(MerkleblockMessage, Message);

MerkleblockMessage.prototype.setPayload = function(payload) {
  $.checkArgument(BufferUtil.isBuffer(payload));
  this.merkleBlock = this.MerkleBlock.fromBuffer(payload);
};

MerkleblockMessage.prototype.getPayload = function() {
  return this.merkleBlock ? this.merkleBlock.toBuffer() : BufferUtil.EMPTY_BUFFER;
};

module.exports = MerkleblockMessage;
