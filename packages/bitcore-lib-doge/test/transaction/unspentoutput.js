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

var _ = require('lodash');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var bitcore = require('../..');
var UnspentOutput = bitcore.Transaction.UnspentOutput;

describe('UnspentOutput', function() {

  var sampleData1 = {
    'address': 'D82zqZA4KqaTPmsGegJ1ACoTXiSJ21NcZd',
    'txId': 'fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f',
    'outputIndex': 0,
    'script': 'OP_DUP OP_HASH160 1fc11f39be1729bf973a7ab6a615ca4729d64574 OP_EQUALVERIFY OP_CHECKSIG',
    'satoshis': 1020000
  };
  var sampleData2 = {
    'txid': 'fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f',
    'vout': 1,
    'address': 'DTH54BW9S9Q1EPCCiseQCzEBgf6pTRZv3U',
    'scriptPubKey': '76a914f2d4db28cad6502226ee484ae24505c2885cb12d88ac',
    'amount': 0.01080000
  };

  it('roundtrip from raw data', function() {
    expect(UnspentOutput(sampleData2).toObject()).to.deep.equal(sampleData2);
  });

  it('can be created without "new" operand', function() {
    expect(UnspentOutput(sampleData1) instanceof UnspentOutput).to.equal(true);
  });

  it('fails if no tx id is provided', function() {
    expect(function() {
      return new UnspentOutput({});
    }).to.throw();
  });

  it('fails if vout is not a number', function() {
    var sample = _.cloneDeep(sampleData2);
    sample.vout = '1';
    expect(function() {
      return new UnspentOutput(sample);
    }).to.throw();
  });

  it('displays nicely on the console', function() {
    var expected = '<UnspentOutput: fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f:0' +
                   ', satoshis: 1020000, address: D82zqZA4KqaTPmsGegJ1ACoTXiSJ21NcZd>';
    expect(new UnspentOutput(sampleData1).inspect()).to.equal(expected);
  });

  describe('checking the constructor parameters', function() {
    var notDefined = {
      'txId': 'fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f',
      'outputIndex': 0,
      'script': 'OP_DUP OP_HASH160 20 0x88d9931ea73d60eaf7e5671efc0552b912911f2a OP_EQUALVERIFY OP_CHECKSIG',
    };
    var zero = {
      'txId': 'fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f',
      'outputIndex': 0,
      'script': 'OP_DUP OP_HASH160 20 0x88d9931ea73d60eaf7e5671efc0552b912911f2a OP_EQUALVERIFY OP_CHECKSIG',
      'amount': 0
    };
    it('fails when no amount is defined', function() {
      expect(function() {
        return new UnspentOutput(notDefined);
      }).to.throw('Must provide an amount for the output');
    });
    it('does not fail when amount is zero', function() {
      expect(function() {
        return new UnspentOutput(zero);
      }).to.not.throw();
    });
  });

  it('toString returns txid:vout', function() {
    var expected = 'fe7d174f42dce0cffa7a527e9bc8368956057619ec817648f6138b98f2533e8f:0';
    expect(new UnspentOutput(sampleData1).toString()).to.equal(expected);
  });

  it('to/from JSON roundtrip', function() {
    var utxo = new UnspentOutput(sampleData2);
    var obj = UnspentOutput.fromObject(utxo.toJSON()).toObject();
    expect(obj).to.deep.equal(sampleData2);
    var str = JSON.stringify(UnspentOutput.fromObject(obj));
    expect(JSON.parse(str)).to.deep.equal(sampleData2);
    var str2 = JSON.stringify(new UnspentOutput(JSON.parse(str)));
    expect(JSON.parse(str2)).to.deep.equal(sampleData2);
  });
});
