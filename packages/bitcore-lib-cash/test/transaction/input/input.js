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

var should = require('chai').should();
var expect = require('chai').expect;
var _ = require('lodash');

var bitcore = require('../../..');
var errors = bitcore.errors;
var PrivateKey = bitcore.PrivateKey;
var Address = bitcore.Address;
var Script = bitcore.Script;
var Networks = bitcore.Networks;
var Input = bitcore.Transaction.Input;

describe('Transaction.Input', function() {

  var privateKey = new PrivateKey('KwF9LjRraetZuEjR8VqEq539z137LW5anYDUnVK11vM3mNMHTWb4');
  var publicKey = privateKey.publicKey;
  var address = new Address(publicKey, Networks.livenet);
  var output = {
    address: '33zbk2aSZYdNbRsMPPt6jgy6Kq1kQreqeb',
    prevTxId: '66e64ef8a3b384164b78453fa8c8194de9a473ba14f89485a0e433699daec140',
    outputIndex: 0,
    script: new Script(address),
    satoshis: 1000000
  };
  var coinbase = {
    prevTxId: '0000000000000000000000000000000000000000000000000000000000000000',
    outputIndex: 0xFFFFFFFF,
    script: new Script(),
    satoshis: 1000000
  };

  var coinbaseJSON = JSON.stringify({
    prevTxId: '0000000000000000000000000000000000000000000000000000000000000000',
    outputIndex: 4294967295,
    script:''
  });

  var otherJSON = JSON.stringify({
    txidbuf: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
    txoutnum: 0,
    seqnum:4294967295,
    script: '71 0x3044022006553276ec5b885ddf5cc1d79e1e3dadbb404b60ad4cc00318e21565' +
      '4f13242102200757c17b36e3d0492fb9cf597032e5afbea67a59274e64af5a05d12e5ea2303901 ' +
      '33 0x0223078d2942df62c45621d209fab84ea9a7a23346201b7727b9b45a29c4e76f5e',
    output: {
      'satoshis':100000,
      'script':'OP_DUP OP_HASH160 20 0x88d9931ea73d60eaf7e5671efc0552b912911f2a ' +
        'OP_EQUALVERIFY OP_CHECKSIG'
    }
  });

  it('has abstract methods: "getSignatures", "isFullySigned", "addSignature", "clearSignatures"', function() {
    var input = new Input(output);
    _.each(['getSignatures', 'isFullySigned', 'addSignature', 'clearSignatures'], function(method) {
      expect(function() {
        return input[method]();
      }).to.throw(errors.AbstractMethodInvoked);
    });
  });
  it('detects coinbase transactions', function() {
    new Input(output).isNull().should.equal(false);
    var ci = new Input(coinbase);
    ci.isNull().should.equal(true);
  });

  describe('instantiation', function() {
    it('works without new', function() {
      var input = Input();
      should.exist(input);
    });
    it('fails with no script info', function() {
      expect(function() {
        var input = new Input({});
        input.toString();
      }).to.throw('Need a script to create an input');
    });
    it('fromObject should work', function() {
      var jsonData = JSON.parse(coinbaseJSON);
      var input = Input.fromObject(jsonData);
      should.exist(input);
      input.prevTxId.toString('hex').should.equal(jsonData.prevTxId);
      input.outputIndex.should.equal(jsonData.outputIndex);
    });
    it('fromObject should work', function() {
      var input = Input.fromObject(JSON.parse(coinbaseJSON));
      var obj = input.toObject();
      Input.fromObject(obj).should.deep.equal(input);
      obj.script = 42;
      Input.fromObject.bind(null, obj).should.throw('Invalid argument type: script');
    });
  });

  it('_estimateSize returns correct size', function() {
    var input = new Input(output);
    input._estimateSize().should.equal(66);
  });

  describe('handling the BIP68 (sequenceNumber locktime)', function() {
    var blockHeight = 3434;
    it('handles a null locktime', function() {
      var input = new Input(output);
      expect(input.getLockTime()).to.equal(null);
    });
    it('handles a simple seconds example', function() {
      var input = new Input()
        .lockForSeconds(1e5);

      var expected = (parseInt(1e5 / 512) * 512) ;
      input.getLockTime().should.deep.equal(expected);

      expected = (Math.floor(expected/512) ) | Input.SEQUENCE_LOCKTIME_TYPE_FLAG;
      input.sequenceNumber.should.equal(expected | Input.SEQUENCE_LOCKTIME_TYPE_FLAG);
    });
    it('accepts a block height', function() {
      var input = new Input()
        .lockUntilBlockHeight(blockHeight);

      input.sequenceNumber.should.equal(blockHeight);
      input.getLockTime().should.deep.equal(blockHeight);
    });
    it('fails if the block height is too high', function() {
      expect(function() {
        return new Input().lockUntilBlockHeight(5e8);
      }).to.throw(errors.Transaction.Input.BlockHeightOutOfRange);
    });
    it('fails if the block height is negative', function() {
      expect(function() {
        return new Input().lockUntilBlockHeight(-1);
      }).to.throw(errors.Transaction.Input.BlockHeightOutOfRange);
    });
  });

});
