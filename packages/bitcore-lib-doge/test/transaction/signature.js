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
/* jshint latedef: false */
var should = require('chai').should();
var expect = require('chai').expect;
var _ = require('lodash');

var bitcore = require('../..');
var Transaction = bitcore.Transaction;
var TransactionSignature = bitcore.Transaction.Signature;
var Script = bitcore.Script;
var PrivateKey = bitcore.PrivateKey;
var errors = bitcore.errors;

describe('TransactionSignature', function() {

  var fromAddress = 'DSpgzjPyfQB6ZzeSbMWpaZiTTxGf2oBCs4';
  var privateKey = '6JFPe8b4jbpup7petSB98M8tcaqXCigji8fGrC8bEbbDQxQkQ68';
  var simpleUtxoWith100000Satoshis = {
    address: fromAddress,
    txId: '4d49a71ec9da436f71ec4ee231d04f292a29cd316f598bb7068feccabdc59485',
    outputIndex: 0,
    script: Script.buildPublicKeyHashOut(fromAddress).toString(),
    satoshis: 100000
  };

  var getSignatureFromTransaction = function() {
    var transaction = new Transaction();
    transaction.from(simpleUtxoWith100000Satoshis);
    return transaction.getSignatures(privateKey)[0];
  };

  it('can be created without the `new` keyword', function() {
    var signature = getSignatureFromTransaction();
    var serialized = signature.toObject();
    var nonew = TransactionSignature(serialized);
    expect(nonew.toObject()).to.deep.equal(serialized);
  });

  it('can be retrieved from Transaction#getSignatures', function() {
    var signature = getSignatureFromTransaction();
    expect(signature instanceof TransactionSignature).to.equal(true);
  });

  it('fails when trying to create from invalid arguments', function() {
    expect(function() {
      return new TransactionSignature();
    }).to.throw(errors.InvalidArgument);
    expect(function() {
      return new TransactionSignature(1);
    }).to.throw(errors.InvalidArgument);
    expect(function() {
      return new TransactionSignature('hello world');
    }).to.throw(errors.InvalidArgument);
  });
  it('returns the same object if called with a TransactionSignature', function() {
    var signature = getSignatureFromTransaction();
    expect(new TransactionSignature(signature)).to.equal(signature);
  });

  it('gets returned by a P2SH multisig output', function() {
    var private1 = new PrivateKey('6ce7e97e317d2af16c33db0b9270ec047a91bff3eff8558afb5014afb2bb5976');
    var private2 = new PrivateKey('c9b26b0f771a0d2dad88a44de90f05f416b3b385ff1d989343005546a0032890');
    var public1 = private1.publicKey;
    var public2 = private2.publicKey;
    var utxo = {
      txId: '0000000000000000000000000000000000000000000000000000000000000000', // Not relevant
      outputIndex: 0,
      script: Script.buildMultisigOut([public1, public2], 2).toScriptHashOut(),
      satoshis: 100000
    };
    var transaction = new Transaction().from(utxo, [public1, public2], 2);
    var signatures = transaction.getSignatures(private1);
    expect(signatures[0] instanceof TransactionSignature).to.equal(true);
    signatures = transaction.getSignatures(private2);
    expect(signatures[0] instanceof TransactionSignature).to.equal(true);
  });

  it('can be aplied to a Transaction with Transaction#addSignature', function() {
    var transaction = new Transaction();
    transaction.from(simpleUtxoWith100000Satoshis);
    var signature = transaction.getSignatures(privateKey)[0];
    var addSignature = function() {
      return transaction.applySignature(signature);
    };
    expect(signature instanceof TransactionSignature).to.equal(true);
    expect(addSignature).to.not.throw();
  });

  describe('serialization', function() {
    it('serializes to an object and roundtrips correctly', function() {
      var signature = getSignatureFromTransaction();
      var serialized = signature.toObject();
      expect(new TransactionSignature(serialized).toObject()).to.deep.equal(serialized);
    });

    it('can be deserialized with fromObject', function() {
      var signature = getSignatureFromTransaction();
      var serialized = signature.toObject();
      expect(TransactionSignature.fromObject(serialized).toObject()).to.deep.equal(serialized);
    });

    it('can deserialize when signature is a buffer', function() {
      var signature = getSignatureFromTransaction();
      var serialized = signature.toObject();
      serialized.signature = new Buffer(serialized.signature, 'hex');
      expect(TransactionSignature.fromObject(serialized).toObject()).to.deep.equal(signature.toObject());
    });

    it('can roundtrip to/from json', function() {
      var signature = getSignatureFromTransaction();
      var serialized = signature.toObject();
      var json = JSON.stringify(signature);
      expect(TransactionSignature(JSON.parse(json)).toObject()).to.deep.equal(serialized);
      expect(TransactionSignature.fromObject(JSON.parse(json)).toObject()).to.deep.equal(serialized);
    });

    it('can parse a previously known json string', function() {
      var str = JSON.stringify(TransactionSignature(JSON.parse(testJSON)));
      expect(JSON.parse(str)).to.deep.equal(JSON.parse(testJSON));
    });

    it('can deserialize a previously known object', function() {
      expect(TransactionSignature(testObject).toObject()).to.deep.equal(testObject);
    });
  });

  /* jshint maxlen: 500 */
  var testJSON = '{"publicKey":"0223078d2942df62c45621d209fab84ea9a7a23346201b7727b9b45a29c4e76f5e","prevTxId":"4d49a71ec9da436f71ec4ee231d04f292a29cd316f598bb7068feccabdc59485","outputIndex":0,"inputIndex":0,"signature":"3045022100c728eac064154edba15d4f3e6cbd9be6da3498f80a783ab3391f992b4d9d71ca0220729eff4564dc06aa1d80ab73100540fe5ebb6f280b4a87bc32399f861a7b2563","sigtype":1}';
  var testObject = JSON.parse(testJSON);

});
