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
var expect = require('chai').expect;
var _ = require('lodash');

var bitcore = require('../../..');
var Transaction = bitcore.Transaction;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Script = bitcore.Script;
var Networks = bitcore.Networks;
var Signature = bitcore.crypto.Signature;

describe('PublicKeyHashInput', function() {

  var privateKey = new PrivateKey('QTfg5tZJYhr9Hw1GVYuK74im5VsSN1dB6Xfuz3xYUWEBWWqNZfPx');
  var publicKey = privateKey.publicKey;
  var address = new Address(publicKey, Networks.livenet);

  var output = {
    address: 'DGYdw7jC17b9SappjsrAsaghhDTS8sV5Mx',
    txId: '66e64ef8a3b384164b78453fa8c8194de9a473ba14f89485a0e433699daec140',
    outputIndex: 0,
    script: new Script(address),
    satoshis: 1000000
  };


  it('can count missing signatures', function() {
    var transaction = new Transaction()
      .from(output)
      .to(address, 1000000);
    var input = transaction.inputs[0];

    input.isFullySigned().should.equal(false);
    transaction.sign(privateKey);
    input.isFullySigned().should.equal(true);
  });
  it('it\'s size can be estimated', function() {
    var transaction = new Transaction()
      .from(output)
      .to(address, 1000000);
    var input = transaction.inputs[0];
    input._estimateSize().should.equal(107);
  });
  it('it\'s signature can be removed', function() {
    var transaction = new Transaction()
      .from(output)
      .to(address, 1000000);
    var input = transaction.inputs[0];

    transaction.sign(privateKey);
    input.clearSignatures();
    input.isFullySigned().should.equal(false);
  });
  it('returns an empty array if private key mismatches', function() {
    var transaction = new Transaction()
      .from(output)
      .to(address, 1000000);
    var input = transaction.inputs[0];
    var signatures = input.getSignatures(transaction, new PrivateKey(), 0);
    signatures.length.should.equal(0);
  });

})