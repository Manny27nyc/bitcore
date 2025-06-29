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
var expect = require('chai').expect;
var bitcore = require('..');
var HDPrivateKey = bitcore.HDPrivateKey;

var xprivkey = 'xprv9s21ZrQH143K2n4rV4AtAJFptEmd1tNMKCcSyQBCSuN5eq1dCUhcv6KQJS49joRxu8NNdFxy8yuwTtzCPNYUZvVGC7EPRm2st2cvE7oyTbB';

describe('HDKey cache', function() {
  this.timeout(10000);

  /* jshint unused: false */
  var cache = bitcore._HDKeyCache;
  var master = new HDPrivateKey(xprivkey);

  beforeEach(function() {
    cache._cache = {};
    cache._count = 0;
    cache._eraseIndex = 0;
    cache._usedIndex = {};
    cache._usedList = {};
    cache._CACHE_SIZE = 3; // Reduce for quick testing
  });

  it('saves a derived key', function() {
    var child = master.deriveChild(0);
    expect(cache._cache[master.xprivkey + '/0/false'].xprivkey).to.equal(child.xprivkey);
  });
  it('starts erasing unused keys', function() {
    var child1 = master.deriveChild(0);
    var child2 = child1.deriveChild(0);
    var child3 = child2.deriveChild(0);
    expect(cache._cache[master.xprivkey + '/0/false'].xprivkey).to.equal(child1.xprivkey);
    var child4 = child3.deriveChild(0);
    expect(cache._cache[master.xprivkey + '/0/false']).to.equal(undefined);
  });
  it('avoids erasing keys that get cache hits ("hot keys")', function() {
    var child1 = master.deriveChild(0);
    var child2 = master.deriveChild(0).deriveChild(0);
    expect(cache._cache[master.xprivkey + '/0/false'].xprivkey).to.equal(child1.xprivkey);
    var child1_copy = master.deriveChild(0);
    expect(cache._cache[master.xprivkey + '/0/false'].xprivkey).to.equal(child1.xprivkey);
  });
  it('keeps the size of the cache small', function() {
    var child1 = master.deriveChild(0);
    var child2 = child1.deriveChild(0);
    var child3 = child2.deriveChild(0);
    var child4 = child3.deriveChild(0);
    expect(_.size(cache._cache)).to.equal(3);
  });
});
