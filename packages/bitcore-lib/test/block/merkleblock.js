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

var bitcore = require('../..');
var MerkleBlock = bitcore.MerkleBlock;
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;
var Transaction = bitcore.Transaction;
var data = require('../data/merkleblocks.js');
var transactionVector = require('../data/tx_creation');


describe('MerkleBlock', function() {
  var blockhex;
  var blockbuf;
  var blockJSON;
  var blockObject;

  before(function() {
    blockhex  = data.HEX[0];
    blockbuf  =  Buffer.from(blockhex,'hex');
    blockJSON = JSON.stringify(data.JSON[0]);
    blockObject = JSON.parse(JSON.stringify(data.JSON[0]));
  });

  describe('#constructor', function() {
    it('should make a new merkleblock from buffer', function() {
      var b = MerkleBlock(blockbuf);
      b.toBuffer().toString('hex').should.equal(blockhex);
    });

    it('should make a new merkleblock from object', function() {
      var b = MerkleBlock(blockObject);
      b.toObject().should.deep.equal(blockObject);
    });

    it('should make a new merkleblock from JSON', function() {
      var b = MerkleBlock(JSON.parse(blockJSON));
      JSON.stringify(b).should.equal(blockJSON);
    });

    it('should not make an empty block', function() {
      (function() {
        return new MerkleBlock();
      }).should.throw('Unrecognized argument for MerkleBlock');
    });
  });

  describe('#fromObject', function() {

    it('should set these known values', function() {
      var block = MerkleBlock.fromObject(JSON.parse(blockJSON));
      should.exist(block.header);
      should.exist(block.numTransactions);
      should.exist(block.hashes);
      should.exist(block.flags);
    });

    it('should set these known values', function() {
      var block = MerkleBlock(JSON.parse(blockJSON));
      should.exist(block.header);
      should.exist(block.numTransactions);
      should.exist(block.hashes);
      should.exist(block.flags);
    });

    it('accepts an object as argument', function() {
      var block = MerkleBlock(blockbuf);
      should.exist(MerkleBlock.fromObject(block.toObject()));
    });

  });

  describe('#toJSON', function() {

    it('should recover these known values', function() {
      var block = new MerkleBlock(JSON.parse(blockJSON));
      var b = JSON.parse(JSON.stringify(block));
      should.exist(block.header);
      should.exist(block.numTransactions);
      should.exist(block.hashes);
      should.exist(block.flags);
      should.exist(b.header);
      should.exist(b.numTransactions);
      should.exist(b.hashes);
      should.exist(b.flags);
    });

  });

  describe('#fromBuffer', function() {

    it('should make a block from this known buffer', function() {
      var block = MerkleBlock.fromBuffer(blockbuf);
      block.toBuffer().toString('hex').should.equal(blockhex);
    });

  });

  describe('#fromBufferReader', function() {

    it('should make a block from this known buffer', function() {
      var block = MerkleBlock.fromBufferReader(BufferReader(blockbuf));
      block.toBuffer().toString('hex').should.equal(blockhex);
    });

  });

  describe('#toBuffer', function() {

    it('should recover a block from this known buffer', function() {
      var block = MerkleBlock.fromBuffer(blockbuf);
      block.toBuffer().toString('hex').should.equal(blockhex);
    });

  });

  describe('#toBufferWriter', function() {

    it('should recover a block from this known buffer', function() {
      var block = MerkleBlock.fromBuffer(blockbuf);
      block.toBufferWriter().concat().toString('hex').should.equal(blockhex);
    });

    it('doesn\'t create a bufferWriter if one provided', function() {
      var writer = new BufferWriter();
      var block = MerkleBlock.fromBuffer(blockbuf);
      block.toBufferWriter(writer).should.equal(writer);
    });

  });


  describe('#validMerkleTree', function() {

    it('should validate good merkleblocks', function() {
      data.JSON.forEach(function(data) {
        var b = MerkleBlock(data);
        b.validMerkleTree().should.equal(true);
      });
    });

    it('should not validate merkleblocks with too many hashes', function() {
      var b = MerkleBlock(data.JSON[0]);
      // Add too many hashes
      var i = 0;
      while(i <= b.numTransactions) {
        b.hashes.push('bad' + i++);
      }
      b.validMerkleTree().should.equal(false);
    });

    it('should not validate merkleblocks with too few bit flags', function() {
      var b = MerkleBlock(JSON.parse(blockJSON));
      b.flags.pop();
      b.validMerkleTree().should.equal(false);
    });

  });

  describe('#filterdTxsHash', function() {

    it('should validate good merkleblocks', function() {
      var hashOfFilteredTx = '6f64fd5aa9dd01f74c03656d376625cf80328d83d9afebe60cc68b8f0e245bd9'
      var b = MerkleBlock(data.JSON[3]);
      b.filterdTxsHash()[0].should.equal(hashOfFilteredTx);
    });

    it('should fail with merkleblocks with too many hashes', function() {
      var b = MerkleBlock(data.JSON[0]);
      // Add too many hashes
      var i = 0;
      while(i <= b.numTransactions) {
        b.hashes.push('bad' + i++);
      }
      (function() {
        b.filterdTxsHash();
      }).should.throw('This MerkleBlock contain an invalid Merkle Tree');
    });

    it('should fail with merkleblocks with too few bit flags', function() {
      var b = MerkleBlock(JSON.parse(blockJSON));
      b.flags.pop();
      (function() {
        b.filterdTxsHash();
      }).should.throw('This MerkleBlock contain an invalid Merkle Tree');
    });

  });

  describe('#hasTransaction', function() {

    it('should find transactions via hash string', function() {
      var jsonData = data.JSON[0];
      var txId =  Buffer.from(jsonData.hashes[1],'hex').toString('hex');
      var b = MerkleBlock(jsonData);
      b.hasTransaction(txId).should.equal(true);
      b.hasTransaction(txId + 'abcd').should.equal(false);
    });

    it('should find transactions via Transaction object', function() {
      var jsonData = data.JSON[0];
      var txBuf =  Buffer.from(data.TXHEX[0][0],'hex');
      var tx = new Transaction().fromBuffer(txBuf);
      var b = MerkleBlock(jsonData);
      b.hasTransaction(tx).should.equal(true);
    });

    it('should not find non-existant Transaction object', function() {
      // Reuse another transaction already in data/ dir
      var serialized = transactionVector[0][7];
      var tx = new Transaction().fromBuffer( Buffer.from(serialized, 'hex'));
      var b = MerkleBlock(data.JSON[0]);
      b.hasTransaction(tx).should.equal(false);
    });

    it('should not match with merkle nodes', function() {
      var b = MerkleBlock(data.JSON[0]);

      var hashData = [
        ['3612262624047ee87660be1a707519a443b1c1ce3d248cbfc6c15870f6c5daa2', false],
        ['019f5b01d4195ecbc9398fbf3c3b1fa9bb3183301d7a1fb3bd174fcfa40a2b65', true],
        ['41ed70551dd7e841883ab8f0b16bf04176b7d1480e4f0af9f3d4c3595768d068', false],
        ['20d2a7bc994987302e5b1ac80fc425fe25f8b63169ea78e68fbaaefa59379bbf', false]
      ];

      hashData.forEach(function check(d){
        b.hasTransaction(d[0]).should.equal(d[1]);
      });

    });

  });

});
