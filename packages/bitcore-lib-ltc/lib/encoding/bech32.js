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

var bech32 = require('bech32');

var decode = function(str) {
  if (typeof str !== 'string') {
    throw new Error('Input should be a string');
  }
  var decoded = bech32.decode(str);
  return {
    prefix: decoded.prefix,
    data: Buffer.from(bech32.fromWords(decoded.words.slice(1))),
    version: decoded.words[0]
  };
};

var encode = function(prefix, version, data) {
	if (typeof prefix !== 'string') {
		throw new Error('Prefix should be a string');
	}
	if (typeof version !== 'number') {
		throw new Error('version should be a number');
	}
  var words = bech32.toWords(data);
  words.unshift(version);
	return bech32.encode(prefix, words);
}

module.exports = { decode: decode, encode: encode };
