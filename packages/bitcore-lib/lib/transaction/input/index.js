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
module.exports = require('./input');

module.exports.PublicKey = require('./publickey');
module.exports.PublicKeyHash = require('./publickeyhash');
module.exports.MultiSig = require('./multisig.js');
module.exports.MultiSigScriptHash = require('./multisigscripthash.js');
